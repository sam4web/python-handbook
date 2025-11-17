import ReactMarkdown, { Components } from "react-markdown";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";
import CodeBlock from "../_components/code-block";
import { firacode } from "@/lib/fonts";
import { getAllTutorialSlugs, getTutorialContent, getTutorialMetadata } from "../utils/server";

export async function generateStaticParams() {
  const slugs = getAllTutorialSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const metadata = getTutorialMetadata(slug);
  return { title: metadata.title, description: metadata.description || "" };
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getTutorialContent(slug);

  const components: Components = {
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "text";
      if (!match) {
        return (
          <code className={`bg-primary/10 px-1.5 py-0.5 rounded-sm text-accent text-base ${firacode.className}`}>
            {children}
          </code>
        );
      }
      const codeValue = String(children).replace(/\n$/, "");
      return <CodeBlock language={language} value={codeValue} />;
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-2.5 border-primary bg-primary/10 italic text-foreground py-1.5 *:m-0">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-5 mb-3">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-semibold mt-4 mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="font-semibold mt-4 mb-2">{children}</h4>,
    p: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
    a: ({ children, href }) => (
      <Link href={href || ""} className="text-primary underline hover:text-accent">
        {children}
      </Link>
    ),
    ul: ({ children }) => <ul className="list-disc pl-6 mb-3">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 mb-3">{children}</ol>,
    li: ({ children }) => <li className="my-1">{children}</li>,
    table: ({ children }) => (
      <div className="overflow-x-auto border-muted-foreground/30 border rounded-lg shadow-muted my-4">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="py-3 font-medium bg-muted text-muted-foreground border-b border-r border-muted-foreground/30">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="p-3 text-foreground border-b border-r border-muted-foreground/30">{children}</td>
    ),
  };

  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
