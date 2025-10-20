import { getSidebarItems } from "@/lib/tutorials";
import TutorialWrapper from "./_components/tutorial-wrapper";

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = getSidebarItems();
  return <TutorialWrapper sidebarItems={sidebarItems}>{children}</TutorialWrapper>;
}
