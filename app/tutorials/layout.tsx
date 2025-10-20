import { getSidebarItems } from "@/lib/tutorials";
import TutorialSidebar from "./_components/tutorial-sidebar";

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = getSidebarItems();

  return (
    <main>
      <TutorialSidebar sidebarItems={sidebarItems} />
      <article className="ml-10 md:ml-72">{children}</article>
    </main>
  );
}
