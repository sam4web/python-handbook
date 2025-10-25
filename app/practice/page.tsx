import { Target } from "lucide-react";

export default function PracticePage() {
  return (
    <main className="md:max-w-3xl xl:max-w-4xl mx-auto">
      <div className="px-6 py-4">
        <div className="text-center my-6 md:my-10">
          <div className="p-2.5 md:p-3.5 dark:bg-primary/5 bg-primary/10 rounded-2xl inline-block border-primary border mb-2.5">
            <Target className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl text-foreground font-medium mb-1 md:mb-2">Python Practice Challenges</h1>
          <p className="max-w-lg text-sm sm:text-base text-muted-foreground mx-auto">
            Solve Python programming challenges. Test your understanding and improve your coding skills.
          </p>
        </div>
      </div>
    </main>
  );
}
