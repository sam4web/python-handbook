import { Editor, OnMount } from "@monaco-editor/react";
import Spinner from "./spinner";

export default function CodeEditor({
  startercode,
  theme,
  handleEditorDidMount,
}: {
  startercode: string;
  theme: string | null;
  handleEditorDidMount: OnMount;
}) {
  return (
    <Editor
      options={{ multiCursorLimit: 1, cursorSmoothCaretAnimation: "off" }}
      defaultLanguage="python"
      defaultValue={startercode}
      onMount={handleEditorDidMount}
      theme={theme || "vs-dark"}
      loading={<Spinner />}
    />
  );
}
