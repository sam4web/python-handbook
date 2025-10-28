"use client";

import Button from "@/components/ui/button";
import Code from "@/components/code";
import { Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { cx } from "@/lib/utils";
import { firaCode } from "@/lib/fonts";

export default function CodeBlock({ language, value }: { language: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(value)
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
    <div className="bg-muted/65 border-muted-foreground/30 border rounded-lg shadow-muted my-4">
      <div className="flex justify-between items-center border-muted-foreground/30 border-b px-3 py-1">
        <p className={`text-muted-foreground text-sm ${firaCode.className}`}>{language}</p>
        <Button
          variant="icon"
          onClick={handleCopyCode}
          disabled={copied}
          title="Copy code"
          className={cx(
            "border-none! hover:bg-muted-foreground/10! p-2!",
            copied ? " [&>svg]:text-green-600!" : " [&>svg]:text-muted-foreground!"
          )}
        >
          {copied ? <CopyCheck className="size-4!" /> : <Copy className="size-4!" />}
        </Button>
      </div>
      <div className="px-3 py-2">
        <Code content={value} language={language} />
      </div>
    </div>
  );
}
