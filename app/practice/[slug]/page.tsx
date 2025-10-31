import { mockPracticeChallenges } from "@/lib/practice";
import { notFound } from "next/navigation";

// generateStaticParams
// generateMetadata

export default async function SinglePracticePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activeChallenge = mockPracticeChallenges.find((item) => item.slug === slug);

  if (!activeChallenge) {
    notFound();
  }

  return <main>{slug}</main>;
}
