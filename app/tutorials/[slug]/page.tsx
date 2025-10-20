// export const dynamicParams = false;

import { getAllTutorialSlugs } from "@/lib/tutorials";

export async function generateStaticParams() {
  const slugs = getAllTutorialSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="px-4 py-3">
      <h1>{slug}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque non odit debitis dolorem totam ducimus officiis,
        modi dignissimos architecto illo! Omnis nesciunt ipsum corrupti magni exercitationem dolore aut eius labore.
      </p>
    </div>
  );
}
