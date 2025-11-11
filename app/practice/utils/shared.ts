export type DifficultyKey = "easy" | "medium" | "hard" | "expert";

type JSONValue = string | number | boolean | { [key: string]: JSONValue } | JSONValue[] | null;

export interface IDifficulty {
  key: DifficultyKey;
  label: string;
  colorClass?: string;
}

export const DIFFICULTY_FILTERS: Record<DifficultyKey, IDifficulty> = {
  easy: { key: "easy", label: "Easy", colorClass: "text-green-700 dark:text-green-300 bg-green-500/30" },
  medium: { key: "medium", label: "Medium", colorClass: "text-yellow-700 dark:text-yellow-300 bg-yellow-500/30" },
  hard: { key: "hard", label: "Hard", colorClass: "text-red-700 dark:text-red-300 bg-red-500/30" },
  expert: { key: "expert", label: "Expert", colorClass: "text-purple-700 dark:text-purple-300 bg-purple-500/30" },
};

export const DIFFICULTY_MAP = Object.values(DIFFICULTY_FILTERS);

export interface IChallengeMetadata {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface IChallengeListItem extends IChallengeMetadata {
  difficulty: DifficultyKey;
  category: string[];
}

export interface ITestCase {
  input: JSONValue[];
  expected_output: JSONValue;
}

export interface ITestResult {
  passed: boolean;
  actualOutput: JSONValue;
  expectedOutput: JSONValue;
  inputArgs: JSONValue[];
  errorMessage?: string;
}

export interface IChallenge extends IChallengeListItem {
  constraints: string[];
  startercode: string;
  solution_code: string;
  hints: string[];
  examples: {
    input_value: string;
    output_value: string;
    explanation?: string;
  }[];
  testcases: ITestCase[];
  functionName: string;
}
