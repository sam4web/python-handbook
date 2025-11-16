import Code from "@/components/code";
import Button from "@/components/ui/button";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";
import { firacode } from "@/lib/fonts";
import { Copy, CopyCheck } from "lucide-react";
import { ICheatsheetItem } from "../utils/shared";

export default function CheatsheetItem({ item }: { item: ICheatsheetItem }) {
  const { copied, copyContent } = useCopyToClipboard();

  return (
    <div className="card border! group">
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
            onClick={() => copyContent(item.content)}
            disabled={copied}
            title="Copy code"
            className="border-none! hover:bg-muted-foreground/10! rounded-md! p-1.5! hidden group-hover:block [&>svg]:size-3.5!"
          >
            {copied ? <CopyCheck className="text-green-600!" /> : <Copy className="text-foreground!" />}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      <div className="px-2 py-0 bg-secondary dark:bg-muted border-secondary-foreground/20 border rounded-lg inline-grid w-full">
        <Code content={item.content} language={"python"} />
      </div>
    </div>
  );
}
