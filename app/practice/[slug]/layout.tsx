import { getAllChallengeListItems } from "../utils/server";
import PracticeSidebar from "./_components/practice-sidebar";

export default async function SinglePracticeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenges = getAllChallengeListItems();

  return (
    <main className="md:max-w-4xl lg:max-w-7xl mx-auto">
      <PracticeSidebar activeChallengeSlug={slug} challenges={challenges} />
      <div className="px-2 py-3.5">{children}</div>
    </main>
  );
}
