import { firacode } from "@/lib/fonts";
import { DIFFICULTY_FILTERS, DifficultyKey, mockSingleChallengeData } from "@/lib/practice";
import { Dot } from "lucide-react";
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
    <div className="grid md:grid-cols-2 min-h-[calc(100dvh-5.8rem)] h-full">
      <div className="px-3">
        <div className="flex items-start justify-between mb-0.5 pb-1">
          <p className={`text-lg md:text-xl text-wrap font-medium ${firacode.className}`}>{challenge.title}</p>
          <p className={`px-1.5 py-px rounded-xs text-[13px] shadow-xs font-medium  ${difficulty?.colorClass}`}>
            {difficulty?.label}
          </p>
        </div>

        <div className="flex flex-wrap items-center">
          {challenge.category.map((item, idx) => (
            <p key={idx} className="text-muted-foreground text-sm font-medium flex-center capitalize">
              {item} {idx + 1 !== challenge.category.length ? <Dot /> : null}
            </p>
          ))}
        </div>

        <div className="space-y-3.5 md:space-y-5 pr-2 my-4 md:my-5">
          <div className="space-y-2">
            <p className="font-semibold text-base md:text-lg mb-0.5 text-secondary-foreground">Description</p>
            <p className="text-sm md:text-base text-muted-foreground">{challenge.description}</p>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-base md:text-lg text-secondary-foreground">Examples</p>
            <div className="space-y-2 md:space-y-3">
              {challenge.examples.map((example, idx) => (
                <div
                  className={`rounded-md shadow-xs px-2 md:px-3 py-1 md:py-2 bg-muted space-y-1 md:space-y-2 ${firacode.className}`}
                  key={idx}
                >
                  <p className="font-semibold text-secondary-foreground">Example {idx + 1}:</p>
                  <div className={`text-sm text-muted-foreground space-y-0.5`}>
                    <p>
                      <span>Input:</span>
                      <span className="text-foreground"> {example.input_value}</span>
                    </p>
                    <p>
                      <span>Output:</span>
                      <span className="text-primary"> {example.output_value}</span>
                    </p>
                  </div>
                  {example.explanation ? (
                    <p className="text-muted-foreground text-[13px]">
                      <span className="font-semibold">Explanation:</span> {example.explanation}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-semibold text-base md:text-lg text-secondary-foreground">Constraints</p>
            <ul className="text-sm text-muted-foreground space-y-0.5">
              {challenge.constraints.map((item, idx) => (
                <li className="list-disc ml-4 marker:text-primary" key={idx}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-muted shadow-sm rounded-lg">{/* EDITOR */}</div>
    </div>
  );
}
