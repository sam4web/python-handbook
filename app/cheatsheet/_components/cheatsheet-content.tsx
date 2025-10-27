"use client";

import Code from "@/components/code";
import Button from "@/components/ui/button";
import { ICheatsheetItem } from "@/lib/cheatsheets";
import { cx } from "@/lib/utils";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export default function CheatsheetContent({ cheatsheet }: { cheatsheet: ICheatsheetItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(cheatsheet.content)
      .then(() => {
        setCopied(true);
        // alert here
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-muted/60 px-2 md:px-3.5 pt-2 pb-3 md:pb-4 rounded-xl shadow-sm relative group">
      <div className="mb-3">
        <div className="flex items-center justify-between">
          {cheatsheet.type === "keyword" ? (
            <span className="py-1">
              <code className="bg-primary/10 px-2 py-0.5 rounded-sm text-accent font-mono">{cheatsheet.title}</code>
            </span>
          ) : (
            <p className="font-medium py-0.5">{cheatsheet.title}</p>
          )}
          <Button
            variant="icon"
            onClick={handleCopyCode}
            className={cx(
              "border-none! hover:bg-muted-foreground/10! rounded-md! p-1.5! hidden group-hover:block",
              copied ? " [&>svg]:text-green-600!" : " [&>svg]:text-muted-foreground!"
            )}
          >
            {copied ? <CopyCheck className="size-3.5!" /> : <Copy className="size-3.5!" />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{cheatsheet.description}</p>
      </div>
      <div className="px-2 py-0 bg-secondary dark:bg-muted border-muted-foreground/25 border rounded-sm inline-grid w-full">
        <Code content={cheatsheet.content} language={"python"} />
      </div>
    </div>
  );
}
