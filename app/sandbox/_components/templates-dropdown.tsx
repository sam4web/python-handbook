import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import templates from "../data/templates";
import { cx } from "@/lib/utils";

export default function TemplatesDropdown({
  handleSelectTemplate,
  dropSide = "left",
}: {
  handleSelectTemplate: (templateCode: string) => void;
  dropSide?: "left" | "right";
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative">
      <button className="dropdown-button" onClick={() => setActive((prev) => !prev)}>
        <p className="capitalize">Starter Code</p>
        {active ? <ChevronUp /> : <ChevronDown />}
      </button>

      {active ? (
        <ul className="dropdown-list styled-scrollbar-sm w-48 right-0">
          {templates.map((item) => {
            return (
              <li
                key={item.name}
                onClick={() => {
                  setActive(false);
                  handleSelectTemplate(item.code);
                }}
                className="dropdown-list-item"
              >
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
