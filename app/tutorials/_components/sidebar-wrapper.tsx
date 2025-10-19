import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "../_context/sidebar-context";
import PageOverlay from "./page-overlay";
import { CloseSidebarButton, OpenSidebarButton } from "./sidebar-toggle-button";
import { cx } from "@/lib/utils";
import { BookOpen } from "lucide-react";

export default function SidebarWrapper({ children }: { children: Readonly<React.ReactNode> }) {
  const isMobile = useIsMobile();
  const { showTutorialSidebar } = useSidebar();
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
          {children}
        </div>
      </aside>
    </>
  );
}
