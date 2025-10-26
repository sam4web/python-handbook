"use client";

import Button from "@/components/ui/button";
import { cx } from "@/lib/utils";
import { NotebookText, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CheatSheetTopicList({ topics }: { topics: { title: string; target: string }[] }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isPassed, setIsPassed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
      <div className="flex items-center justify-center flex-wrap gap-2 w-full" ref={elementRef}>
        {topics.map((topic, idx) => (
          <div
            key={idx}
            className="border-muted-foreground/30 border px-2.5 py-0.5 rounded-md shadow-xs bg-muted/35 hover:bg-primary/10 hover:text-accent cursor-pointer"
          >
            <Link className="text-sm" href={topic.target}>
              {topic.title}
            </Link>
          </div>
        ))}
      </div>

      <Button
        variant="icon"
        title="Show topics list"
        onClick={() => setShowSidebar(true)}
        className={cx(
          "border-border! bg-muted/95! fixed left-2 top-16 p-2! z-4",
          isPassed && !showSidebar ? "block" : "hidden"
        )}
      >
        <NotebookText />
      </Button>
      <div
        className={cx(
          "fixed top-16 w-full max-w-54 z-5",
          showSidebar ? "left-2" : "-left-full",
          isPassed ? "block" : "hidden"
        )}
      >
        <div className="border-muted-foreground/30 border bg-muted/95 px-3 py-3.5 rounded-lg shadow-sm shadow-muted">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 mb-1.5">
              <NotebookText className="text-primary size-5" />
              <p className="text-base font-medium">Topics</p>
            </div>
            <Button
              variant="icon"
              title="Close topics list"
              onClick={() => setShowSidebar(false)}
              className="[&>svg]:text-destructive! p-0.5! bg-transparent! border-none!"
            >
              <X />
            </Button>
          </div>
          <div className="flex flex-col gap-0.5">
            {topics.map((topic, idx) => (
              <div key={idx} className="cursor-pointer hover:bg-muted-foreground/20 rounded-md px-3 py-1 block">
                <Link className="text-sm text-foreground" href={topic.target}>
                  {topic.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
