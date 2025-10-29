"use client";

import Link from "next/link";
import { useRef } from "react";
import { poppins } from "@/lib/fonts";
import useCheatsheetSearch from "../_hooks/use-cheatsheet-search";
import { ICheatsheetData, ICheatsheetTopic } from "@/lib/cheatsheets";
import CheatsheetSidebar from "./cheatsheet-sidebar";
import CheatsheetItemsGrid from "./cheatsheet-item-grid";
import SearchInput from "@/components/search-input";

interface Props {
  cheatsheetData: ICheatsheetData[];
  topics: ICheatsheetTopic[];
}

export default function CheatsheetIndex({ cheatsheetData, topics }: Props) {
  const topicsElementRef = useRef<HTMLDivElement>(null);
  const { search, setSearch, filteredData } = useCheatsheetSearch(cheatsheetData);

  return (
    <>
      <div className="space-y-3 md:space-y-4.5">
        <SearchInput search={search} onSearchChange={setSearch} placeholder="Search by keywords or concepts..." />
        <div className="flex items-center justify-center flex-wrap gap-1.5 md:gap-2 w-full" ref={topicsElementRef}>
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="border-muted border px-2.5 py-0.5 text-muted-foreground rounded-md shadow-xs bg-muted/60 hover:bg-primary/10 hover:text-primary hover:border-primary cursor-pointer"
            >
              <Link className="text-sm" href={"#" + topic.slug} onClick={() => setSearch("")}>
                {topic.title}
              </Link>
            </div>
          ))}
        </div>
        <CheatsheetSidebar topics={topics} elementRef={topicsElementRef} setSearch={setSearch} />
      </div>

      <div className="max-w-md md:max-w-full mx-auto">
        {!search.trim().length || !filteredData ? (
          cheatsheetData.map((cheatsheet) => (
            <div id={cheatsheet.slug} className="my-4 md:my-6" key={`${cheatsheet.order} ${cheatsheet.slug}`}>
              <div className="flex items-center justify-between w-full border-b px-0.5 py-1 md:py-2.5 border-primary">
                <div className="flex items-center gap-2 md:gap-3">
                  <p className={`text-2xl md:text-3xl font-medium text-primary ${poppins.className}`}>
                    {cheatsheet.title}
                  </p>
                  <div className="bg-muted rounded-sm px-2.5 py-0.5 text-center">
                    <p className="text-base font-semibold">{cheatsheet.items.length}</p>
                  </div>
                </div>
              </div>
              <CheatsheetItemsGrid items={cheatsheet.items} />
            </div>
          ))
        ) : filteredData.length ? (
          <div className="my-4 md:my-6">
            <div className="flex items-center justify-between w-full border-dashed border-b px-0.5 py-1 md:py-2.5 border-primary">
              <p className={`text-xl md:text-2xl font-medium text-primary ${poppins.className}`}>
                <span className="font-semibold">{filteredData.length}</span> Search Results Found
              </p>
            </div>
            <CheatsheetItemsGrid items={filteredData} />
          </div>
        ) : (
          <div className={`text-center my-4 md:my-6 ${poppins.className}`}>
            <p className="text-xl md:text-2xl text-destructive font-medium md:mb-2">No results found</p>
            <p className="text-base md:text-lg text-muted-foreground">
              for "<span className="font-semibold text-destructive">{search}</span>".
            </p>
            <p className="text-sm mt-3 md:mt-4 text-muted-foreground/50">Try adjusting your search term.</p>
          </div>
        )}
      </div>
    </>
  );
}
