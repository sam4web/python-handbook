"use client";

import Button from "@/components/ui/button";
import { useSidebar } from "../_context/sidebar-context";
import { BookOpen, X } from "lucide-react";

export function OpenSidebarButton() {
  const { openTutorialSidebar } = useSidebar();

  return (
    <Button
      variant="icon"
      title="Show tutorial sidebar"
      onClick={openTutorialSidebar}
      className="border-card! bg-border! fixed left-2"
    >
      <BookOpen />
    </Button>
  );
}

export function CloseSidebarButton() {
  const { closeTutorialSidebar } = useSidebar();

  return (
    <Button
      variant="icon"
      title="Close tutorial sidebar"
      onClick={closeTutorialSidebar}
      className="[&>svg]:text-destructive! p-0.5!"
    >
      <X />
    </Button>
  );
}
