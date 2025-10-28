"use client";

import Button from "@/components/ui/button";
import { cx } from "@/lib/utils";
import { NotebookText, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CheatsheetCategoryNavigation({ topics }: { topics: { title: string; target: string }[] }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isPassed, setIsPassed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const openTopicsSidebar = () => {
    setShowSidebar(true);
  };

  const closeTopicsSidebar = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowSidebar(false);
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        setIsPassed(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Topics list */}
      <div className="flex items-center justify-center flex-wrap gap-1 md:gap-2 w-full" ref={elementRef}>
        {topics.map((topic, idx) => (
          <div
            key={idx}
            className="border-muted-foreground/30 border px-2.5 py-0.5 rounded-md shadow-xs bg-muted/30 hover:bg-primary/10 hover:text-accent cursor-pointer"
          >
            <Link className="text-sm" href={topic.target}>
              {topic.title}
            </Link>
          </div>
        ))}
      </div>

      {/* Page Overlay */}
      {isPassed && showSidebar ? <div className="page-overlay" onClick={closeTopicsSidebar} /> : null}

      {/* Open Topics Sidebar Button */}
      <Button
        variant="icon"
        title="Show topics list"
        onClick={openTopicsSidebar}
        className={cx(
          "border-border! bg-muted/95! fixed left-2 top-16 p-2! z-4",
          isPassed && !showSidebar ? "block" : "hidden"
        )}
      >
        <NotebookText />
      </Button>

      <div
        className={cx(
          "bg-muted md:bg-muted/80 rounded-lg shadow-sm shadow-muted fixed top-12 w-full max-w-full md:max-w-xs z-5 h-dvh select-none mt-1 px-3 py-4",
          showSidebar ? "left-0" : "-left-full",
          isPassed ? "block" : "hidden"
        )}
      >
        <div className="mb-4 flex items-center justify-between px-2.5 lg:px-4">
          <div className="flex items-center gap-2">
            <NotebookText className="text-primary size-5" />
            <p className="text-lg font-medium">Python Lessons</p>
          </div>
          {/* Close Topics Side bar */}
          <Button
            variant="icon"
            title="Close tutorial sidebar"
            onClick={closeTopicsSidebar}
            className="[&>svg]:text-destructive! p-0.5! rounded-sm! bg-transparent! hover:border-secondary!"
          >
            <X />
          </Button>
        </div>

        <div className="pl-1 lg:pl-2 space-y-0.5 my-0.5">
          {topics.map((topic, idx) => (
            <Link
              key={idx}
              href={topic.target}
              //         className="flex justify-between items-center hover:bg-muted-foreground/20 py-1.5 px-2.5 rounded-lg"

              className={cx(
                "hover:bg-muted-foreground/20 px-2.5 py-1 cursor-pointer block rounded-lg"
                // active
                // ? "text-primary dark:bg-muted-foreground/15 bg-muted-foreground/5 font-medium"
                // : ""
              )}
            >
              {topic.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
