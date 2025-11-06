"use client";

import Button from "@/components/ui/button";
import { firacode } from "@/lib/fonts";
import { Check, Lightbulb, LightbulbOff, Play, RotateCcw, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import EditorThemeDropdown from "./editor-theme-dropdown";
import { Editor, OnMount } from "@monaco-editor/react";
import Spinner from "@/components/spinner";
import { editor } from "monaco-editor";
import { IChallenge, IEditorTheme } from "../../utils/shared";
import { cx } from "@/lib/utils";

type TabsOptions = "output" | "test-cases";

export default function ChallengeCodeEditor({ challenge, themes }: { challenge: IChallenge; themes: IEditorTheme[] }) {
  const [showHint, setShowHint] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabsOptions>("test-cases");
  const [hasTestsRun, setHasTestsRun] = useState(false);

  const tabsOptions: { label: string; type: TabsOptions }[] = [
    { label: "Output", type: "output" },
    { label: "Test Cases", type: "test-cases" },
  ];

  const themeList = useMemo(
    () =>
      themes.map((theme) => {
        const { name, label } = theme;
        return { name, label };
      }),
    [themes]
  );

  const activeTheme = (() => {
    const DEFAULT_THEME = { name: "night-owl", label: "Night Owl" };
    if (typeof window === "undefined") {
      return DEFAULT_THEME;
    }
    let themeName = localStorage.getItem("editor-theme");
    if (!themeName) {
      themeName = DEFAULT_THEME.name;
    }
    let result = themeList.find((item) => item.name === themeName);
    if (!result) {
      return DEFAULT_THEME;
    }
    return result;
  })();

  const handleRunTests = () => {
    if (!editorRef.current) {
      return;
    }
    const code = editorRef.current.getValue();
    setHasTestsRun(true);
    console.log(code);
  };

  const handleResetEditor = () => {
    if (!editorRef.current) {
      return;
    }
    setHasTestsRun(false);
    editorRef.current.setValue(challenge.startercode);
  };

  const handleViewSolution = () => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.setValue(challenge.solution_code);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    themes.map((theme) => {
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
      <div className="flex-between">
        <div className="flex-center gap-2">
          <EditorThemeDropdown themes={themeList} activeTheme={activeTheme} handleThemeChange={handleThemeChange} />
          <Button
            variant="outline"
            className="code-editor-button"
            onClick={() => setShowHint((prev) => !prev)}
            title={`${showHint ? "Hide" : "Show"} Hints`}
          >
            {showHint ? (
              <>
                <LightbulbOff /> Hide Hints
              </>
            ) : (
              <>
                <Lightbulb /> Show Hints
              </>
            )}
          </Button>
        </div>
        <div className="flex-center gap-2">
          <Button variant="outline" className="code-editor-button" title="Reset editor" onClick={handleResetEditor}>
            <RotateCcw />
            Reset
          </Button>
          <Button variant="outline" className="code-editor-button" title="View solution" onClick={handleViewSolution}>
            Solution
          </Button>
          <Button
            variant="primary"
            className="code-editor-button outline outline-primary"
            title="Run tests"
            onClick={handleRunTests}
          >
            <Play />
            Run Tests
          </Button>
        </div>
      </div>
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

      <div className="h-[56dvh] overflow-hidden rounded-lg">
        <Editor
          defaultLanguage="python"
          defaultValue={challenge.startercode}
          onMount={handleEditorDidMount}
          theme={theme || "vs-dark"}
          loading={<Spinner />}
        />
      </div>

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
        !hasTestsRun ? (
          <div className="px-3 py-2.5 h-36 bg-background/80 rounded-md shadow-xs">
            <p className={`font-medium text-sm text-accent ${firacode.className}`}>
              Click "Run Tests" to see output...
            </p>
          </div>
        ) : (
          <div className={firacode.className}>
            <p className="font-medium text-right text-sm text-muted-foreground mb-2">Passed: 2/3</p>
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
                        "[&>svg]:size-4 [&>svg]:text-white rounded-full p-px",
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
        )
      ) : (
        <div className="space-y-2 items-start">
          {challenge.testcases.map((item, idx) => (
            <div
              className={`px-3 py-2.5 bg-background/80 border border-secondary/40 rounded-md shadow-xs space-y-1 ${firacode.className}`}
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
