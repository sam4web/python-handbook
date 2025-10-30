"use client";

import { firacode } from "@/lib/fonts";
import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Code({ language, content }: { language: string; content: string }) {
  const { theme } = useTheme();
  const customStyle = {
    margin: 0,
    paddingLeft: 0,
    paddingRight: 0,
    background: "transparent",
  };

  return (
    <SyntaxHighlighter
      language={language}
      customStyle={customStyle}
      style={theme === "dark" ? atomOneDark : atomOneLight}
      PreTag="div"
      className={`styled-scrollbar-sm text-sm overflow-auto ${firacode.className}`}
    >
      {content}
    </SyntaxHighlighter>
  );
}
