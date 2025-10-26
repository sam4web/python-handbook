"use client";

import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Code({ language, content }: { language: string; content: string }) {
  const { theme } = useTheme();
  const customStyle = {
    margin: 0,
    padding: 0,
    background: "transparent",
  };

  return (
    <SyntaxHighlighter
      language={language}
      customStyle={customStyle}
      style={theme === "dark" ? atomOneDark : atomOneLight}
      PreTag="div"
    >
      {content}
    </SyntaxHighlighter>
  );
}
