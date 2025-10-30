"use client";

import { useCallback, useMemo, useState } from "react";
import SearchInput from "@/components/search-input";
import { DIFFICULTY_MAP, IChallenge, DifficultyKey } from "@/lib/practice";
import { cx } from "@/lib/utils";
import useSearchFilter from "@/hooks/use-search-filter";
import { useIsMobile } from "@/hooks/use-mobile";
import PracticeItem from "./practice-item";

export default function PracticeIndex({ challenges }: { challenges: IChallenge[] }) {
  const [difficulty, setDifficulty] = useState<DifficultyKey | null>(null);
  const isMobile = useIsMobile();
  const columns = useMemo(() => {
    const numColumns = isMobile ? 2 : 3;
    const columns: IChallenge[][] = Array.from({ length: numColumns }, () => []);
    challenges.forEach((item, index) => {
      const columnIndex = index % numColumns;
      columns[columnIndex].push(item);
    });
    return columns;
  }, [isMobile]);

  const filterChallenges = useCallback((search: string, challenges: IChallenge[]) => {
    return null;
  }, []);

  const { search, setSearch, filteredData } = useSearchFilter<IChallenge>(challenges, filterChallenges);

  return (
    <>
      <div className="space-y-3 md:space-y-4.5">
        <SearchInput
          search={search}
          onSearchChange={(search) => setSearch(search)}
          placeholder="Search challenges..."
        />
        {/* Difficulty Options List */}
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

      {/* Items Grid */}
      <div className="max-w-sm xs:max-w-xl md:max-w-full mx-auto">
        <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-3 items-start">
          {columns.map((col, idx) => (
            <div key={idx} className="grid gap-y-3">
              {col.map((item) => (
                <PracticeItem challenge={item} key={item.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
