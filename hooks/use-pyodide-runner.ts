import { ITestCase, ITestResult } from "@/app/practice/utils/shared";
import { useCallback, useEffect, useRef, useState } from "react";

type MainToWorkerMessage =
  | { cmd: "init" }
  | { cmd: "setInterruptBuffer"; interrupt: Uint8Array }
  | { cmd: "run"; code: string }
  | {
      cmd: "test";
      code: string;
      test: ITestCase;
      functionName: string;
    };

type WorkerToMainMessage =
  | { cmd: "ready" }
  | { cmd: "output"; msg: string }
  | { cmd: "done"; success: boolean; error?: string }
  | { cmd: "test_result"; result: ITestResult };

interface IPyodideWorker extends Worker {
  postMessage(message: MainToWorkerMessage): void;
}

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
  const [testResults, setTestResults] = useState<ITestResult[] | null>(null);

  const outputBufferRef = useRef("");
  const pyodideWorkerRef = useRef<IPyodideWorker | null>(null);
  const interruptBufferRef = useRef<Uint8Array | null>(null);
  const resolveTestRef = useRef<((result: ITestResult) => void) | null>(null);

  const appendOutput = useCallback((msg: string) => {
    outputBufferRef.current += `> ${msg} \n`;
    setOutput(outputBufferRef.current);
  }, []);

  useEffect(() => {
    const worker = new Worker("/pyodide-worker.js") as IPyodideWorker;
    pyodideWorkerRef.current = worker;
    interruptBufferRef.current = new Uint8Array(new SharedArrayBuffer(1));

    worker.onmessage = (event: MessageEvent<WorkerToMainMessage>) => {
      const { cmd } = event.data;

      switch (cmd) {
        case "output":
          appendOutput(event.data.msg);
          break;

        case "ready":
          worker.postMessage({
            cmd: "setInterruptBuffer",
            interrupt: interruptBufferRef.current!,
          });
          setPyodideReady(true);
          setOutput(`> Click "Run Code" to see output...`);
          break;

        case "test_result":
          if (resolveTestRef.current) {
            resolveTestRef.current(event.data.result!);
            resolveTestRef.current = null;
          }
          break;

        case "done":
          const { error } = event.data;
          setRunning(false);
          if (!event.data.success && error) {
            const cleanMessage = extractPyodideErrorMessage(error);
            appendOutput(`Execution failed\n\t${cleanMessage}`);
          }
          break;
      }
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

      for (const test of testCases) {
        const resultPromise = new Promise<ITestResult>((resolve) => {
          resolveTestRef.current = resolve;
        });
        if (!resolveTestRef.current) {
          break;
        }
        worker.postMessage({
          cmd: "test",
          code,
          test,
          functionName,
        });
        try {
          const result = await resultPromise;
          results.push(result);
        } catch (error) {
          console.error("Promise rejection during test run.", error);
          break;
        }
      }
      setTestResults([...results]);
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
    testResults,
    setTestResults,
  };
}
