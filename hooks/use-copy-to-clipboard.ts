import { useState } from "react";
import { toast } from "sonner";

export default function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copyContent = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        console.error(error);
      });
  };

  return { copied, copyContent };
}
