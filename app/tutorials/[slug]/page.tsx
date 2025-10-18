export default async function TutorialContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="px-4 py-2">
      <h1>{slug}</h1>
    </div>
  );
}
