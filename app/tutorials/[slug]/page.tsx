// export const dynamicParams = false;

import { NotFoundError } from "@/lib/errors";
import { getAllTutorialSlugs, getTutorialContent, getTutorialMetadata } from "@/lib/tutorials";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getAllTutorialSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const metadata = getTutorialMetadata(slug);
    return { ...metadata };
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getTutorialContent(slug);

  return (
    <div className="px-4 py-3">
      <div className="prose prose-lg porse-force text-foreground" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
