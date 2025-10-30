import { useIsMobile } from "@/hooks/use-mobile";
import { IChallenge } from "@/lib/practice";
import { useMemo } from "react";
import PracticeItem from "./practice-item";

export default function PracticeItemGrid({ challenges }: { challenges: IChallenge[] }) {
  const isMobile = useIsMobile();
  const columns = useMemo(() => {
    const numColumns = isMobile ? 2 : 3;
    const columns: IChallenge[][] = Array.from({ length: numColumns }, () => []);
    challenges.forEach((item, index) => {
      const columnIndex = index % numColumns;
      columns[columnIndex].push(item);
    });
    return columns;
  }, [isMobile, challenges]);

  return (
    <div className="max-w-sm xs:max-w-xl md:max-w-full mx-auto">
      <div className="grid xs:grid-cols-2 md:grid-cols-3 gap-3 items-start">
        {columns.map((col, idx) => (
          <div key={idx} className="grid gap-y-3">
            {col.map((item) => (
              <PracticeItem challenge={item} key={item.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
