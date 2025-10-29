"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (search: string) => void;
}

export default function CheatsheetSearch({ search, onSearchChange }: Props) {
  return (
    <>
      <form className="max-w-sm md:max-w-md mx-auto">
        <label className="border border-secondary-foreground bg-background flex items-center py-1.5 px-2.5 rounded-md gap-1.5 outline-0 focus-within:outline-2 focus-within:border-muted  outline-primary">
          <Search className="size-4.5" />
          <input
            type="text"
            className="text-secondary-foreground outline-none flex-1 placeholder:text-muted-foreground/60 focus:placeholder:text-transparent placeholder:font-light"
            placeholder="Search by keywords or concepts..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
      </form>
    </>
  );
}
