import path from "node:path";
import { promises as fs } from "node:fs";
import { editor } from "monaco-editor";

export interface IEditorTheme {
  label: string;
  name: string;
  data: editor.IStandaloneThemeData;
}

export async function getAllThemesData(): Promise<IEditorTheme[]> {
  const themesDirPath = path.join(process.cwd(), "lib", "themes");
  const fileNames = await fs.readdir(themesDirPath);
  const themePromises = fileNames
    .filter((name) => name.endsWith(".json"))
    .map(async (fileName) => {
      const filePath = path.join(themesDirPath, fileName);
      const fileContent = await fs.readFile(filePath, "utf-8");
      const label = path.parse(fileName).name.replaceAll("-", " ");
      const name = label.replaceAll(" ", "-").toLowerCase();
      const data = JSON.parse(fileContent);
      return { label, name, data } as IEditorTheme;
    });
  const themes = await Promise.all(themePromises);
  return themes;
}
