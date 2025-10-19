// export const dynamicParams = false;

import { getTutorialsData } from "@/lib/tutorials";

export async function generateStaticParams() {
  return [{ slug: "what-is-python" }, { slug: "hello-world-program" }, { slug: "strings" }, { slug: "lists" }];
}

export default async function TutorialContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorialData = getTutorialsData();

  return (
    <div className="px-4 py-2">
      <h1>{slug}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque non odit debitis dolorem totam ducimus officiis,
        modi dignissimos architecto illo! Omnis nesciunt ipsum corrupti magni exercitationem dolore aut eius labore.
      </p>
    </div>
  );
}
