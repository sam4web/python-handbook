import { getAllTutorialSlugs, getTutorialContent, getTutorialMetadata } from "@/lib/tutorials";
import ReactMarkdown, { Components } from "react-markdown";
import CodeBlock from "@/components/code-block";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getAllTutorialSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const metadata = getTutorialMetadata(slug);
  return { ...metadata };
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getTutorialContent(slug);

  const components: Components = {
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "text";
      if (!match) {
        return <code className="bg-primary/10 px-2.5 py-1 rounded-sm text-accent font-mono">{children}</code>;
      }
      const codeValue = String(children).replace(/\n$/, "");
      return <CodeBlock language={language} value={codeValue} />;
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-2.5 border-primary bg-primary/10 italic text-foreground py-1.5 *:m-0">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold my-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold my-3">{children}</h4>,
    p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
    a: ({ children, href }) => (
      <Link href={href || ""} className="text-primary underline hover:text-accent">
        {children}
      </Link>
    ),
    ul: ({ children }) => <ul className="list-disc pl-6 my-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-2">{children}</ol>,
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
