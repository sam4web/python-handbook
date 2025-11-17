"use client";

import { useMemo, useState } from "react";
import SearchInput from "@/components/search-input";
import { cx } from "@/lib/utils";
import { poppins } from "@/lib/fonts";
import { X } from "lucide-react";
import ChallengeColumnGrid from "./challenge-column-grid";
import useFilterChallenges from "../_hooks/use-filter-challenges";
import { DIFFICULTY_MAP, DifficultyKey, IChallengeListItem } from "../utils/shared";

export default function PracticeIndex({ challenges }: { challenges: IChallengeListItem[] }) {
  const [difficulty, setDifficulty] = useState<DifficultyKey | null>(null);

  const { search, setSearch, filteredData } = useFilterChallenges(challenges);

  const dataToRender = useMemo(() => {
    let result = challenges;
    const sanitizedSearch = search.trim().toLowerCase();
    if (sanitizedSearch) {
      result = filteredData || [];
    }
    if (difficulty) {
      result = result.filter((challenge) => challenge.difficulty === difficulty);
    }
    return result;
  }, [difficulty, filteredData]);

  return (
    <>
      <div className="space-y-3 md:space-y-4.5">
        <SearchInput
          search={search}
          onSearchChange={(search) => setSearch(search)}
          placeholder="Search challenges..."
        />
        {/* Difficulty Options List */}
        <div className="max-w-sm md:max-w-lg mx-auto flex items-start justify-center gap-2">
          <p className="font-medium text-sm text-muted-foreground">Difficulty:</p>
          <div className="flex-center gap-2">
            <div className="tag-container mx-0">
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
            {/* Clear Difficulty Filter Button */}
            {difficulty ? (
              <button
                title="Clear difficulty filter"
                onClick={() => setDifficulty(null)}
                className="flex items-center gap-1 cursor-pointer bg-destructive rounded-full p-0.5"
              >
                <X className="size-4 text-foreground" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {dataToRender.length > 0 ? (
        <ChallengeColumnGrid challenges={dataToRender} />
      ) : (
        <div className={`text-center my-4 md:my-6 ${poppins.className}`}>
          <p className="text-xl md:text-2xl text-destructive font-normal md:mb-2">No results found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search term.</p>
        </div>
      )}
    </>
  );
}
