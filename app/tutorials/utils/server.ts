import { MAX_ORDER_VALUE } from "@/lib/constants";
import { splitNameAndOrder } from "@/lib/utils";
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";
import { ISidebarItem, ITutorialMetadata } from ".";

const tutorialsDir = path.join(process.cwd(), "contents", "tutorials");
let PATH_INDEX: Map<string, string>;

const TUTORIALS_GROUPS = fs
  .readdirSync(tutorialsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

function buildPathIndex(): Map<string, string> {
  const pathIndex = new Map<string, string>();
  for (const group of TUTORIALS_GROUPS) {
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

export function getSidebarItems(): ISidebarItem[] {
  const allItems: ISidebarItem[] = TUTORIALS_GROUPS.map((group) => {
    const { title: categoryTitle, order: rawCategoryOrder } = splitNameAndOrder(group);
    const categoryOrder = rawCategoryOrder || MAX_ORDER_VALUE;
    const groupPath = path.join(tutorialsDir, group);
    const tutorialFileNames = fs.readdirSync(groupPath);
    const items = tutorialFileNames
      .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
      .map((filename) => {
        const baseName = filename.replace(/\.(md|mdx)$/, "");
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
    } as ISidebarItem;
  });
  return allItems.sort((a, b) => a.order - b.order);
}

export function getAllTutorialSlugs(): string[] {
  if (!PATH_INDEX) {
    PATH_INDEX = buildPathIndex();
  }
  return Array.from(PATH_INDEX.keys());
}

export function getTutorialMetadata(slug: string): ITutorialMetadata {
  if (!PATH_INDEX) {
    PATH_INDEX = buildPathIndex();
  }
  const filePath = PATH_INDEX.get(slug);
  if (!filePath) {
    notFound();
  }
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const rawMetadata = matter(fileContents).data as ITutorialMetadata;
  const metadata = { ...rawMetadata, title: (rawMetadata.title ?? "") as string };
  return metadata;
}

export function getTutorialContent(slug: string) {
  if (!PATH_INDEX) {
    PATH_INDEX = buildPathIndex();
  }
  const filePath = PATH_INDEX.get(slug);
  if (!filePath) {
    notFound();
  }
  const rawContents = fs.readFileSync(filePath, "utf8");
  const content = matter(rawContents).content;
  return content;
}
