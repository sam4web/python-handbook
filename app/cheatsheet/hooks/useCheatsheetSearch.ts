import useDebounceEffect from "@/hooks/use-debounce-effect";
import { ICheatsheetData, ICheatsheetItem } from "@/lib/cheatsheets";
import { useCallback, useState } from "react";

export default function useCheatsheetSearch(initialData: ICheatsheetData[]) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<ICheatsheetItem[] | null>(null);

  const filterCheatsheetItems = useCallback((search: string, cheatsheets: ICheatsheetData[]) => {
    const sanitizedSearch = search.trim().toLowerCase();
    if (!sanitizedSearch) {
      return null;
    }
    const result = cheatsheets.flatMap((cheatsheet) => {
      return cheatsheet.items.filter((item) => {
        const text = `${item.title} ${item.kind}`.toLowerCase();
        return text.includes(sanitizedSearch);
      });
    });
    return result;
  }, []);

  useDebounceEffect(
    () => {
      const results = filterCheatsheetItems(search, initialData);
      setFilteredData(results);
    },
    [search, initialData, filterCheatsheetItems],
    350
  );

  return {
    search,
    setSearch,
    filteredData,
  };
}
