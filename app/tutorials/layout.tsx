import { getSidebarItems } from "@/lib/tutorials";
import TutorialSidebar from "./_components/tutorial-sidebar";

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = getSidebarItems();

  return (
    <main>
      <TutorialSidebar sidebarItems={sidebarItems} />
      <article className="mx-auto md:ml-64 lg:ml-80 max-w-lg md:max-w-xl lg:max-w-3xl">{children}</article>
    </main>
  );
}
