import { Target } from "lucide-react";
import { Metadata } from "next";
import PracticeIndex from "./_components/practice-index";
import { getAllChallengeListItems } from "./utils/server";

export const metadata: Metadata = {
  title: "Practice Challenge",
};

export default function PracticePage() {
  const challenges = getAllChallengeListItems();

  return (
    <main className="md:max-w-4xl xl:max-w-6xl mx-auto">
      <div className="px-3 md:px-6 py-3">
        <div className="space-y-6 md:space-y-10 my-4 md:my-9">
          <div className="text-center">
            <div className="p-2.5 md:p-3.5 dark:bg-primary/5 bg-primary/10 rounded-2xl inline-block border-primary border mb-2.5">
              <Target className="size-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl text-foreground font-medium mb-1 md:mb-2">
              Python Practice Challenges
            </h1>
            <p className="max-w-lg text-sm sm:text-base text-muted-foreground mx-auto">
              Solve Python programming challenges. Test your understanding and improve your coding skills.
            </p>
          </div>
          <PracticeIndex challenges={challenges} />
        </div>
      </div>
    </main>
  );
}
