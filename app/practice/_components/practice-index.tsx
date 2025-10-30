"use client";

import { useCallback, useMemo, useState } from "react";
import SearchInput from "@/components/search-input";
import { DIFFICULTY_MAP, IChallenge, DifficultyKey } from "@/lib/practice";
import { cx } from "@/lib/utils";
import useSearchFilter from "@/hooks/use-search-filter";
import { poppins } from "@/lib/fonts";
import { X } from "lucide-react";
import ChallengeColumnGrid from "./challenge-column-grid";

export default function PracticeIndex({ challenges }: { challenges: IChallenge[] }) {
  const [difficulty, setDifficulty] = useState<DifficultyKey | null>(null);

  const filterChallenges = useCallback((search: string, challenges: IChallenge[]) => {
    const sanitizedSearch = search.trim().toLowerCase();
    if (!sanitizedSearch) {
      return null;
    }
    return challenges.filter((item) => {
      const text = `${item.title} ${item.category.join(" ")}`.toLowerCase();
      return text.includes(sanitizedSearch);
    });
  }, []);

  const { search, setSearch, filteredData } = useSearchFilter<IChallenge>(challenges, filterChallenges);

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
          {/* Clear Difficulty Filter Button */}
          {difficulty ? (
            <button
              title="Clear difficulty filter"
              onClick={() => setDifficulty(null)}
              className="flex items-center gap-1 cursor-pointer bg-destructive rounded-full p-1"
            >
              <X className="size-4 text-foreground" />
            </button>
          ) : (
            ""
          )}
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
