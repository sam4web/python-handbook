import path from "path";
import fs from "fs";
import { IEditorTheme } from "./shared";

export function getAllThemesData(): IEditorTheme[] {
  const themesDirPath = path.join(process.cwd(), "lib", "config", "themes");
  const fileNames = fs.readdirSync(themesDirPath).filter((name) => name.endsWith(".json"));
  const themes = fileNames.map((fileName) => {
    const filePath = path.join(themesDirPath, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const label = path.parse(fileName).name.replaceAll("-", " ");
    const name = label.replaceAll(" ", "-").toLowerCase();
    const data = JSON.parse(fileContent);
    return { label, name, data } as IEditorTheme;
  });
  return themes;
}
