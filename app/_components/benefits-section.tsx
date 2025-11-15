import Icon from "@/components/icon";
import { cx } from "@/lib/utils";
import { icons } from "lucide-react";
import Image from "next/image";

const benefits = [
  {
    id: "tutorials",
    title: "Structured Python Tutorials",
    icon: "BookOpen",
    description:
      "Follow a carefully crafted tutorials from Python basics to advanced topics. Each lesson includes clear explanations, practical code examples, and exercises to reinforce your understanding.",
    listItems: ["Beginner to advanced", "Clear explanations", "Practical exercises"],
    imageSource: "/placeholder/image.png",
    imageAlt: "Screenshot of the Structured Python Tutorials page.",
  },
  {
    id: "challenges",
    title: "Python Practice Challenges",
    icon: "Target",
    description:
      "Test your Python skills with coding challenges at every level. Work with lists, dictionaries, functions, and more. Learn from detailed explanations when you get stuck.",
    listItems: ["Multiple difficulty levels", "Instant validation", "Detailed hints"],
    imageSource: "/placeholder/image.png",
    imageAlt: "Screenshot of the Python Practice Challenges page.",
  },
  {
    id: "sandbox",
    title: "Python Sandbox",
    icon: "Code",
    description:
      "Experiment freely with Python in our sandbox environment. Try different approaches, test your ideas, and build mini-projects without any restrictions.",
    listItems: ["Unlimited coding", "Save your work", "Share snippets"],
    imageSource: "/placeholder/image.png",
    imageAlt: "Screenshot of the Python Sandbox environment page.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-2">
      <div className="section-container">
        <h2 className="section-title">
          Everything you need to learn python, <span>Built In</span>
        </h2>
        <div className="mt-10 space-y-5 lg:space-y-8">
          {benefits.map((benefit, idx) => {
            const reverse = idx % 2 === 0;
            return (
              <div
                className={cx(
                  "flex flex-col gap-3 md:gap-5 max-w-md mx-auto md:max-w-full px-2",
                  reverse ? "md:flex-row-reverse" : "md:flex-row"
                )}
                key={benefit.id}
              >
                <div className="flex-1 space-y-2 lg:space-y-3.5">
                  <div className="bg-primary/10 p-2.5 border border-primary/50 rounded-lg text-sm inline-flex items-center">
                    <Icon name={benefit.icon as keyof typeof icons} className="text-primary size-5" />
                  </div>
                  <div className="space-y-0.5 lg:space-y-1.5">
                    <h3 className="text-xl lg:text-2xl">{benefit.title}</h3>
                    <p className="text-muted-foreground text-[15px] lg:text-base leading-snug">{benefit.description}</p>
                  </div>
                  <ul className="space-y-0.5 lg:space-y-1">
                    {benefit.listItems.map((item, idx) => (
                      <li key={idx} className="relative">
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 size-4 rounded-full bg-primary/30 flex-center">
                          <div className="size-1.5 bg-primary rounded-full group-hover:bg-primary" />
                        </div>
                        <span className="ml-7 text-[15px] lg:text-base text-secondary-foreground ">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full pt-0.5">
                  <Image
                    className={cx(
                      "border border-secondary/50 outline outline-secondary/20 shadow-md rounded-xl overscroll-none sm:max-w-md xl:max-w-xl mx-auto",
                      reverse ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                    )}
                    width={1500}
                    height={800}
                    src={benefit.imageSource}
                    alt={benefit.imageAlt}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
