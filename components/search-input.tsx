"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (search: string) => void;
  className?: string;
  placeholder?: string;
}

export default function SearchInput({ search, onSearchChange, className = "", placeholder = "" }: Props) {
  return (
    <form className={`max-w-sm md:max-w-md mx-auto ${className}`} onSubmit={(e) => e.preventDefault()}>
      <label className="border-2 border-muted-foreground bg-background flex items-center py-1.5 px-2.5 rounded-lg gap-1.5 outline-0 focus-within:outline-2 focus-within:border-muted outline-primary">
        <Search className="size-4.5" />
        <input
          type="text"
          className="text-secondary-foreground outline-none w-full placeholder:text-muted-foreground/60 focus:placeholder:text-transparent placeholder:font-light"
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>
    </form>
  );
}
