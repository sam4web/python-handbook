import fs from "fs";
import matter from "gray-matter";
import path from "path";

const tutorialsDir = path.join(process.cwd(), "contents", "tutorials");

export interface TutorialMetadata {
  title: string;
  description?: string;
}

export interface ParsedTutorialMetadata extends TutorialMetadata {
  slug: string;
  order: number;
}

export interface TutorialData {
  id: string;
  order: number;
  title: string;
  items: ParsedTutorialMetadata[];
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function splitName(name: string): { order: number; title: string } {
  const parts = name.split("-");
  let order = Number(parts[0]);
  let slug = parts.slice(1).join("-");
  if (isNaN(order)) order = 0;
  if (!slug.length) slug = name;
  const title = toTitleCase(slug);
  return { order, title };
}

export function getTutorialsData(): TutorialData[] {
  const tutorialGroups = fs.readdirSync(tutorialsDir);
  let count = 0;
  const allTutorialsData: TutorialData[] = tutorialGroups.map((group) => {
    count += 1;
    let { title, order } = splitName(group);
    if (order === 0) {
      order = count;
    }
    const tutorialFileNames = fs.readdirSync(path.join(tutorialsDir, group));
    const items: ParsedTutorialMetadata[] = tutorialFileNames.map((fileName) => {
      const id = fileName.replace(".md", "");
      const { order } = splitName(id);
      const fullPath = path.join(tutorialsDir, group, fileName);
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContent);
      const metadata = matterResult.data as TutorialMetadata;
      return { slug: id, order, ...metadata };
    });
    const sortedItems = items.sort((a, b) => (a.order > b.order ? 1 : -1));
    return { id: group, order, title, items: sortedItems } as TutorialData;
  });
  return allTutorialsData.sort((a, b) => (a.order > b.order ? 1 : -1));
}
