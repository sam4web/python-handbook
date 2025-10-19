"use client";

import { cx } from "@/lib/utils";
import TutorialSidebar from "./_components/tutorial-sidebar";
import { SidebarProvider } from "./_context/sidebar-context";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TutorialsLayout({ children }: { children: Readonly<React.ReactNode> }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <TutorialSidebar />
      <article className={cx(isMobile ? "ml-10" : "ml-72")}>{children}</article>
    </SidebarProvider>
  );
}
