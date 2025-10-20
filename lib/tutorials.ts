import fs from "fs";
import matter from "gray-matter";
import path from "path";

const tutorialsDir = path.join(process.cwd(), "contents", "tutorials");

export interface TutorialMetadata {
  title: string;
  description?: string;
}

export interface SidebarItem {
  id: string;
  order: number;
  title: string;
  items: {
    slug: string;
    order: number;
    title: string;
  }[];
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function splitNameAndOrder(name: string): { order: number; title: string } {
  const parts = name.split("-");
  let order = Number(parts[0]);
  let slug = parts.slice(1).join("-");
  if (isNaN(order)) order = 0;
  if (!slug.length) slug = name;
  const title = toTitleCase(slug);
  return { order, title };
}

export function getSidebarItems(): SidebarItem[] {
  const groups = fs.readdirSync(tutorialsDir);
  let count = 0;
  const allItems: SidebarItem[] = groups.map((group) => {
    count += 1;
    let { title, order } = splitNameAndOrder(group);
    if (order === 0) {
      order = count;
    }
    const tutorialFileNames = fs.readdirSync(path.join(tutorialsDir, group));
    const items = tutorialFileNames.map((fileName) => {
      const id = fileName.replace(".md", "");
      const { title, order } = splitNameAndOrder(id);
      return { slug: id, order, title };
    });
    const sortedItems = items.sort((a, b) => (a.order > b.order ? 1 : -1));
    return { id: group, order, title, items: sortedItems } as SidebarItem;
  });
  return allItems.sort((a, b) => (a.order > b.order ? 1 : -1));
}

export function getAllTutorialSlugs(): string[] {
  const tutorialGroups = fs.readdirSync(tutorialsDir);
  const allTutorialSlugs = tutorialGroups.flatMap((group) => {
    const tutorialFileNames = fs.readdirSync(path.join(tutorialsDir, group));
    const slugs = tutorialFileNames
      .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
      .map((fileName) => {
        return fileName.replace(/\.(md|mdx)$/, "");
      });
    return slugs;
  });
  return allTutorialSlugs;
}
