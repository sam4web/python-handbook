importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.0/full/pyodide.js");

let pyodide;
let interruptBuffer;

function checkAndClearInterruptBuffer(cmdToReturn) {
  if (!interruptBuffer) {
    self.postMessage({
      cmd: "output",
      msg: `[CRITICAL ERROR]: Cannot run ${cmdToReturn}. Interrupt buffer not initialized.`,
    });
    self.postMessage({
      cmd: "done",
      success: false,
      error: "Interrupt buffer error.",
    });
    return false;
  }
  if (interruptBuffer) {
    interruptBuffer[0] = 0;
  }
  return true;
}

self.onmessage = async (event) => {
  const { cmd } = event.data;

  if (cmd === "init") {
    pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.0/full/",
    });
    pyodide.setStdout({
      batched: (msg) => {
        self.postMessage({ cmd: "output", msg });
      },
    });
    pyodide.setStderr({
      batched: (msg) => {
        self.postMessage({ cmd: "output", msg: `[ERROR]: ${msg}` });
      },
    });
    self.postMessage({ cmd: "ready" });
    return;
  }

  if (cmd === "setInterruptBuffer") {
    const { interrupt } = event.data;
    interruptBuffer = interrupt;
    pyodide.setInterruptBuffer(interruptBuffer);
    return;
  }

  if (cmd === "run") {
    if (!checkAndClearInterruptBuffer("code")) {
      return;
    }
    const { code } = event.data;
    try {
      await pyodide.runPythonAsync(code);
      self.postMessage({ cmd: "done", success: true });
    } catch (e) {
      self.postMessage({ cmd: "done", success: false, error: String(e) });
    }
    return;
  }

  if (cmd === "test") {
    if (!checkAndClearInterruptBuffer("test")) {
      return;
    }
    const { code, test, functionName } = event.data;
    const { input, expected_output } = test;
    let actualOutput = null;
    let errorMessage = null;
    let passed = false;

    try {
      pyodide.runPython(`
            items_to_keep = set(dir(__builtins__)) | set(['pyodide', 'shiboken'])
            for name in list(globals()):
                if name not in items_to_keep:
                    del globals()[name]
          `);
    } catch (e) {
      console.error("Failed to clean up global state (full reset failed):", e);
    }

    const LINKED_LIST_SETUP_CODE = `
    class ListNode:
        def __init__(self, val=0, next=None):
            self.val = val
            self.next = next

    def _build_list_from_array(arr):
        if not arr:
            return None
        head = ListNode(arr[0])
        current = head
        for val in arr[1:]:
            current.next = ListNode(val)
            current = current.next
        return head

    def _convert_list_to_array(head):
        arr = []
        current = head
        while current:
            arr.append(current.val)
            current = current.next
        return arr
    `;

    try {
      const requiresLinkedListMarshalling = functionName === "reverse_list";
      if (requiresLinkedListMarshalling) {
        pyodide.runPython(LINKED_LIST_SETUP_CODE);
      }
      await pyodide.runPythonAsync(code);
      try {
        const pythonFunction = pyodide.globals.get(functionName);
        if (!pythonFunction) {
          throw new Error(`Use the required function name: '${functionName}'.`);
        }
        let pythonResult = null;

        if (requiresLinkedListMarshalling) {
          const buildList = pyodide.globals.get("_build_list_from_array");
          const convertList = pyodide.globals.get("_convert_list_to_array");
          const pyListHead = buildList(input[0]);
          const pythonResultHead = pythonFunction(pyListHead);
          pythonResult = convertList(pythonResultHead);
          buildList.destroy();
          convertList.destroy();
        } else {
          pythonResult = pythonFunction(...input);
        }

        if (pythonResult && pythonResult.toJs) {
          const resultProxy = pythonResult;
          actualOutput = resultProxy.toJs({ dict_converter: Object.fromEntries });
          if (resultProxy.destroy) {
            resultProxy.destroy();
          }
        } else {
          actualOutput = pythonResult;
        }

        pythonFunction.destroy();

        const expected = expected_output;
        if (typeof expected === "number" && typeof actualOutput === "number") {
          const tolerance = 0.01;
          passed = Math.abs(actualOutput - expected) < tolerance;
        } else {
          passed = JSON.stringify(actualOutput) === JSON.stringify(expected);
        }
      } catch (e) {
        errorMessage = String(e);
        passed = false;
        actualOutput = null;
      }
    } catch (e) {
      errorMessage = `Code Definition Error: ${String(e)}`;
      passed = false;
    }

    self.postMessage({
      cmd: "test_result",
      result: {
        passed,
        actualOutput: actualOutput,
        expectedOutput: expected_output,
        inputArgs: input,
        errorMessage: errorMessage,
      },
    });
    return;
  }
};
