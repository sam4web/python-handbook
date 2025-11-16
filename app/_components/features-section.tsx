import Icon from "@/components/icon";
import { icons } from "lucide-react";

const features = [
  {
    icon: "BookOpen",
    title: "Interactive Lessons",
    description:
      "Step-by-step tutorials with clear explanations and real-world Python examples to build solid foundations.",
  },
  {
    icon: "Code",
    title: "Hands-on Practice",
    description: "Solve challenges, debug code, and get instant feedback. Learn Python by doing, not just reading.",
  },
  {
    icon: "Terminal",
    title: "Instant Execution",
    description: "Write and run Python code directly in your browser. No installation needed. See results immediately.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-muted md:py-2">
      <div className="section-container">
        <h2 className="section-title">
          Learn Python <span>by Doing</span>
        </h2>
        <p className="section-description">
          A simple, structured way to learn Python built for beginners and aspiring developers.
        </p>

        <div className="flex-center flex-wrap gap-4 lg:gap-5 mt-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="max-w-80 w-full bg-muted-foreground/5 text-center px-2 py-4 md:py-6 rounded-lg group border border-secondary hover:border-primary shadow-xs relative"
            >
              <div className="absolute size-2 bg-secondary top-3 right-3 rounded-full group-hover:bg-primary" />
              <div className="bg-primary/10 group-hover:bg-primary/20 p-4 rounded-lg text-sm inline-flex items-center mb-3">
                <Icon name={feature.icon as keyof typeof icons} className="text-primary size-6" />
              </div>
              <h3 className="text-lg md:text-xl mb-1">{feature.title}</h3>
              <p className="text-muted-foreground text-[15px] lg:text-base leading-snug max-w-64 lg:max-w-72 mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
