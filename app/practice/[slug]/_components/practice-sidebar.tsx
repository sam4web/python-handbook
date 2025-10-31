"use client";

import SearchInput from "@/components/search-input";
import Button from "@/components/ui/button";
import { IChallenge } from "@/lib/practice";
import { cx } from "@/lib/utils";
import { Target, X } from "lucide-react";
import { useState } from "react";

export default function PracticeSidebar({
  challenges,
  activeChallengeSlug,
}: {
  challenges: IChallenge[];
  activeChallengeSlug: string;
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => setShowSidebar(true);
  const closeSidebar = () => setShowSidebar(false);

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
      <div
        className={cx(
          "sidebar",
          showSidebar ? "left-0" : "-left-full"
          // isPassed ? "block" : "hidden"
        )}
      >
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

          <div>
            <SearchInput
              search={""}
              onSearchChange={(search) => console.log(search)}
              placeholder="Search challenges..."
            />
          </div>
        </div>

        <div className="pl-1 lg:pl-2 space-y-0.5 my-0.5">
          {challenges.map((challenge) => (
            <div>{JSON.stringify(challenge)}</div>
          ))}
        </div>
      </div>
    </>
  );
}
