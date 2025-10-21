import path from "path";
import fs from "fs";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export async function getMarkdownData(fullPath?: string | null, filePath?: string): Promise<string> {
  let finalPath: string;
  if (fullPath) {
    finalPath = fullPath;
  } else if (filePath) {
    finalPath = path.join(process.cwd(), filePath);
  } else {
    throw new Error("One path argument (fullPath or filePath) must be provided.");
  }
  const rawContents = fs.readFileSync(finalPath, "utf8");
  const fileContents = matter(rawContents).content;
  const processedContent = await remark().use(html).process(fileContents);
  return processedContent.toString();
}
