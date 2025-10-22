"use client";

import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Button from "./ui/button";
import { Copy } from "lucide-react";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({ language, value }: { language: string; value: string }) {
  const { theme } = useTheme();

  const customStyle = {
    margin: 0,
    padding: 0,
    background: "transparent",
  };

  return (
    <div className="bg-muted border-muted-foreground/30 border rounded-lg shadow-muted my-4">
      <div className="flex justify-between items-center border-muted-foreground/30 border-b px-3 py-1">
        <p className="text-muted-foreground text-sm">{language}</p>
        <Button
          variant="icon"
          className="border-none! [&>svg]:text-muted-foreground! hover:bg-muted-foreground/10! p-2!"
        >
          <Copy className="size-4!" />
        </Button>
      </div>
      <div className="text-sm overflow-auto font-mono px-3 py-3.5">
        <SyntaxHighlighter
          style={theme === "dark" ? atomDark : { color: "#1e293b", background: "transparent" }}
          language={language}
          customStyle={customStyle}
          PreTag="div"
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
