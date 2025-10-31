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
    <main>
      <PracticeSidebar activeChallengeSlug={slug} challenges={challenges} />
      <div>{children}</div>
    </main>
  );
}
