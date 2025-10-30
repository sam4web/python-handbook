"use client";

import Code from "@/components/code";
import Button from "@/components/ui/button";
import { ICheatsheetItem } from "@/lib/cheatsheets";
import { firacode, poppins } from "@/lib/fonts";
import { cx } from "@/lib/utils";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export default function CheatsheetItem({ item }: { item: ICheatsheetItem }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(item.content)
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
    <div className="card group">
      <div className="mb-3">
        <div className={`flex-between ${firacode.className}`}>
          {item.kind === "function" ? (
            <span className="py-1">
              <code className="bg-primary/10 px-2 py-1 rounded-sm text-accent">{item.title}</code>
            </span>
          ) : item.kind === "syntax" ? (
            <span className="py-0.5">
              <code className="text-accent">{item.title}</code>
            </span>
          ) : (
            <p className="py-1 text-lg font-medium">{item.title}</p>
          )}

          {/* Copy Code Button */}
          <Button
            variant="icon"
            onClick={handleCopyCode}
            disabled={copied}
            title="Copy code"
            className={cx(
              "border-none! hover:bg-muted-foreground/10! rounded-md! p-1.5! hidden group-hover:block",
              copied ? " [&>svg]:text-green-600!" : " [&>svg]:text-foreground!"
            )}
          >
            {copied ? <CopyCheck className="size-3.5!" /> : <Copy className="size-3.5!" />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      <div className="px-2 py-0 bg-secondary dark:bg-muted border-muted-foreground/25 border rounded-lg inline-grid w-full">
        <Code content={item.content} language={"python"} />
      </div>
    </div>
  );
}
