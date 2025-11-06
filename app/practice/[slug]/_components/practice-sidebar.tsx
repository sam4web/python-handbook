"use client";

import SearchInput from "@/components/search-input";
import Button from "@/components/ui/button";
import { firacode } from "@/lib/fonts";
import { cx } from "@/lib/utils";
import { Target, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import useFilterChallenges from "../../_hooks/use-filter-challenges";
import { DIFFICULTY_FILTERS, IChallengeListItem } from "../../utils/shared";

export default function PracticeSidebar({
  challenges,
  activeChallengeSlug,
}: {
  challenges: IChallengeListItem[];
  activeChallengeSlug: string;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const openSidebar = () => setShowSidebar(true);
  const closeSidebar = () => setShowSidebar(false);
  const { search, setSearch, filteredData } = useFilterChallenges(challenges);

  useEffect(() => {
    const handleScroll = () => {
      closeSidebar();
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dataToRender = useMemo(() => {
    const activeItem = challenges.find((item) => item.slug === activeChallengeSlug) || null;
    const sanitizedSearch = search.trim().toLowerCase();
    if (sanitizedSearch) {
      return filteredData || [];
    }
    let result = [...challenges].splice(0, 6).filter((item) => item.slug !== activeChallengeSlug);
    if (activeItem) {
      result = [activeItem, ...result];
    }
    return result;
  }, [filteredData]);

  return (
    <>
      {/* Page Overlay */}
      {showSidebar ? <div className="page-overlay" onClick={closeSidebar} /> : null}

      {/* Open Challenges Sidebar Button */}
      <Button
        variant="icon"
        title="Show topics list"
        onClick={openSidebar}
        className={cx("open-sidebar-button", !showSidebar ? "block" : "hidden")}
      >
        <Target />
      </Button>

      {/* Challenges List Sidebar */}
      <div className={cx("sidebar overflow-y-auto styled-scrollbar-sm", showSidebar ? "left-0" : "-left-full")}>
        <div className="mb-4 px-2.5">
          <div className="flex-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="text-primary size-6" />
              <p className="text-lg font-medium">Challenges</p>
            </div>

            {/* Close Challenges Side bar */}
            <Button
              variant="icon"
              title="Close tutorial sidebar"
              onClick={closeSidebar}
              className="close-sidebar-button"
            >
              <X />
            </Button>
          </div>

          <SearchInput
            search={search}
            onSearchChange={(search) => setSearch(search)}
            placeholder="Search challenges..."
          />
        </div>

        <div className="px-1 space-y-2.5 my-5">
          {dataToRender.map((challenge) => {
            const difficulty = DIFFICULTY_FILTERS[challenge.difficulty];
            return (
              <Link
                href={`/practice/${challenge.slug}`}
                key={challenge.id}
                className={cx(
                  "card cursor-pointer bg-background block translate-y-0! outline max-w-72",
                  activeChallengeSlug === challenge.slug
                    ? "border-primary! outline-transparent"
                    : "border-transparent! hover:bg-accent-foreground/10! outline-secondary-foreground/10"
                )}
              >
                <div className="flex justify-between items-start py-0.5">
                  <p className={`text-wrap font-medium ${firacode.className}`}>{challenge.title}</p>
                  <p className={`px-1 py-px rounded-xs text-xs shadow-xs font-medium  ${difficulty?.colorClass}`}>
                    {difficulty?.label}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
