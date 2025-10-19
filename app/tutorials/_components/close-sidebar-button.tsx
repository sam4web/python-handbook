"use client";

import Button from "@/components/ui/button";
import { useSidebar } from "../_context/sidebar-context";
import { X } from "lucide-react";

export default function CloseSidebarButton() {
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
