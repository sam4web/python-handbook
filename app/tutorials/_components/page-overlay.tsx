"use client";

import { useSidebar } from "../_context/sidebar-context";

export default function PageOverlay() {
  const { closeTutorialSidebar } = useSidebar();

  return (
    <div
      className="size-full fixed top-0 left-0 bg-zin/60 z-[3] bg-background/60 dark:bg-background/85 backdrop-blur-xs"
      onClick={closeTutorialSidebar}
    />
  );
}
