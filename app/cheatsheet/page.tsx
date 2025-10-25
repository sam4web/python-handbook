import { NotebookText, Search } from "lucide-react";

export default function CheatsheetPage() {
  return (
    <main className="md:max-w-3xl xl:max-w-4xl mx-auto">
      <div className="px-6 py-4">
        <div className="text-center my-6 md:my-10">
          <div className="p-2.5 md:p-3.5 dark:bg-primary/5 bg-primary/10 rounded-2xl inline-block border-primary border mb-2.5">
            <NotebookText className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl text-foreground font-medium mb-1 md:mb-2">Python Cheatsheets</h1>
          <p className="max-w-md text-sm sm:text-base text-muted-foreground mx-auto">
            Quick reference for Python syntax, built-in functions, and standard library.
          </p>
        </div>

        <label>
          <Search />
          <input type="text" className="border border-muted bg-muted/40 text-muted-foreground outline-none" />
        </label>

        <div>
          <p>Basics</p>
          <p>Control Flow</p>
          <p>Functions</p>
          <p>Standard Library</p>
        </div>
      </div>
    </main>
  );
}
