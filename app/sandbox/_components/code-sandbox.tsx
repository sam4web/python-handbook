"use client";

import EditorThemeDropdown from "@/components/editor-theme-dropdown";
import Button from "@/components/ui/button";
import useEditorTheme from "@/lib/editor/hooks/use-editor-theme";
import { IEditorTheme } from "@/lib/editor/shared";
import { OnMount } from "@monaco-editor/react";
import { Play, Save, Trash } from "lucide-react";
import { editor } from "monaco-editor";
import { useRef, useState } from "react";
import TemplatesDropdown from "./templates-dropdown";

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

  const handleSelectTemplate = (templateCode: string) => {
    console.log(templateCode);
  };

  return (
    <div className="py-1 md:py-2">
      <div className="flex justify-between gap-2.5 items-start xs:items-center flex-col-reverse xs:flex-row">
        <div className="flex-between gap-2.5">
          <Button variant="primary" className="code-editor-button outline outline-primary" title="Run tests">
            <Play />
            <span>Run Code</span>
          </Button>
          <Button variant="outline" className="code-editor-button" title="Reset editor">
            <Trash />
            <span>Clear</span>
          </Button>
          <Button variant="outline" className="code-editor-button" title="">
            <Save />
            <span>Save</span>
          </Button>
        </div>

        <div className="flex-between gap-2.5">
          <EditorThemeDropdown
            themes={themeList}
            activeTheme={activeTheme}
            handleThemeChange={handleThemeChange}
            dropSide="right"
          />
          <TemplatesDropdown handleSelectTemplate={handleSelectTemplate} dropSide="right" />
        </div>
      </div>
    </div>
  );
}
