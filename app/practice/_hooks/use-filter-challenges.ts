import useSearchFilter from "@/hooks/use-search-filter";
import { IChallenge } from "@/lib/practice";
import { useCallback } from "react";

export default function useFilterChallenges(challenges: IChallenge[]) {
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
  const data = useSearchFilter<IChallenge>(challenges, filterChallenges);
  return { ...data };
}
