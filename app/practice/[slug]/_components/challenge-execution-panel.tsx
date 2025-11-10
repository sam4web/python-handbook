"use client";

import CodeEditor from "@/components/code-editor";
import EditorThemeDropdown from "@/components/editor-theme-dropdown";
import Button from "@/components/ui/button";
import usePyodideRunner from "@/hooks/use-pyodide-runner";
import useEditorTheme from "@/lib/editor/hooks/use-editor-theme";
import { IEditorTheme } from "@/lib/editor/shared";
import { firacode } from "@/lib/fonts";
import { cx } from "@/lib/utils";
import { OnMount } from "@monaco-editor/react";
import { Check, Lightbulb, Loader, OctagonX, Play, RotateCcw, WandSparkles, X } from "lucide-react";
import { editor } from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { IChallenge } from "../../utils/shared";

type TabsOptions = "output" | "test-cases";

export default function ChallengeExecutionPanel({
  challenge,
  themes,
}: {
  challenge: IChallenge;
  themes: IEditorTheme[];
}) {
  const [showHint, setShowHint] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabsOptions>("test-cases");
  const [hasTestsRun, setHasTestsRun] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const [showStopExecutionBtn, setShowStopExecutionBtn] = useState(false);
  const { themeList, activeTheme } = useEditorTheme(themes);
  const { output, pyodideReady, runAllTests, running, interruptExecution, setOutput } = usePyodideRunner();

  const tabsOptions: { label: string; type: TabsOptions }[] = [
    { label: "Output", type: "output" },
    { label: "Test Cases", type: "test-cases" },
  ];

  useEffect(() => {
    if (!running || !pyodideReady) {
      return;
    }
    timeoutIdRef.current = setTimeout(() => {
      setShowStopExecutionBtn(true);
    }, 700);
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [running]);

  const handleRunCode = () => {
    if (!editorRef.current) {
      return;
    }
    if (!editorRef.current.getValue().trim()) {
      // toast here
      console.log("The editor is empty.");
      return;
    }
    runAllTests(editorRef.current.getValue(), challenge.testcases);
    setHasTestsRun(true);
    setActiveTab("output");
    setShowHint(false);
  };

  const handleResetEditor = () => {
    if (!editorRef.current) {
      return;
    }
    setHasTestsRun(false);
    setShowHint(false);
    setOutput("");
    editorRef.current.setValue(challenge.startercode);
  };

  const handleViewSolution = () => {
    if (!editorRef.current) {
      return;
    }
    setHasTestsRun(false);
    setShowHint(false);
    setOutput("");
    editorRef.current.setValue(challenge.solution_code);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    themes.forEach((theme) => {
      monaco.editor.defineTheme(theme.name, theme.data);
    });
    setTheme(activeTheme.name);
  };

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("editor-theme", theme);
    }
  };

  return (
    <div className="px-3 py-3.5 space-y-3 h-full">
      <div className="flex-between gap-2">
        <div className="flex-center gap-2">
          <EditorThemeDropdown themes={themeList} activeTheme={activeTheme} handleThemeChange={handleThemeChange} />

          {/* Show Hint Button */}
          <Button
            variant="outline"
            className="code-editor-button"
            onClick={() => setShowHint((prev) => !prev)}
            title={`${showHint ? "Hide" : "Show"} Hints`}
          >
            <WandSparkles />
            <span>{showHint ? "Hide" : "Show"} Hints</span>
          </Button>
        </div>

        <div className="flex-center gap-2">
          {/* Reset Editor Button */}
          <Button
            variant="outline"
            className="code-editor-button"
            title="Reset editor"
            onClick={handleResetEditor}
            disabled={!pyodideReady || running}
          >
            <RotateCcw />
            <span>Reset</span>
          </Button>

          {/* View Solution Button */}
          <Button variant="outline" className="code-editor-button" title="View solution" onClick={handleViewSolution}>
            <Lightbulb />
            <span>Solution</span>
          </Button>

          {showStopExecutionBtn ? (
            <>
              {/* Stop Execution Button */}
              <Button
                disabled={!pyodideReady || !running}
                variant="outline"
                className="code-editor-button border-destructive!"
                title="Stop Execution"
                onClick={() => {
                  interruptExecution();
                  setShowStopExecutionBtn(false);
                }}
              >
                <OctagonX />
                <span>Stop Execution</span>
              </Button>
            </>
          ) : (
            <>
              {/* Run Code Button */}
              <Button
                variant="primary"
                className="code-editor-button outline outline-primary"
                title="Run code"
                onClick={handleRunCode}
                disabled={!pyodideReady || running}
              >
                {running ? (
                  <>
                    <Loader className="animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play />
                    <span>Run Code</span>
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Hints List */}
      {showHint ? (
        <div
          className={`rounded-md shadow-xs px-2 md:px-3 py-1 md:py-2 bg-primary/15 border border-primary ${firacode.className}`}
        >
          <p className="font-semibold text-sm text-foreground mb-1">Hints:</p>
          <ol>
            {challenge.hints.map((hint, idx) => (
              <li className="text-xs list-decimal ml-6 text-secondary-foreground" key={idx}>
                {hint}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {/* Code Editor */}
      <div className="h-[56dvh] w-full overflow-hidden rounded-lg">
        <CodeEditor startercode={challenge.startercode} theme={theme} handleEditorDidMount={handleEditorDidMount} />
      </div>

      {/* Tabs Options (Output & Test Cases) */}
      <div className="flex w-full mt-4 py-0.5 relative border-b-2 border-primary">
        <div
          className={cx(
            "absolute border-secondary-foreground! bg-primary w-1/2 h-full inset-0 rounded-t-sm z-3",
            activeTab === "output" ? "translate-x-0" : "translate-x-full"
          )}
        />
        {tabsOptions.map((tab) => (
          <button
            className={cx(
              "text-center border-transparent border text-sm w-full py-1 px-2 rounded-sm z-5 cursor-pointer",
              activeTab === tab.type
                ? "text-[#e2e8f0] font-medium"
                : "dark:text-foreground/75 hover:text-foreground hover:font-medium"
            )}
            title={tab.label}
            key={tab.type}
            onClick={() => setActiveTab(tab.type)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "output" ? (
        <>
          {hasTestsRun ? (
            <>
              {/* Tests Result Panel*/}
              <div className={`transition-none ${firacode.className}`}>
                <p className="font-medium text-right text-sm text-muted-foreground mb-2">Test Passed: 2/3</p>
                <div className="space-y-3 items-start">
                  {challenge.testcases.map((item, idx) => (
                    <div
                      className={cx(
                        "px-2.5 py-3 border bg-background/80 rounded-md shadow-xs space-y-2",
                        idx % 2 === 0 ? "border-green-600 bg-green-600/5" : "border-destructive bg-destructive/5"
                      )}
                      key={idx}
                    >
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span
                          className={cx(
                            "[&>svg]:size-3.5 [&>svg]:text-white rounded-full p-px",
                            idx % 2 === 0 ? " bg-green-600" : "bg-destructive"
                          )}
                        >
                          {idx % 2 === 0 ? <Check /> : <X />}
                        </span>
                        <p className="font-semibold text-sm text-secondary-foreground">Test Case {idx + 1}</p>
                      </div>
                      <div className="text-sm space-y-1 text-secondary-foreground px-1 rounded-sm">
                        <p>
                          <span>Input: </span>
                          <span className="text-foreground font-medium">
                            {Array.isArray(item.input)
                              ? JSON.stringify(item.input).slice(1, -1)
                              : JSON.stringify(item.input)}
                          </span>
                        </p>
                        <p>
                          <span>Output: </span>
                          <span className="text-primary font-medium">{JSON.stringify(item.expected_output)}</span>
                        </p>
                        <p>
                          <span>Actual: </span>
                          <span className={cx("font-medium", idx % 2 === 0 ? "text-green-600" : "text-destructive")}>
                            {JSON.stringify(item.expected_output)}
                          </span>
                        </p>
                      </div>
                      {idx % 2 !== 0 ? (
                        <p className="text-sm space-y-1 text-destructive bg-destructive/10 py-1 px-2 rounded-sm">
                          Expected: [0,1], Got: [0,1]
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="px-3 py-2.5 h-36 bg-background/80 border border-muted-foreground/30 dark:border-secondary/50 rounded-md shadow-xs transition-none">
              <p className={`font-medium text-sm text-accent ${firacode.className}`}>
                &gt; Click "Run Tests" to see output...
              </p>
            </div>
          )}
        </>
      ) : (
        // Test Cases Panel
        <div className="space-y-2 items-start transition-none">
          {challenge.testcases.map((item, idx) => (
            <div
              className={`px-3 py-2.5 bg-background/80 border border-muted-foreground/30 dark:border-secondary/50 rounded-md shadow-xs space-y-1 ${firacode.className}`}
              key={idx}
            >
              <p className="font-semibold text-sm text-secondary-foreground">Test Case {idx + 1}</p>
              <div className={`text-sm dark:text-muted-foreground text-secondary-foreground space-y-0.5`}>
                <p>
                  <span>Input: </span>
                  <span className="text-foreground font-medium">
                    {Array.isArray(item.input) ? JSON.stringify(item.input).slice(1, -1) : JSON.stringify(item.input)}
                  </span>
                </p>
                <p>
                  <span>Output: </span>
                  <span className="text-primary font-medium">{JSON.stringify(item.expected_output)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
