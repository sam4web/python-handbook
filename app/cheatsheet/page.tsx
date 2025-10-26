import { NotebookText, Search } from "lucide-react";
import CheatsheetItem from "./_components/cheatsheet-item";
import { mockCheatsheetData } from "@/lib/cheatsheets";
import CheatSheetTopicList from "./_components/cheatsheet-topic-list";

const cheatsheetTopics = [
  { title: "Basics", target: "#basics" },
  { title: "Control Flow", target: "#control-flow" },
  { title: "Functions", target: "#functions" },
  { title: "Standard Library", target: "#standard-library" },
];

export default function CheatsheetPage() {
  return (
    <main className="md:max-w-4xl xl:max-w-5xl mx-auto">
      <div className="px-3 md:px-6 py-3">
        <div className="space-y-6 md:space-y-8 my-4 md:my-9">
          <div className="text-center">
            <div className="p-2.5 md:p-3.5 dark:bg-primary/5 bg-primary/10 rounded-2xl inline-block border-primary border mb-2.5">
              <NotebookText className="size-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl text-foreground font-medium mb-1 md:mb-2">Python Cheatsheets</h1>
            <p className="max-w-md text-sm sm:text-base text-muted-foreground mx-auto">
              Quick reference for Python syntax, built-in functions, and standard library.
            </p>
          </div>

          <div className="space-y-2 md:space-y-4.5">
            <div className="max-w-sm mx-auto">
              <label className="border border-muted-foreground/40 bg-muted flex items-center py-1.5 px-2.5 rounded-md gap-1.5">
                <Search className="size-4.5" />
                <input
                  type="text"
                  className="text-muted-foreground outline-none flex-1 placeholder:text-muted-foreground/35 focus:placeholder:text-transparent"
                  placeholder="Search cheatsheets..."
                />
              </label>
            </div>
            <CheatSheetTopicList topics={cheatsheetTopics} />
          </div>

          <div className="space-y-2 md:space-y-4.5 max-w-lg md:max-w-full mx-auto">
            {mockCheatsheetData.map((item) => (
              <CheatsheetItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
