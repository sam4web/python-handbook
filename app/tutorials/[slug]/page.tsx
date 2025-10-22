// export const dynamicParams = false;

import { NotFoundError } from "@/lib/errors";
import { getAllTutorialSlugs, getTutorialContent, getTutorialMetadata } from "@/lib/tutorials";
import { notFound } from "next/navigation";
import TutorialContentRenderer from "../_components/tutorial-content-renderer";

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
    <div className="px-4 py-1.5 md:py-3">
      <TutorialContentRenderer content={content} />
    </div>
  );
}
