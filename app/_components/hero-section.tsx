import Button from "@/components/ui/button";
import { firacode } from "@/lib/fonts";
import { ChevronRight, CodeXml, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="text-center min-h-[60dvh] flex-center">
      <div className="space-y-6 section-container">
        <div
          className={`bg-primary/10 border border-primary/50 px-2.5 py-1 rounded-full text-primary text-sm inline-flex items-center ${firacode.className}`}
        >
          <Sparkles className="size-4 mr-1.5" />
          Start your coding journey today
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl leading-tight text-secondary-foreground">
            Learn Python the{" "}
            <span className="text-primary">
              Easy and
              <br className="md:block" />
              Interactive Way
            </span>
          </h1>
          <p className="section-description">
            Master the fundamentals of Python from syntax to problem-solving all in one clean and structured place. No
            setup required, just start learning.
          </p>
        </div>
        <div className="flex-center gap-3 flex-wrap">
          <Button variant="primary" title="Start Learning Python" className="flex-center gap-0.5 group py-1.5 px-3">
            Start Learning Python
            <ChevronRight className="group-hover:translate-x-1 size-5" />
          </Button>
          <Button variant="outline" title="Try Sandbox" className="flex-center py-1.5 px-3 border!">
            Try Sandbox
            <CodeXml className="ml-1.5 size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
