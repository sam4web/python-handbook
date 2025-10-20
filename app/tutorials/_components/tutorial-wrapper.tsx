"use client";

import { cx } from "@/lib/utils";
import TutorialSidebar from "./tutorial-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "../_context/sidebar-context";
import { SidebarItem } from "@/lib/tutorials";

export default function TutorialWrapper({
  children,
  sidebarItems,
}: {
  children: Readonly<React.ReactNode>;
  sidebarItems: SidebarItem[];
}) {
  const isMobile = useIsMobile();

  return (
    <>
      <SidebarProvider>
        <TutorialSidebar sidebarItems={sidebarItems} />
      </SidebarProvider>
      <article className={cx(isMobile ? "ml-10" : "ml-72")}>{children}</article>
    </>
  );
}
