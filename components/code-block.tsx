"use client";

import { useTheme } from "next-themes";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Button from "./ui/button";
import { Copy, CopyCheck } from "lucide-react";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

export default function CodeBlock({ language, value }: { language: string; value: string }) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const customStyle = {
    margin: 0,
    padding: 0,
    background: "transparent",
  };

  const lightThemeStyle: { [key: string]: React.CSSProperties } = {
    'code[class*="language-"]': {
      color: "#1e293b",
      backgroundColor: "transparent",
    },
    'pre[class*="language-"]': {
      margin: 0,
      padding: 0,
      background: "transparent",
      overflowX: "auto",
    },
  };

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
    <div className="bg-muted border-muted-foreground/30 border rounded-lg shadow-muted my-4">
      <div className="flex justify-between items-center border-muted-foreground/30 border-b px-3 py-1">
        <p className="text-muted-foreground text-sm">{language}</p>
        <Button
          variant="icon"
          onClick={handleCopyCode}
          disabled={copied}
          className={cx(
            "border-none! hover:bg-muted-foreground/10! p-2!",
            copied ? " [&>svg]:text-emerald-500!" : " [&>svg]:text-muted-foreground!"
          )}
        >
          {copied ? <CopyCheck className="size-4!" /> : <Copy className="size-4!" />}
        </Button>
      </div>
      <div className="text-sm overflow-auto font-mono px-3 py-3.5">
        <SyntaxHighlighter
          style={theme === "dark" ? atomDark : lightThemeStyle}
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
