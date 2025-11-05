import fs from "fs";
import path from "path";
import { IChallengeListItem } from "./shared";

const challengesDir = path.join(process.cwd(), "contents", "challenges");

// export function getChallengeSlugsAndTitles(): IChallengeMetadata[] {}

// export function getChallengeMetadataBySlug(): IChallengeMetadata {}

// export function getChallengeBySlug(slug: string): IChallenge {}

export function getAllChallengeListItems(): IChallengeListItem[] {
  const challenges = fs.readdirSync(challengesDir);
  console.log(challenges);
  // const allItems =
  return [];
}
