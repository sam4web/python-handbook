import { ITestCase } from "@/app/practice/utils/shared";
import { extractPyodideErrorMessage } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export default function usePyodideRunner() {
  const [pyodideReady, setPyodideReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const outputBufferRef = useRef("");
  const pyodideWorkerRef = useRef<Worker | null>(null);
  const interruptBufferRef = useRef<Uint8Array | null>(null);

  const appendOutput = useCallback((msg: string) => {
    outputBufferRef.current += `> ${msg} \n`;
    setOutput(outputBufferRef.current);
  }, []);

  useEffect(() => {
    pyodideWorkerRef.current = new Worker("/pyodide-worker.js");
    interruptBufferRef.current = new Uint8Array(new SharedArrayBuffer(1));

    pyodideWorkerRef.current.onmessage = (event) => {
      const { cmd, msg, error } = event.data;
      if (cmd === "output") {
        appendOutput(msg);
      } else if (cmd === "ready") {
        pyodideWorkerRef.current?.postMessage({
          cmd: "setInterruptBuffer",
          interrupt: interruptBufferRef.current,
        });
        setPyodideReady(true);
        setOutput(`> Click "Run Code" to see output...`);
      } else if (cmd === "done") {
        setRunning(false);
        if (!event.data.success && error) {
          appendOutput(extractPyodideErrorMessage(error));
        }
      }
    };
    pyodideWorkerRef.current.postMessage({ cmd: "init" });
    return () => {
      pyodideWorkerRef.current?.terminate();
    };
  }, []);

  const runPythonCode = useCallback(
    async (code: string) => {
      if (!pyodideReady || running) {
        return;
      }
      setRunning(true);
      outputBufferRef.current = "";
      setOutput(outputBufferRef.current);
      pyodideWorkerRef.current?.postMessage({ cmd: "run", code });
    },
    [pyodideReady, running]
  );

  const runAllTests = useCallback(
    async (userCode: string, testCases: ITestCase[]) => {
      console.log(testCases);
      console.log(output);
      await runPythonCode(userCode);
    },
    [pyodideReady, running]
  );

  const interruptExecution = useCallback(() => {
    if (running && interruptBufferRef.current) {
      interruptBufferRef.current[0] = 2;
      setRunning(false);
      appendOutput("\n> Execution interrupted by user.");
    }
  }, [running, appendOutput]);

  return {
    output,
    runPythonCode,
    runAllTests,
    pyodideReady,
    running,
    interruptExecution,
    setOutput,
  };
}
