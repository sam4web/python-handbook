"use client";

import Code from "@/components/code";
import Button from "@/components/ui/button";
import { ICheatsheetCategory, ICheatsheetItem } from "@/lib/cheatsheets";
import { cx } from "@/lib/utils";
import { ChevronRight, Copy } from "lucide-react";
import { useState } from "react";

export default function CheatsheetItem({ item }: { item: ICheatsheetCategory }) {
  const [active, setActive] = useState(true);
  const firstColumn = item.cheatsheets.filter((_, index) => index % 2 === 0);
  const secondColumn = item.cheatsheets.filter((_, index) => index % 2 === 1);

  return (
    <div className="border-muted-foreground/20 border rounded-xl shadow-sm bg-muted/30 p-3">
      <div className="flex items-center justify-between w-full" onClick={() => setActive((prev) => !prev)}>
        <div className="flex items-center gap-2 font-medium">
          <p className="cursor-pointer">{item.name}</p>
          <div className="bg-muted rounded-sm px-2 py-0.5 text-center">
            <p className="text-sm">{item.cheatsheets.length}</p>
          </div>
        </div>
        <ChevronRight className={cx("size-4.5 text-secondary-foreground", active ? "rotate-90" : "")} />
      </div>

      {active ? (
        <div className="grid md:grid-cols-2 gap-4 items-start mt-4">
          <div className="inline-grid gap-y-3.5">
            {firstColumn.map((item, idx) => (
              <CheatsheetItemContent key={idx} cheatsheet={item} />
            ))}
          </div>
          <div className="inline-grid gap-y-3.5">
            {secondColumn.map((item, idx) => (
              <CheatsheetItemContent key={idx} cheatsheet={item} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CheatsheetItemContent({ cheatsheet }: { cheatsheet: ICheatsheetItem }) {
  return (
    <div className="bg-secondary/10 px-2.5 py-2 rounded-lg shadow-sm">
      <div className="space-y-0.5 mb-2.5">
        <div className="flex items-center justify-between">
          <p>{cheatsheet.title}</p>
          <Button variant="icon" className={cx("border-none! hover:bg-muted-foreground/10! rounded-md! p-1.5!")}>
            <Copy className="size-3.5!" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{cheatsheet.description}</p>
      </div>
      <div className="text-sm font-mono overflow-auto px-2 py-1 bg-muted border-muted-foreground/25 border rounded-sm inline-grid w-full">
        <Code content={cheatsheet.content} language={"python"} />
      </div>
    </div>
  );
}
