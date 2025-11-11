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
      await pyodide.runPythonAsync(code);
      try {
        const pythonFunction = pyodide.globals.get(functionName);
        if (!pythonFunction) {
          throw new Error(`Use the required function name: '${functionName}'.`);
        }

        const pythonArgs = pyodide.toPy(input);
        let pythonResult = null;

        try {
          pythonResult = pythonFunction(...pythonArgs);
        } finally {
          pythonArgs.destroy();
        }

        if (pythonResult && pythonResult.toJs) {
          actualOutput = pythonResult.toJs({ dict_converter: Object.fromEntries });
          if (pythonResult.destroy) pythonResult.destroy();
        } else {
          actualOutput = pythonResult;
        }
        pythonFunction.destroy();
        if (pythonResult && pythonResult.destroy) {
          pythonResult.destroy();
        }
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
  }
};
