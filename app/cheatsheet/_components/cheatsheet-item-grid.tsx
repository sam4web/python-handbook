import { ICheatsheetItem } from "@/lib/cheatsheets";
import CheatsheetItem from "./cheatsheet-item";

export default function CheatsheetItemsGrid({ items }: { items: ICheatsheetItem[] }) {
  const firstColumn = items.filter((_, index) => index % 2 === 0);
  const secondColumn = items.filter((_, index) => index % 2 === 1);

  return (
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
  );
}
