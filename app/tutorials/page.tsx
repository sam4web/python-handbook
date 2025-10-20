import { getAllTutorialSlugs, getSidebarItems } from "@/lib/tutorials";
import { redirect } from "next/navigation";

export default function TutorialBaseRedirectPage() {
  let firstTutorialSlug;
  const allSlugs = getAllTutorialSlugs();
  firstTutorialSlug = allSlugs[0];
  if (!firstTutorialSlug) {
    const sidebarData = getSidebarItems();
    firstTutorialSlug = sidebarData?.[0]?.items?.[0]?.slug;
  }
  redirect(`/tutorials/${firstTutorialSlug}`);
}
