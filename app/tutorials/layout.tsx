import { getTutorialsData } from "@/lib/tutorials";
import TutorialWrapper from "./_components/tutorial-wrapper";

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  const tutorials = getTutorialsData();
  return <TutorialWrapper sidebarItems={tutorials}>{children}</TutorialWrapper>;
}
