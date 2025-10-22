import { getSidebarItems } from "@/lib/tutorials";
import TutorialSidebar from "./_components/tutorial-sidebar";

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  const sidebarItems = getSidebarItems();

  return (
    <main className="flex">
      <TutorialSidebar sidebarItems={sidebarItems} />
      <div className="flex-1 overflow-y-auto">
        <article className="md:max-w-3xl xl:max-w-4xl mx-auto px-6 py-4">{children}</article>
      </div>
    </main>
  );
}
