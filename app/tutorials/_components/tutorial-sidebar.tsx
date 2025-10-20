"use client";

import Dropdown from "./dropdown";
import { BookOpen, X } from "lucide-react";
import { cx } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Button from "@/components/ui/button";
import { SidebarItem } from "@/lib/tutorials";
import { useState } from "react";

export default function TutorialSidebar({ sidebarItems }: { sidebarItems: SidebarItem[] }) {
  const isMobile = useIsMobile();
  const [showTutorialSidebar, setShowTutorialSidebar] = useState(false);

  const openTutorialSidebar = () => {
    setShowTutorialSidebar(true);
  };

  const closeTutorialSidebar = () => {
    setShowTutorialSidebar(false);
  };

  return (
    <>
      {/* Page Overlay */}
      {showTutorialSidebar && isMobile ? (
        <div
          className="size-full fixed top-0 left-0 bg-zin/60 z-[3] bg-background/60 dark:bg-background/85 backdrop-blur-xs"
          onClick={closeTutorialSidebar}
        />
      ) : null}

      {/* Open Tutorial Sidebar Button */}
      {isMobile ? (
        <Button
          variant="icon"
          title="Show tutorial sidebar"
          onClick={openTutorialSidebar}
          className="border-card! bg-border! fixed left-2"
        >
          <BookOpen />
        </Button>
      ) : null}

      <aside
        className={cx(
          "z-[5] overflow-y-auto bg-muted w-full h-full max-w-72 fixed top-0 left-0 select-none shadow-sm shadow-muted styled-scrollbar",
          isMobile ? "max-w-md!" : "",
          !showTutorialSidebar && isMobile ? "-translate-x-full" : ""
        )}
      >
        <div className="mt-16 px-4 py-3">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="text-accent size-5" />
              <p className="text-lg">Python Lessons</p>
            </div>

            {/* Close Tutorial Sidebar Button */}
            {showTutorialSidebar && isMobile ? (
              <Button
                variant="icon"
                title="Close tutorial sidebar"
                onClick={closeTutorialSidebar}
                className="[&>svg]:text-destructive! p-0.5!"
              >
                <X />
              </Button>
            ) : null}
          </div>

          <div className="space-y-1">
            {sidebarItems.map((item, idx) => (
              <Dropdown
                key={idx}
                title={item.title}
                items={item.items}
                closeTutorialSidebar={closeTutorialSidebar}
                active={idx === 0}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
