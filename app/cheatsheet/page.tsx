import { NotebookText } from "lucide-react";
import { getCheatsheetData, getCheatsheetTopics } from "@/lib/cheatsheets";
import CheatsheetIndex from "./_components/cheatsheet-index";

export default function CheatsheetPage() {
  const cheatsheetData = getCheatsheetData();
  const topics = getCheatsheetTopics();

  return (
    <main className="md:max-w-4xl xl:max-w-6xl mx-auto">
      <div className="px-3 md:px-6 py-3">
        <div className="space-y-6 md:space-y-10 my-4 md:my-9">
          <div className="text-center">
            <div className="p-2.5 md:p-3.5 dark:bg-primary/5 bg-primary/10 rounded-2xl inline-block border-primary border mb-2.5">
              <NotebookText className="size-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl text-foreground font-medium mb-1 md:mb-2">Python Cheatsheets</h1>
            <p className="max-w-md text-sm sm:text-base text-muted-foreground mx-auto">
              Quick reference for Python syntax, built-in functions, and standard library.
            </p>
          </div>
          <CheatsheetIndex cheatsheetData={cheatsheetData} topics={topics} />
        </div>
      </div>
    </main>
  );
}
