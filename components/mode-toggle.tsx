"use client";

import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>theme-toggler</button>;
}
