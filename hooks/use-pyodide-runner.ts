import { ITestCase, ITestResult } from "@/app/practice/utils/shared";
import { useCallback, useEffect, useRef, useState } from "react";

function extractPyodideErrorMessage(traceback: string): string {
  const lines = traceback.split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (line.length > 0) {
      if (line.includes("KeyboardInterrupt")) {
        return "Code execution was manually interrupted.";
      }
      return line;
    }
  }
  return "An unexpected Python error occurred.";
}

export default function usePyodideRunner() {
  const [pyodideReady, setPyodideReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const outputBufferRef = useRef("");
  const pyodideWorkerRef = useRef<Worker | null>(null);
  const interruptBufferRef = useRef<Uint8Array | null>(null);
  const resolveTestRef = useRef<((result: ITestResult) => void) | null>(null);

  const appendOutput = useCallback((msg: string) => {
    outputBufferRef.current += `> ${msg} \n`;
    setOutput(outputBufferRef.current);
  }, []);

  useEffect(() => {
    const worker = new Worker("/pyodide-worker.js");
    pyodideWorkerRef.current = worker;
    interruptBufferRef.current = new Uint8Array(new SharedArrayBuffer(1));

    worker.onmessage = (event) => {
      const { cmd, msg, error, result } = event.data;
      if (cmd === "output") {
        appendOutput(msg);
        return;
      }

      if (cmd === "ready") {
        worker.postMessage({
          cmd: "setInterruptBuffer",
          interrupt: interruptBufferRef.current!,
        });
        setPyodideReady(true);
        setOutput(`> Click "Run Code" to see output...`);
        return;
      }

      if (cmd === "test_result") {
        if (resolveTestRef.current) {
          console.log("MAIN: Received test_result. Resolving promise.");
          resolveTestRef.current(result!);
          resolveTestRef.current = null;
        } else {
          console.warn("MAIN: Received 'test_result' but no promise resolver was set.");
        }
        return;
      }

      if (cmd === "done") {
        setRunning(false);
        if (!event.data.success && error) {
          const cleanMessage = extractPyodideErrorMessage(error);
          appendOutput(`Execution failed: ${cleanMessage}`);
        }
      }
      return;
    };
    worker.postMessage({ cmd: "init" });
    return () => {
      worker.terminate();
    };
  }, [appendOutput]);

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

  const runTests = useCallback(
    async (code: string, testCases: ITestCase[], functionName: string) => {
      if (!pyodideReady || running || !pyodideWorkerRef.current) {
        return;
      }
      setRunning(true);
      const results: ITestResult[] = [];
      const worker = pyodideWorkerRef.current!;

      console.log(testCases);

      for (const test of testCases) {
        console.log(`Sending test: ${functionName}`);
        const resultPromise = new Promise<ITestResult>((resolve) => {
          resolveTestRef.current = resolve;
        });

        if (!resolveTestRef.current) {
          console.error("MAIN: FATAL ERROR: resolveTestRef is null immediately after setting. Check dependencies.");
          break;
        }

        worker.postMessage({
          cmd: "test",
          code,
          test,
          functionName,
        });

        try {
          console.log("MAIN: Awaiting result for current test...");
          const result = await resultPromise;
          console.log("MAIN: Received result and continuing loop.", result);
          // 4. Update results
          results.push(result);
          // setTestResults([...results]);
        } catch (error) {
          console.error("MAIN: Promise rejection during test run.", error);
        }
      }
      console.log("MAIN: All tests finished.");
      // setIsTesting(false);
      setRunning(false);
    },
    [pyodideReady, running, resolveTestRef, pyodideWorkerRef]
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
    runTests,
    pyodideReady,
    running,
    interruptExecution,
    setOutput,
  };
}
