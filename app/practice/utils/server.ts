import fs from "fs";
import path from "path";
import { IChallenge, IChallengeListItem, IChallengeMetadata, IEditorTheme } from "./shared";
import { notFound } from "next/navigation";

const challengesDir = path.join(process.cwd(), "contents", "challenges");
let savedListItems: IChallengeListItem[] | null = null;
let savedMetadataItems: IChallengeMetadata[] | null = null;

const CHALLENGE_FILES = fs.readdirSync(challengesDir).filter((item) => item.endsWith(".json"));

export function getAllThemesData(): IEditorTheme[] {
  const themesDirPath = path.join(process.cwd(), "lib", "themes");
  const fileNames = fs.readdirSync(themesDirPath).filter((name) => name.endsWith(".json"));
  const themes = fileNames.map((fileName) => {
    const filePath = path.join(themesDirPath, fileName);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const label = path.parse(fileName).name.replaceAll("-", " ");
    const name = label.replaceAll(" ", "-").toLowerCase();
    const data = JSON.parse(fileContent);
    return { label, name, data } as IEditorTheme;
  });
  return themes;
}

export function getAllChallengeMetadata(): IChallengeMetadata[] {
  if (savedMetadataItems) {
    return savedMetadataItems;
  }
  const items: IChallengeMetadata[] = CHALLENGE_FILES.map((fileName) => {
    const filePath = path.join(challengesDir, fileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const { id, title, slug, description } = JSON.parse(content);
    return {
      id,
      title,
      slug,
      description,
    };
  });
  savedMetadataItems = items;
  return items;
}

export function getAllChallengeListItems(): IChallengeListItem[] {
  if (savedListItems) {
    return savedListItems;
  }
  const items: IChallengeListItem[] = CHALLENGE_FILES.map((fileName) => {
    const filePath = path.join(challengesDir, fileName);
    const content = fs.readFileSync(filePath, "utf-8");
    const { id, title, slug, difficulty, description, category } = JSON.parse(content);
    return {
      id,
      title,
      slug,
      difficulty,
      description,
      category,
    };
  });
  savedListItems = items;
  return items;
}

export function getChallengeMetadataBySlug(challengeSlug: string): IChallengeMetadata {
  const filePath = path.join(challengesDir, `${challengeSlug}.json`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  const content = fs.readFileSync(filePath, "utf-8");
  const { id, title, slug, description } = JSON.parse(content) as IChallengeMetadata;
  return { id, title, slug, description };
}

export function getChallengeBySlug(challengeSlug: string): IChallenge {
  const filePath = path.join(challengesDir, `${challengeSlug}.json`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  const content = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(content) as IChallenge;
  return data;
}
