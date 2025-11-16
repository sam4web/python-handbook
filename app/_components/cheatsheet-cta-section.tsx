import Button from "@/components/ui/button";
import { Layers } from "lucide-react";

export default function CheatsheetCTASection() {
  return (
    <section className="md:py-2 border-b border-secondary">
      <div className="section-container text-center">
        <div className="flex-center mb-4">
          <Layers className="size-14 text-primary" />
        </div>
        <h2 className="section-title font-medium">Cheatsheets & References</h2>
        <p className="section-description md:max-w-2xl! mb-5">
          Quick access to Python syntax, common patterns, and code snippets. Copy and use them in your projects
          instantly.
        </p>
        <Button variant="outline" title="Try Sandbox" className="py-1.5 px-3 border!">
          Browse Cheatsheets
        </Button>
      </div>
    </section>
  );
}
