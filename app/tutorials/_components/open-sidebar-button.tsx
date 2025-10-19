"use client";

import Button from "@/components/ui/button";
import { useSidebar } from "../_context/sidebar-context";
import { BookOpen } from "lucide-react";

export default function OpenSidebarButton() {
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
