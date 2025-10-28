import { ICheatsheetCategory } from "@/lib/cheatsheets";
import CheatsheetItem from "./cheatsheet-item";
import { cx } from "@/lib/utils";
import { poppins } from "@/lib/fonts";

export default function CheatsheetItemSection({ item }: { item: ICheatsheetCategory }) {
  const firstColumn = item.cheatsheets.filter((_, index) => index % 2 === 0);
  const secondColumn = item.cheatsheets.filter((_, index) => index % 2 === 1);

  return (
    <div>
      <div className="flex items-center justify-between w-full border-b px-0.5 py-1.5 border-primary">
        <div className="flex items-center gap-1.5 md:gap-2.5">
          <p className={cx("cursor-pointer text-xl md:text-3xl font-medium text-primary ", poppins.className)}>
            {item.name}
          </p>
          <div className="bg-muted rounded-sm px-2 py-0.5 text-center">
            <p className="text-sm">{item.cheatsheets.length}</p>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3.5 items-start pt-4.5 px-0.5">
        <div className="inline-grid gap-y-3.5">
          {firstColumn.map((item, idx) => (
            <CheatsheetItem key={idx} cheatsheet={item} />
          ))}
        </div>
        <div className="inline-grid gap-y-3.5">
          {secondColumn.map((item, idx) => (
            <CheatsheetItem key={idx} cheatsheet={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
