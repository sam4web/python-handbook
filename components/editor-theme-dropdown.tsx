import { cx } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function EditorThemeDropdown({
  themes,
  handleThemeChange,
  activeTheme,
  dropSide = "left",
}: {
  themes: { label: string; name: string }[];
  activeTheme: { label: string; name: string };
  handleThemeChange: (theme: string) => void;
  dropSide?: "left" | "right";
}) {
  const [selectedTheme, setSelectedTheme] = useState(activeTheme);
  const [active, setActive] = useState(false);

  return (
    <div className="relative">
      <button className="dropdown-button" onClick={() => setActive((prev) => !prev)}>
        <p className="capitalize">{selectedTheme.label}</p>
        {active ? <ChevronUp /> : <ChevronDown />}
      </button>

      {active ? (
        <ul className="dropdown-list styled-scrollbar-sm left-0 ">
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
                className={cx("dropdown-list-item", selected ? "active" : "")}
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
