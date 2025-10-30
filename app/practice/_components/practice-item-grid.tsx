"use client";

import { IChallenge } from "@/lib/practice";
import PracticeItem from "./practice-item";
import { useIsMobile } from "@/hooks/use-mobile";

export default function PracticeItemGrid({ challenges }: { challenges: IChallenge[] }) {
  const columns: IChallenge[][] = [];
  const isMobile = useIsMobile();
  if (isMobile) {
    columns.push(
      challenges.filter((_, index) => index % 2 === 0),
      challenges.filter((_, index) => index % 2 === 1)
    );
  } else {
    columns.push(
      challenges.filter((_, index) => index % 3 === 0),
      challenges.filter((_, index) => index % 3 === 1),
      challenges.filter((_, index) => index % 3 === 2)
    );
  }

  console.log(isMobile);

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

        {/*<div className="grid gap-y-3">
          {firstColumn.map((item) => (
            <PracticeItem challenge={item} key={item.id} />
          ))}
        </div>
        <div className="grid gap-y-3">
          {secondColumn.map((item) => (
            <PracticeItem challenge={item} key={item.id} />
          ))}
        </div>*/}
        {/*<div className="grid col-span-2 lg:col-span-1 grid-cols-2 lg:grid-cols-1 gap-x-3 gap-y-3 items-start">
          {thirdColumn.map((item) => (
            <PracticeItem challenge={item} key={item.id} />
          ))}
        </div>*/}
      </div>
    </div>
  );
}
