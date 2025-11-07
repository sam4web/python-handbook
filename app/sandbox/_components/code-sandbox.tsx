"use client";

import CodeEditor from "@/components/code-editor";
import EditorThemeDropdown from "@/components/editor-theme-dropdown";
import Button from "@/components/ui/button";
import useEditorTheme from "@/lib/editor/hooks/use-editor-theme";
import { IEditorTheme } from "@/lib/editor/shared";
import { firacode } from "@/lib/fonts";
import { cx } from "@/lib/utils";
import { OnMount } from "@monaco-editor/react";
import { Copy, CopyCheck, Play, Save, Trash } from "lucide-react";
import { editor } from "monaco-editor";
import { useRef, useState } from "react";
import TemplatesDropdown from "./templates-dropdown";

export default function CodeSandbox({ themes }: { themes: IEditorTheme[] }) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const { activeTheme, themeList } = useEditorTheme(themes);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText("df")
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
  };

  return (
    <div className="py-1 md:py-2 space-y-1 md:space-y-2.5">
      <div className="flex justify-between gap-2.5 items-start xs:items-center flex-col-reverse xs:flex-row">
        <div className="flex-between gap-2.5">
          <Button variant="primary" className="code-editor-button outline outline-primary" title="Run tests">
            <Play />
            <span>Run Code</span>
          </Button>
          <Button variant="outline" className="code-editor-button" title="Reset editor" onClick={handleResetEditor}>
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

      <div className="h-[58dvh] w-full overflow-hidden rounded-md">
        <CodeEditor
          theme={theme}
          startercode={'def main():\n\tprint("Hello, World!")\n\nif __name__ == "__main__":\n\tmain()'}
          handleEditorDidMount={handleEditorDidMount}
        />
      </div>

      <div className="bg-muted/65 border-muted-foreground/30 border rounded-md shadow-muted">
        <div className="flex-between border-muted-foreground/30 border-b px-3 py-1">
          <p className={`text-muted-foreground text-sm select-none ${firacode.className}`}>Output</p>
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
        <div className="w-full px-3 py-2 h-40 bg-background/80 border border-muted-foreground/30 dark:border-secondary/50 rounded-md shadow-xs">
          <p className={`font-medium text-sm text-accent ${firacode.className}`}>
            &gt; Click "Run Code" to see output...
          </p>
        </div>
      </div>
    </div>
  );
}
