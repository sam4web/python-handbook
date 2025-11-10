importScripts("https://cdn.jsdelivr.net/pyodide/v0.29.0/full/pyodide.js");

let pyodide;
let interruptBuffer;

self.onmessage = async (event) => {
  const { cmd, code, interrupt } = event.data;

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
    interruptBuffer[0] = 0;
    try {
      await pyodide.runPythonAsync(code);
      self.postMessage({ cmd: "done", success: true });
    } catch (e) {
      self.postMessage({ cmd: "done", success: false, error: String(e) });
    }
  }
};
