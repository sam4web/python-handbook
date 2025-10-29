import { useState } from "react";
import useDebounceEffect from "./use-debounce-effect";

type DataFilter<T, R> = (search: string, cheatsheets: T[]) => R[] | null;

export default function useSearchFilter<T, R>(initialData: T[], dataFilter: DataFilter<T, R>) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<R[] | null>(null);

  useDebounceEffect(
    () => {
      const results = dataFilter(search, initialData);
      setFilteredData(results);
    },
    [search, initialData, dataFilter],
    350
  );

  return {
    search,
    setSearch,
    filteredData,
  };
}
