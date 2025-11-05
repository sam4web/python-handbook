import { useIsMobile } from "@/hooks/use-mobile";
import { DIFFICULTY_FILTERS, IChallenge } from "../utils/shared";
import { useMemo } from "react";
import { firacode } from "@/lib/fonts";
import Link from "next/link";

export default function ChallengeColumnGrid({ challenges }: { challenges: IChallenge[] }) {
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
            {col.map((challenge) => {
              const difficulty = DIFFICULTY_FILTERS[challenge.difficulty];
              return (
                <Link href={`/practice/${challenge.slug}`} key={challenge.id} className="card cursor-pointer">
                  <div className="flex justify-between items-start mb-0.5 py-1">
                    <p className={`text-lg text-wrap font-medium ${firacode.className}`}>{challenge.title}</p>
                    <p
                      className={`px-1.5 py-px rounded-xs text-[13px] shadow-xs font-medium  ${difficulty?.colorClass}`}
                    >
                      {difficulty?.label}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  <div className="flex gap-1.5 flex-wrap items-center mt-3">
                    {challenge.category.map((item, idx) => (
                      <p
                        key={idx}
                        className="px-1.5 py-px bg-secondary dark:bg-muted border-muted-foreground/25 border rounded-lg text-muted-foreground text-sm shadow-xs font-medium"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
