importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.0/full/pyodide.js");

let pyodide;
let interruptBuffer;

function clearInterruptBuffer() {
  if (interruptBuffer) {
    interruptBuffer[0] = 0;
  }
}

self.onmessage = async (event) => {
  const { cmd, code, interrupt, test, functionName } = event.data;

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
  } else if (cmd === "setInterruptBuffer") {
    interruptBuffer = interrupt;
    pyodide.setInterruptBuffer(interruptBuffer);
  } else if (cmd === "run") {
    if (!interruptBuffer) {
      self.postMessage({ cmd: "output", msg: "[CRITICAL ERROR]: Cannot run code. Interrupt buffer not initialized." });
      self.postMessage({ cmd: "done", success: false, error: "Interrupt buffer error." });
      return;
    }
    clearInterruptBuffer();

    try {
      await pyodide.runPythonAsync(code);
      self.postMessage({ cmd: "done", success: true });
    } catch (e) {
      self.postMessage({ cmd: "done", success: false, error: String(e) });
    }
  } else if (cmd === "test") {
    if (!interruptBuffer) {
      self.postMessage({ cmd: "output", msg: "[CRITICAL ERROR]: Cannot run code. Interrupt buffer not initialized." });
      self.postMessage({ cmd: "done", success: false, error: "Interrupt buffer error." });
      return;
    }
    clearInterruptBuffer();

    const { input, expected_output } = test;
    let actualOutput = null;
    let errorMessage = null;
    let passed = false;

    try {
      await pyodide.runPythonAsync(code);

      try {
        const pythonFunction = pyodide.globals.get(functionName);
        if (!pythonFunction) {
          throw new Error(`NameError: Function '${functionName}' not found in user code.`);
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
          if (pythonResult.destroy) {
            pythonResult.destroy();
          }
        } else {
          actualOutput = pythonResult;
        }

        pythonFunction.destroy();
        if (pythonResult && pythonResult.destroy) {
          pythonResult.destroy();
        }
        const expected = expected_output;
        if (typeof expected === "number" && typeof actualOutput === "number") {
          // Safe float comparison for area of circle (e.g., 50.27 vs 50.26548245743669)
          const tolerance = 0.01;
          passed = Math.abs(actualOutput - expected) < tolerance;
        } else {
          // Standard JSON string comparison for lists/strings/integers
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

    console.log("WORKER: Test finished. Sending result.", { functionName, passed });

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
