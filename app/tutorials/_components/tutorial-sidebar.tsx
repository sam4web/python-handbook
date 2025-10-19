"use client";

import { BookOpen } from "lucide-react";
import Dropdown from "./dropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { cx } from "@/lib/utils";
import { SidebarProvider, useSidebar } from "../_context/sidebar-context";
import PageOverlay from "./page-overlay";
import OpenSidebarButton from "./open-sidebar-button";
import CloseSidebarButton from "./close-sidebar-button";

const sidebarItems = [
  {
    id: "3e0b2a5f-0f6c-48d9-9b1e-7f6c3a0d9b1e",
    title: "Python Basics",
    items: [
      { title: "What is Python?", slug: "what-is-python" },
      { title: "Setting Up Python", slug: "setting-up-python" },
      { title: "Hello World Program", slug: "hello-world-program" },
      { title: "Python Syntax", slug: "python-syntax" },
    ],
  },
  {
    id: "f7b5e840-a0c3-4c9d-8f2e-4b7d1e8c9f0a",
    title: "Data Types",
    items: [
      { title: "Numbers (int, float)", slug: "numbers-int-float" },
      { title: "Strings", slug: "strings" },
      { title: "Lists", slug: "lists" },
      { title: "Tuples", slug: "tuples" },
      { title: "Dictionaries", slug: "dictionaries" },
      { title: "Sets", slug: "sets" },
    ],
  },
  {
    id: "7c6e5d4b-3a2f-1e0d-9c8b-7a6f5e4d3c2b",
    title: "Control Flow",
    items: [
      { title: "if, elif, else", slug: "if-elif-else" },
      { title: "for Loops", slug: "for-loops" },
      { title: "while Loops", slug: "while-loops" },
      { title: "break and continue", slug: "break-and-continue" },
    ],
  },
];

export default function TutorialSidebar() {
  const isMobile = useIsMobile();
  const { activeDropdownList, showTutorialSidebar } = useSidebar();

  return (
    <>
      {showTutorialSidebar && isMobile ? <PageOverlay /> : null}
      {isMobile ? <OpenSidebarButton /> : null}

      <aside
        className={cx(
          "z-[5] overflow-y-auto bg-muted w-full h-full max-w-72 fixed top-0 left-0 select-none shadow-sm shadow-muted styled-scrollbar",
          isMobile ? "max-w-md!" : "",
          !showTutorialSidebar && isMobile ? "-translate-x-full " : ""
        )}
      >
        <div className="mt-20 px-4 py-2">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="text-accent size-5" />
              <p className="text-lg">Python Lessons</p>
            </div>
            {showTutorialSidebar && isMobile ? <CloseSidebarButton /> : null}
          </div>

          <div className="space-y-1">
            {sidebarItems.map((item, idx) => (
              <Dropdown
                key={item.id}
                id={item.id}
                title={item.title}
                items={item.items}
                active={idx === 0 || activeDropdownList.includes(item.id)}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
