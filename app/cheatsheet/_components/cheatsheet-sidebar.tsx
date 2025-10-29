"use client";

import Button from "@/components/ui/button";
import { ICheatsheetTopic } from "@/lib/cheatsheets";
import { cx } from "@/lib/utils";
import { NotebookText, X } from "lucide-react";
import Link from "next/link";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import TopicScrollTracker from "./topic-scroll-tracker";

interface Props {
  topics: ICheatsheetTopic[];
  elementRef: RefObject<HTMLElement | null>;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function CheatsheetSidebar({ topics, elementRef, setSearch }: Props) {
  const [isPassed, setIsPassed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeDiv, setActiveDiv] = useState<string | null>(null);

  const openSidebar = () => setShowSidebar(true);
  const closeSidebar = () => setShowSidebar(false);

  return (
    <>
      {/* Page Overlay */}
      {isPassed && showSidebar ? <div className="page-overlay" onClick={closeSidebar} /> : null}

      {/* Open Topics Sidebar Button */}
      <Button
        variant="icon"
        title="Show topics list"
        onClick={openSidebar}
        className={cx(
          "border-border! bg-muted/95! fixed left-2 top-16 p-2! z-4",
          isPassed && !showSidebar ? "block" : "hidden"
        )}
      >
        <NotebookText />
      </Button>

      {/* Topic List Sidebar */}
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
            <p className="text-lg font-medium">Topics</p>
          </div>
          {/* Close Topics Side bar */}
          <Button
            variant="icon"
            title="Close tutorial sidebar"
            onClick={closeSidebar}
            className="[&>svg]:text-destructive! p-0.5! rounded-sm! bg-transparent! hover:border-secondary!"
          >
            <X />
          </Button>
        </div>
        <div className="pl-1 lg:pl-2 space-y-0.5 my-0.5">
          {topics.map((topic, idx) => (
            <Link
              key={idx}
              href={"#" + topic.slug}
              onClick={() => {
                closeSidebar();
                setSearch("");
              }}
              className={cx(
                "hover:bg-muted-foreground/20 px-2.5 py-1 cursor-pointer block rounded-lg",
                topic.slug === activeDiv ? "text-primary bg-muted-foreground/15 font-medium" : ""
              )}
            >
              {topic.title}
            </Link>
          ))}
        </div>
      </div>

      <TopicScrollTracker
        topics={topics}
        setActiveDiv={setActiveDiv}
        elementRef={elementRef}
        setIsPassed={setIsPassed}
        setShowSidebar={setShowSidebar}
      />
    </>
  );
}
