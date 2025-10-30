import { firacode } from "@/lib/fonts";
import { DIFFICULTY_FILTERS, IChallenge } from "@/lib/practice";

export default function PracticeItem({ challenge }: { challenge: IChallenge }) {
  const difficulty = DIFFICULTY_FILTERS[challenge.difficulty];

  return (
    <div className="card cursor-pointer">
      <div className="flex justify-between items-start mb-0.5 py-1">
        <p className={`text-lg text-wrap font-medium ${firacode.className}`}>{challenge.title}</p>
        <p className={`px-1.5 py-px rounded-xs text-[13px] shadow-xs font-medium  ${difficulty?.colorClass}`}>
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
    </div>
  );
}
