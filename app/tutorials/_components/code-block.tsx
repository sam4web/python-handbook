"use client";

import Code from "@/components/code";
import Button from "@/components/ui/button";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";
import { firacode } from "@/lib/fonts";
import { Copy, CopyCheck } from "lucide-react";

export default function CodeBlock({ language, value }: { language: string; value: string }) {
  const { copied, copyContent } = useCopyToClipboard();

  return (
    <div className="bg-muted/65 border-muted-foreground/30 border rounded-lg shadow-muted my-4">
      <div className="flex-between border-muted-foreground/30 border-b px-3 py-1">
        <p className={`text-muted-foreground text-sm ${firacode.className}`}>{language}</p>
        <Button
          variant="icon"
          onClick={() => copyContent(value)}
          disabled={copied}
          title="Copy code"
          className="border-none! hover:bg-muted-foreground/10! p-1.5! [&>svg]:size-3.5!"
        >
          {copied ? <CopyCheck className="text-green-600!" /> : <Copy className="text-muted-foreground!" />}
        </Button>
      </div>
      <div className="px-3 py-2">
        <Code content={value} language={language} />
      </div>
    </div>
  );
}
