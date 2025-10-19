"use client";

import { cx } from "@/lib/utils";
import TutorialSidebar from "./_components/tutorial-sidebar";
import { SidebarProvider } from "./_context/sidebar-context";
import { useIsMobile } from "@/hooks/use-mobile";
import SidebarWrapper from "./_components/sidebar-wrapper";

export default function TutorialsLayout({ children }: { children: Readonly<React.ReactNode> }) {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <SidebarWrapper>
        <TutorialSidebar />
      </SidebarWrapper>
      <article className={cx(isMobile ? "ml-10" : "ml-72")}>{children}</article>
    </SidebarProvider>
  );
}
