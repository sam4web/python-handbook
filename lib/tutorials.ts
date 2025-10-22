import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { NotFoundError } from "./errors";

const tutorialsDir = path.join(process.cwd(), "contents", "tutorials");
let PATH_INDEX: Map<string, string>;
const MAX_ORDER_VALUE = 999999;

export interface TutorialMetadata {
  title: string;
  description?: string;
  [key: string]: any;
}

export interface SidebarItem {
  title: string;
  order: number;
  items: {
    title: string;
    order: number;
    slug: string;
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

function buildPathIndex(): Map<string, string> {
  const pathIndex = new Map<string, string>();
  const tutorialGroups = fs
    .readdirSync(tutorialsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  for (const group of tutorialGroups) {
    const groupPath = path.join(tutorialsDir, group);
    const tutorialFileNames = fs.readdirSync(groupPath);
    for (const fileName of tutorialFileNames) {
      if (fileName.endsWith(".md") || fileName.endsWith(".mdx")) {
        const fullPath = path.join(groupPath, fileName);
        const baseName = fileName.replace(/\.(md|mdx)$/, "");
        const cleanSlug = baseName.slice(baseName.search("-") + 1);
        pathIndex.set(cleanSlug, fullPath);
      }
    }
  }
  return pathIndex;
}

export function getSidebarItems(): SidebarItem[] {
  const tutorialGroups = fs
    .readdirSync(tutorialsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  const allItems: SidebarItem[] = tutorialGroups.map((group) => {
    const { title: categoryTitle, order: rawCategoryOrder } = splitNameAndOrder(group);
    const categoryOrder = rawCategoryOrder || MAX_ORDER_VALUE;
    const groupPath = path.join(tutorialsDir, group);
    const tutorialFileNames = fs.readdirSync(groupPath);
    const items = tutorialFileNames
      .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
      .map((fileName) => {
        const baseName = fileName.replace(/\.(md|mdx)$/, "");
        const { title: itemTitle, order: rawItemOrder } = splitNameAndOrder(baseName);
        const itemOrder = rawItemOrder || MAX_ORDER_VALUE;
        const slug = baseName.slice(baseName.search("-") + 1);
        return { slug, title: itemTitle, order: itemOrder };
      });
    const sortedItems = items.sort((a, b) => a.order - b.order);
    return {
      title: categoryTitle,
      order: categoryOrder,
      items: sortedItems,
    } as SidebarItem;
  });
  return allItems.sort((a, b) => a.order - b.order);
}

export function getAllTutorialSlugs(): string[] {
  if (!PATH_INDEX) {
    PATH_INDEX = buildPathIndex();
  }
  return Array.from(PATH_INDEX.keys());
}

export function getTutorialMetadata(slug: string): TutorialMetadata {
  if (!PATH_INDEX) {
    PATH_INDEX = buildPathIndex();
  }
  const filePath = PATH_INDEX.get(slug);
  if (!filePath) {
    throw new NotFoundError(`Tutorial not found for slug: ${slug}`);
  }
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const rawMetadata = matter(fileContents).data as TutorialMetadata;
  const metadata = { ...rawMetadata, title: (rawMetadata.title ?? "") as string };
  return metadata;
}

export async function getTutorialContent(slug: string) {
  if (!PATH_INDEX) {
    PATH_INDEX = buildPathIndex();
  }
  const filePath = PATH_INDEX.get(slug);
  if (!filePath) {
    throw new NotFoundError(`Tutorial not found for slug: ${slug}`);
  }
  const rawContents = fs.readFileSync(filePath, "utf8");
  const content = matter(rawContents).content;
  return content;
}
