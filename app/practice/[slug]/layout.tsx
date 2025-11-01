import { mockPracticeChallenges } from "@/lib/practice";
import PracticeSidebar from "./_components/practice-sidebar";

export default async function SinglePracticeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenges = mockPracticeChallenges;

  return (
    <main className="max-w-lg md:max-w-7xl mx-auto">
      <PracticeSidebar activeChallengeSlug={slug} challenges={challenges} />
      <div className="px-2 py-3.5">{children}</div>
    </main>
  );
}
