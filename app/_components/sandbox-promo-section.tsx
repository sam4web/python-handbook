import Code from "@/components/code";
import Button from "@/components/ui/button";

export default function SandboxPromoSection() {
  return (
    <section className="bg-muted md:py-2">
      <div className="section-container max-w-lg md:max-w-4xl lg:max-w-7xl gap-4 md:gap-6 flex items-center flex-col md:flex-row">
        <div className="flex-1 w-full">
          <h2 className="section-title text-left font-medium">
            Built-in Practice <span>Environment</span>
          </h2>
          <p className="section-description text-left ml-0 mr-auto max-w-xl mb-2 md:mb-3.5">
            No setup required. Write Python code directly in your browser with syntax highlighting, instant feedback,
            and a distraction-free interface designed for learning.
          </p>
          <Button variant="primary">Try Sandbox</Button>
        </div>
        <div className="px-3.5 py-1 bg-secondary dark:bg-muted border-secondary-foreground/20 border rounded-lg w-full flex-1 max-w-md lg:max-w-xl mr-auto">
          <Code
            content={'# Your first Python program\nname = "Learner"\nprint(f"Hello, {name}!")'}
            language={"python"}
            className="md:text-base!"
          />
        </div>
      </div>
    </section>
  );
}
