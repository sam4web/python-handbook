import useSearchFilter from "@/hooks/use-search-filter";
import { useCallback } from "react";
import { IChallengeListItem } from "../utils/shared";

export default function useFilterChallenges(challenges: IChallengeListItem[]) {
  const filterChallenges = useCallback((search: string, challenges: IChallengeListItem[]) => {
    const sanitizedSearch = search.trim().toLowerCase();
    if (!sanitizedSearch) {
      return null;
    }
    return challenges.filter((item) => {
      const text = `${item.title} ${item.category.join(" ")}`.toLowerCase();
      return text.includes(sanitizedSearch);
    });
  }, []);
  const data = useSearchFilter<IChallengeListItem>(challenges, filterChallenges);
  return { ...data };
}
