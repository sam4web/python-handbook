"use client";

import Button from "@/components/ui/button";
import { firacode } from "@/lib/fonts";
import { Lightbulb, LightbulbOff, Play, RotateCcw } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import EditorThemeDropdown from "./editor-theme-dropdown";
import { Editor, OnMount } from "@monaco-editor/react";
import Spinner from "@/components/spinner";
import { editor } from "monaco-editor";
import { IEditorTheme } from "../../utils/shared";

export default function ChallengeCodeEditor({ challenge, themes }: { challenge: any; themes: IEditorTheme[] }) {
  const [showHint, setShowHint] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

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
    console.log(code);
  };

  const handleResetEditor = () => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.setValue(challenge.startercode);
  };

  const handleViewSolution = () => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.setValue(challenge.solutioncode);
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
    <div className="px-3 py-2 space-y-3">
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
            {challenge.hints.map((hint: string, idx: number) => (
              <li className="text-xs list-decimal ml-6 text-secondary-foreground" key={idx}>
                {hint}
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      <div className="h-[50dvh] overflow-hidden shadow-xs rounded-md">
        <Editor
          defaultLanguage="python"
          defaultValue={challenge.startercode}
          onMount={handleEditorDidMount}
          theme={theme || "vs-dark"}
          loading={<Spinner />}
        />
      </div>
    </div>
  );
}
