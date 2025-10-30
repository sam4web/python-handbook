"use client";

import Dropdown from "./dropdown";
import { BookOpen, X } from "lucide-react";
import { cx } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Button from "@/components/ui/button";
import { ISidebarItem } from "@/lib/tutorials";
import { useState } from "react";

export default function TutorialSidebar({ sidebarItems }: { sidebarItems: ISidebarItem[] }) {
  const isMobile = useIsMobile();
  const [showTutorialSidebar, setShowTutorialSidebar] = useState(false);

  const openTutorialSidebar = () => setShowTutorialSidebar(true);
  const closeTutorialSidebar = () => setShowTutorialSidebar(false);

  return (
    <>
      {/* Page Overlay */}
      {showTutorialSidebar && isMobile ? <div className="page-overlay" onClick={closeTutorialSidebar} /> : null}

      {/* Open Tutorial Sidebar Button */}
      {isMobile ? (
        <Button
          variant="icon"
          title="Show tutorial sidebar"
          onClick={openTutorialSidebar}
          className="border-border! bg-muted/95! fixed left-2 top-16 p-2!"
        >
          <BookOpen />
        </Button>
      ) : null}
      <aside
        className={cx(
          "z-5 overflow-y-auto w-full top-12 left-0 select-none shadow-sm shadow-muted styled-scrollbar",
          isMobile ? "max-w-md fixed h-dvh bg-muted/80" : "sticky max-w-72 h-[calc(100dvh-54px)] bg-secondary/10",
          !showTutorialSidebar && isMobile ? "-translate-x-full" : ""
        )}
      >
        <div className="mt-1 py-4">
          <div className="mb-4 flex-between px-2.5 lg:px-4">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary size-5" />
              <p className="text-lg font-medium">Python Lessons</p>
            </div>

            {/* Close Tutorial Sidebar Button */}
            {showTutorialSidebar && isMobile ? (
              <Button
                variant="icon"
                title="Close tutorial sidebar"
                onClick={closeTutorialSidebar}
                className="[&>svg]:text-destructive! p-0.5! rounded-sm! bg-transparent! hover:border-secondary!"
              >
                <X />
              </Button>
            ) : null}
          </div>

          <div className="space-y-1.5 px-2 lg:px-4">
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
