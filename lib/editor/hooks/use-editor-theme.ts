import { useMemo } from "react";
import { IEditorTheme, IThemeOption } from "../shared";

export default function useEditorTheme(themes: IEditorTheme[]) {
  const themeList: IThemeOption[] = useMemo(() => {
    return themes.map((theme) => {
      const { name, label } = theme;
      return { name, label };
    });
  }, [themes]);

  const activeTheme: IThemeOption = (() => {
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

  return { themeList, activeTheme };
}
