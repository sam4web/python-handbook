"use client";

import EditorThemeDropdown from "@/components/editor-theme-dropdown";
import Button from "@/components/ui/button";
import useEditorTheme from "@/lib/editor/hooks/use-editor-theme";
import { IEditorTheme } from "@/lib/editor/shared";
import { OnMount } from "@monaco-editor/react";
import { Play, RotateCcw, Save } from "lucide-react";
import { editor } from "monaco-editor";
import { useRef, useState } from "react";

export default function CodeSandbox({ themes }: { themes: IEditorTheme[] }) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const { activeTheme, themeList } = useEditorTheme(themes);

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
    <>
      <div className="flex-between">
        <div className="flex-between gap-3">
          <Button variant="primary" className="code-editor-button outline outline-primary" title="Run tests">
            <Play />
            Run Tests
          </Button>
          <Button variant="outline" className="code-editor-button" title="Reset editor">
            <RotateCcw />
            Reset
          </Button>
          <Button variant="outline" className="code-editor-button" title="">
            <Save />
            Save
          </Button>
        </div>

        <div>
          <EditorThemeDropdown themes={themeList} activeTheme={activeTheme} handleThemeChange={handleThemeChange} />
        </div>
      </div>
    </>
  );
}
