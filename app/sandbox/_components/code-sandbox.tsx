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
import { Copy, CopyCheck, OctagonX, Play, Save, Trash } from "lucide-react";
import { editor } from "monaco-editor";
import { useRef, useState } from "react";
import usePanelResizer from "../_hooks/use-panel-resizer";
import TemplatesDropdown from "./templates-dropdown";

export default function CodeSandbox({ themes }: { themes: IEditorTheme[] }) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const topPanelRef = useRef<HTMLDivElement | null>(null);
  const bottomPanelRef = useRef<HTMLDivElement | null>(null);
  const { activeTheme, themeList } = useEditorTheme(themes);
  const { handleDragStart } = usePanelResizer(topPanelRef, bottomPanelRef);
  const { output, pyodideReady, runPythonCode, running, interruptExecution, setOutput } = usePyodideRunner();

  const handleCopyCode = () => {
    if (!output) {
      return;
    }
    navigator.clipboard
      .writeText(output)
      .then(() => {
        setCopied(true);
        // alert here
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error(error);
      });
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

  const handleSelectTemplate = (templateCode: string) => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.setValue(templateCode);
  };

  const handleResetEditor = () => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.setValue("");
    setOutput("");
  };

  const handleRunCode = () => {
    if (!editorRef.current) {
      return;
    }
    runPythonCode(editorRef.current.getValue());
  };

  const handleSaveCode = () => {
    if (!editorRef.current) {
      return;
    }
    setSaved(true);
    const codeToSave = editorRef.current.getValue();
    const filename = "main.py";
    const blob = new Blob([codeToSave], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.download = filename;
    document.body.appendChild(aTag);
    aTag.click();
    document.body.removeChild(aTag);
    URL.revokeObjectURL(url);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="py-1 md:py-2 space-y-2.5">
      <div className="flex justify-between gap-2.5 items-start xs:items-center flex-col-reverse xs:flex-row">
        <div className="flex-between gap-2.5">
          {running ? (
            <Button
              disabled={!pyodideReady || !running}
              variant="primary"
              className="code-editor-button outline outline-primary"
              title="Stop Execution"
              onClick={interruptExecution}
            >
              <OctagonX />
              <span>Stop Execution</span>
            </Button>
          ) : (
            <Button
              disabled={!pyodideReady || running}
              variant="primary"
              className="code-editor-button outline outline-primary"
              title="Run code"
              onClick={handleRunCode}
            >
              <Play />
              <span>Run Code</span>
            </Button>
          )}

          <Button
            variant="outline"
            className="code-editor-button"
            title="Reset editor"
            onClick={handleResetEditor}
            disabled={!pyodideReady || running}
          >
            <Trash />
            <span>Clear</span>
          </Button>

          <Button
            variant="outline"
            className="code-editor-button"
            title="Save code"
            onClick={handleSaveCode}
            disabled={saved}
          >
            <Save className={saved ? "text-green-600" : ""} />
            <span className={saved ? "text-green-600" : ""}>{saved ? "Saved" : "Save"}</span>
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

      <div className="h-[56dvh] w-full overflow-hidden rounded-md" ref={topPanelRef}>
        <CodeEditor
          theme={theme}
          startercode={'def main():\n\tprint("Hello, World!")\n\nif __name__ == "__main__":\n\tmain()'}
          handleEditorDidMount={handleEditorDidMount}
        />
      </div>

      <div className={`bg-muted/65 border-muted-foreground/30 border rounded-md shadow-muted ${firacode.className}`}>
        <div
          className="flex-between border-muted-foreground/30 border-b px-3 py-1 cursor-row-resize"
          onMouseDown={handleDragStart}
        >
          <p className="text-muted-foreground text-sm select-none">Output</p>
          <Button
            variant="icon"
            onClick={handleCopyCode}
            disabled={copied}
            title="Copy code"
            className={cx(
              "border-none! hover:bg-muted-foreground/10! [&>svg]:size-3.5!",
              copied ? " [&>svg]:text-green-600!" : "[&>svg]:text-muted-foreground!"
            )}
          >
            {copied ? <CopyCheck className="size-4!" /> : <Copy className="size-4!" />}
          </Button>
        </div>
        <div
          className="w-full px-3 py-2 h-48 bg-background/80  overflow-y-scroll styled-scrollbar-sm"
          ref={bottomPanelRef}
        >
          <pre className="font-medium text-sm text-accent">
            {!pyodideReady ? <>&gt; Loading please wait...</> : output}
          </pre>
        </div>
      </div>
    </div>
  );
}
