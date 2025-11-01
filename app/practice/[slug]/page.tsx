import { firacode } from "@/lib/fonts";
import { DIFFICULTY_FILTERS, DifficultyKey, mockSingleChallengeData } from "@/lib/practice";
import { notFound } from "next/navigation";

// generateStaticParams
// generateMetadata

export default async function SinglePracticePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = mockSingleChallengeData;
  const difficulty = DIFFICULTY_FILTERS[challenge.difficulty as DifficultyKey];
  if (!challenge) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-2">
      <div>
        <div className="space-y-3 mb-5">
          <div className="flex items-start mb-0.5 pb-1 gap-3 md:gap-5">
            <p className={`text-lg md:text-xl text-wrap font-medium ${firacode.className}`}>{challenge.title}</p>
            <p className={`px-1.5 py-px rounded-xs text-[13px] shadow-xs font-medium  ${difficulty?.colorClass}`}>
              {difficulty?.label}
            </p>
          </div>

          <p className="text-sm md:text-base text-muted-foreground">{challenge.description}</p>

          <div className="flex gap-1.5 flex-wrap items-center">
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

        {challenge.examples.map((example, idx) => (
          <div className="mb-3">
            <p className="font-semibold text-foreground mb-1.5">Example {idx + 1}:</p>
            <div
              className={`px-2 md:px-3 py-0.5 md:py-1 border-muted-foreground/30 border-l-2 text-sm md:text-base text-muted-foreground space-y-1 ${firacode.className}`}
            >
              <p>
                <span className="font-medium text-foreground">Input:</span> {example.input_value}
              </p>
              <p>
                <span className="font-medium text-foreground">Output:</span> {example.output_value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>{/* EDITOR */}</div>
    </div>
  );
}
