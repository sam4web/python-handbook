import { cx } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const themes = [
  {
    label: "GitHub Dark",
    value: "github-dark",
  },
  {
    label: "Monokai",
    value: "monokai",
  },
  {
    label: "Dracula",
    value: "dracula",
  },
];

export default function ThemeDropdown() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0].value);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (active) {
      timerId = setTimeout(() => {
        setActive(false);
      }, 2500);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [active]);

  return (
    <div className="relative">
      <button
        className="code-editor-button bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-muted-foreground/15 hover:opacity-85 shadow-xs py-1 px-2 appearance-none rounded-sm cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
      >
        <p className="capitalize">{selectedTheme.replace("-", " ")}</p>

        {active ? <ChevronUp /> : <ChevronDown />}
      </button>

      {active ? (
        <ul className="flex flex-col items-start absolute top-[135%] left-0 outline outline-muted-foreground/25 w-44 shadow-xs rounded-md p-1.5 space-y-1">
          {themes.map((theme) => {
            const selected = selectedTheme === theme.value;
            return (
              <li
                key={theme.value}
                onClick={() => {
                  setSelectedTheme(theme.value);
                  setActive(false);
                }}
                className={cx(
                  "text-sm py-1 px-2 cursor-pointer rounded-sm w-full flex-between",
                  selected
                    ? "bg-secondary/80 font-medium text-secondary-foreground"
                    : "hover:bg-muted-foreground/15 hover:opacity-85 "
                )}
              >
                {theme.label}
                {selected ? <Check className="size-4" /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
