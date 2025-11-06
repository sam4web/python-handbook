import { getAllThemesData } from "@/lib/editor/server";
import CodeSandbox from "./_components/code-sandbox";

export default function SandboxPage() {
  const themes = getAllThemesData();

  return (
    <main className="md:max-w-4xl lg:max-w-7xl mx-auto">
      <div className="px-2 py-3.5">
        <CodeSandbox themes={themes} />
      </div>
    </main>
  );
}
