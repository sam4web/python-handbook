import { cx } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function EditorThemeDropdown({
  themes,
  handleThemeChange,
  activeTheme,
}: {
  themes: { label: string; name: string }[];
  activeTheme: { label: string; name: string };
  handleThemeChange: (theme: string) => void;
}) {
  const [selectedTheme, setSelectedTheme] = useState(activeTheme);
  const [active, setActive] = useState(false);

  return (
    <div className="relative">
      <button
        className="code-editor-button bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-muted-foreground/15 hover:opacity-85 shadow-xs py-1 px-2 appearance-none rounded-sm cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      >
        <p className="capitalize">{selectedTheme.label}</p>
        {active ? <ChevronUp /> : <ChevronDown />}
      </button>

      {active ? (
        <ul className="flex flex-col items-start absolute top-[135%] left-0 bg-muted/85 backdrop-blur-xs outline outline-muted-foreground/25 w-44 shadow-xs rounded-md p-1.5 space-y-1 z-3 max-h-60 overflow-y-scroll styled-scrollbar-sm">
          {themes.map((theme) => {
            const selected = selectedTheme.name === theme.name;
            return (
              <li
                key={theme.name}
                onClick={() => {
                  setActive(false);
                  if (!selected) {
                    setSelectedTheme(theme);
                    handleThemeChange(theme.name);
                  }
                }}
                className={cx(
                  "text-sm py-1 px-2 cursor-pointer rounded-sm w-full flex-between",
                  selected
                    ? "bg-accent-foreground/60 dark:bg-secondary/80 font-medium text-secondary-foreground"
                    : "hover:bg-secondary dark:hover:bg-secondary/45 hover:opacity-85 "
                )}
              >
                <p>{theme.label}</p>
                {selected ? <Check className="size-4 text-secondary-foreground" /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
