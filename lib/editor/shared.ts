import { editor } from "monaco-editor";

export interface IThemeOption {
  name: string;
  label: string;
}

export interface IEditorTheme extends IThemeOption {
  data: editor.IStandaloneThemeData;
}
