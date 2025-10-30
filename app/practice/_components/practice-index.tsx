"use client";

import { useState } from "react";
import SearchInput from "@/components/search-input";
import { DIFFICULTY_MAP, IChallenge, DifficultyKey } from "@/lib/practice";
import { cx } from "@/lib/utils";
import PracticeItemGrid from "./practice-item-grid";

export default function PracticeIndex({ challenges }: { challenges: IChallenge[] }) {
  const [difficulty, setDifficulty] = useState<DifficultyKey | null>(null);

  return (
    <>
      <div className="space-y-3 md:space-y-4.5">
        <SearchInput search={""} onSearchChange={(search) => console.log(search)} placeholder="Search challenges..." />
        <div className="max-w-sm md:max-w-md mx-auto flex gap-2">
          <p className="font-medium text-sm text-muted-foreground">Difficulty:</p>
          <div className="tag-container">
            {DIFFICULTY_MAP.map((item) => (
              <button
                key={item.key}
                className={cx("tag cursor-pointer", difficulty === item.key ? "tag-active" : "")}
                onClick={() => setDifficulty((prev) => (prev === item.key ? null : item.key))}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <PracticeItemGrid challenges={challenges} />
    </>
  );
}
