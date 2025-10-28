import path from "path";
import fs from "fs";
import { MAX_ORDER_VALUE } from "./constants";
import { splitNameAndOrder } from "./utils";
import matter from "gray-matter";

const cheatsheetsDir = path.join(process.cwd(), "contents", "cheatsheets");

export interface ICheatsheetMetadata {
  title: string;
  description: string;
  kind: "concept" | "syntax" | "function";
}

export interface ICheatsheetItem extends ICheatsheetMetadata {
  content: string;
}

export interface ICheatsheetTopic {
  title: string;
  order: number;
  slug: string;
}

export interface ICheatsheetData extends ICheatsheetTopic {
  items: ICheatsheetItem[];
}

const ALL_CHEATSHEET_TOPICS = fs
  .readdirSync(cheatsheetsDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

export function getCheatsheetTopics(): ICheatsheetTopic[] {
  const allTopics: ICheatsheetTopic[] = ALL_CHEATSHEET_TOPICS.map((topic) => {
    const { title: topicTitle, order: rawTopicOrder } = splitNameAndOrder(topic);
    const topicOrder = rawTopicOrder || MAX_ORDER_VALUE;
    const topicSlug = topicTitle.toLowerCase().replaceAll(" ", "-");
    return { title: topicTitle, slug: topicSlug, order: topicOrder };
  });
  return allTopics.sort((a, b) => a.order - b.order);
}

export function getCheatsheetData(): ICheatsheetData[] {
  const allItems = ALL_CHEATSHEET_TOPICS.map((topic) => {
    const { title: topicTitle, order: rawTopicOrder } = splitNameAndOrder(topic);
    const topicOrder = rawTopicOrder || MAX_ORDER_VALUE;
    const topicSlug = topicTitle.toLowerCase().replaceAll(" ", "-");
    const topicPath = path.join(cheatsheetsDir, topic);
    const cheatsheetFileNames = fs.readdirSync(topicPath);
    const items: ICheatsheetItem[] = cheatsheetFileNames
      .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
      .map((filename) => {
        const filepath = path.join(topicPath, filename);
        const rawContents = fs.readFileSync(filepath, "utf-8");
        const metadata = matter(rawContents).data as ICheatsheetMetadata;
        const content = matter(rawContents).content;
        return { ...metadata, content };
      });
    return { title: topicTitle, slug: topicSlug, order: topicOrder, items };
  });
  return allItems.sort((a, b) => a.order - b.order);
}
