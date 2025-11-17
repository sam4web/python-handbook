import Code from "@/components/code";
import Icon from "@/components/icon";
import Button from "@/components/ui/button";
import { firacode } from "@/lib/fonts";
import { cx } from "@/lib/utils";
import { ChevronRight, CodeXml, icons, Layers, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: "BookOpen",
    title: "Interactive Tutorials",
    description:
      "Step-by-step tutorials, crafted by the community, with clear explanations and real-world Python examples to build a strong foundation.",
  },
  {
    icon: "Code",
    title: "Real-World Practice",
    description:
      "Solve practical challenges, debug your solutions, and get instant, structured feedback. We believe in learning Python by doing.",
  },
  {
    icon: "Terminal",
    title: "Zero-Setup Execution",
    description:
      "Write and execute Python code directly in your browser. No installation or configuration needed just instant results and feedback.",
  },
];

const benefits = [
  {
    id: "tutorials",
    title: "Structured Python Tutorials",
    icon: "BookOpen",
    description:
      "A curated collection of Python topics from core fundamentals to advanced concepts. Each tutorial includes explanations, practical code examples, and step-by-step guidance designed to help you progress confidently.",
    listItems: ["Beginner to advanced", "Clear explanations", "Practical exercises"],
    imageSource: "/placeholder/tutorials.png",
    imageAlt: "Screenshot of the Structured Python Tutorials page.",
  },
  {
    id: "challenges",
    title: "Python Practice Challenges",
    icon: "Target",
    description:
      "Improve your skills through challenges across difficulty levels. Work with lists, loops, functions, logic, and more. Each challenge comes with detailed solutions and explanations.",
    listItems: ["Multiple difficulty levels", "Practical problem-solving", "Detailed breakdowns"],
    imageSource: "/placeholder/practice.png",
    imageAlt: "Screenshot of the Python Practice Challenges page.",
  },
  {
    id: "sandbox",
    title: "Python Sandbox",
    icon: "Code",
    description:
      "Experiment freely with Python code in an isolated environment. Test ideas, debug snippets, explore the language, or build small interactive programs all directly in your browser.",
    listItems: ["Unrestricted Environment", "Instant Playground", "Persistent Workspace"],
    imageSource: "/placeholder/sandbox.png",
    imageAlt: "Screenshot of the Python Sandbox environment page.",
  },
];

const footer_links = [
  { title: "Tutorials", href: "/tutorials" },
  { title: "Cheatsheet", href: "/cheatsheet" },
  { title: "Practice", href: "/practice" },
  { title: "Sandbox", href: "/sandbox" },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
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
                Easy
                <br className="md:block" />
                and Interactive Way
              </span>
            </h1>
            <p className="section-description">
              A platform built for anyone curious about programming. Master Python fundamentals through clear lessons,
              hands-on coding, and an environment designed for immediate learning and experimentation.
            </p>
          </div>
          <div className="flex-center gap-3 flex-wrap">
            <Link href="/tutorials">
              <Button variant="primary" title="Start Learning Python" className="flex-center gap-0.5 group py-1.5 px-3">
                Start Learning Python
                <ChevronRight className="group-hover:translate-x-1 size-5" />
              </Button>
            </Link>
            <Link href="/sandbox">
              <Button variant="outline" title="Try Sandbox" className="flex-center py-1.5 px-3 border!">
                Try Sandbox
                <CodeXml className="ml-1.5 size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Benefits Section */}
      <section className="md:py-2">
        <div className="section-container">
          <h2 className="section-title max-w-md md:max-w-full mx-auto">
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
                    <div className="bg-primary/10 p-2.5 border border-primary/30 rounded-lg text-sm inline-flex items-center">
                      <Icon name={benefit.icon as keyof typeof icons} className="text-primary size-5" />
                    </div>
                    <div className="space-y-0.5 lg:space-y-1.5">
                      <h3 className="text-xl lg:text-2xl">{benefit.title}</h3>
                      <p className="text-muted-foreground text-[15px] lg:text-base leading-snug">
                        {benefit.description}
                      </p>
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
                        "border border-secondary/40 outline outline-secondary/20 shadow-md rounded-xl overscroll-none sm:max-w-md xl:max-w-xl mx-auto object-cover",
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

      {/* Sandbox Promo Section */}
      <section className="bg-muted md:py-2">
        <div className="section-container max-w-lg md:max-w-4xl lg:max-w-7xl gap-4 md:gap-6 flex items-center flex-col md:flex-row">
          <div className="flex-1 w-full">
            <h2 className="section-title text-2xl lg:text-3xl mb-2 text-left font-medium">
              Built-in Practice <span>Environment</span>
            </h2>
            <p className="section-description text-left ml-0 mr-auto max-w-xl mb-2 md:mb-3.5">
              The sandbox is a lightweight, distraction-free Python environment tailored for learning. It includes
              syntax highlighting, live output, and tools that help make coding simple and intuitive.
            </p>
            <Link href="/sandbox">
              <Button variant="primary">Try Sandbox</Button>
            </Link>
          </div>
          <div className="p-4 bg-background/70 border-secondary-foreground/20 border rounded-lg w-full flex-1 max-w-md lg:max-w-xl mr-auto">
            <Code
              content={'# Your first Python program\nname = "Learner"\nprint(f"Hello, {name}!")'}
              language={"python"}
              className="md:text-base!"
            />
            <pre className="font-medium text-sm text-accent">&gt; Hello Learner</pre>
          </div>
        </div>
      </section>

      {/* Cheatsheet CTA Section */}
      <section className="md:py-2 border-b border-secondary">
        <div className="section-container text-center">
          <div className="flex-center mb-4">
            <Layers className="size-14 text-primary" />
          </div>
          <h2 className="text-2xl lg:text-3xl section-title font-medium mb-2">Cheatsheets & References</h2>
          <p className="section-description md:max-w-2xl! mb-5">
            Access concise Python references, syntax guides, patterns, and commonly used snippets all in one place.
            Quickly look up information and use it directly in your learning or projects.
          </p>
          <Link href="/cheatsheet">
            <Button variant="outline" title="Try Sandbox" className="py-1.5 px-3 border!">
              Browse Cheatsheets
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="section-container py-5 md:py-6">
          <div className="flex-between flex-col md:flex-row gap-y-2">
            <ul className="flex space-x-2 md:space-x-3">
              {footer_links.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-primary text-secondary-foreground">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-secondary-foreground">Built with 💙 for Python learners.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
