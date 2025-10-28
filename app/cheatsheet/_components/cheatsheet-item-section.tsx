import { poppins } from "@/lib/fonts";
import { ICheatsheetData } from "@/lib/cheatsheets";
import CheatsheetItem from "./cheatsheet-item";

export default function CheatsheetItemSection({ topic }: { topic: ICheatsheetData }) {
  const firstColumn = topic.items.filter((_, index) => index % 2 === 0);
  const secondColumn = topic.items.filter((_, index) => index % 2 === 1);

  return (
    <div id={topic.slug}>
      <div className="flex items-center justify-between w-full border-b px-0.5 py-1 md:py-2.5 border-primary">
        <div className="flex items-center gap-1.5 md:gap-2.5">
          <p className={`text-2xl md:text-3xl font-medium text-primary ${poppins.className}`}>{topic.title}</p>
          <div className="bg-muted rounded-sm px-2 py-0.5 text-center">
            <p className="text-sm">{topic.items.length}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3 items-start pt-3 md:pt-5 px-0.5">
        <div className="inline-grid gap-y-3.5">
          {firstColumn.map((item, idx) => (
            <CheatsheetItem key={idx} item={item} />
          ))}
        </div>
        <div className="inline-grid gap-y-3.5">
          {secondColumn.map((item, idx) => (
            <CheatsheetItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
