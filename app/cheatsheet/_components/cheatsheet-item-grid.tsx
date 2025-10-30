import { ICheatsheetItem } from "@/lib/cheatsheets";
import CheatsheetItem from "./cheatsheet-item";

export default function CheatsheetItemsGrid({ items }: { items: ICheatsheetItem[] }) {
  const columns = [items.filter((_, index) => index % 2 === 0), items.filter((_, index) => index % 2 === 1)];

  return (
    <div className="grid md:grid-cols-2 gap-3 items-start pt-3 md:pt-5 px-0.5">
      {columns.map((col, idx) => (
        <div key={idx} className="inline-grid gap-y-3.5">
          {col.map((item, idx) => (
            <CheatsheetItem key={idx} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
