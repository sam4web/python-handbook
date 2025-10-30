export type DifficultyKey = "easy" | "medium" | "hard" | "expert";

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

export interface IFormat {
  type: string;
  example: string;
}

export interface IChallenge {
  id: number;
  title: string;
  difficulty: DifficultyKey;
  category: string[];
  description: string;
  input_format: IFormat;
  output_format: IFormat;
}

export const mockPracticeChallenges: IChallenge[] = [
  {
    id: 1,
    title: "Sum of Two Integers",
    difficulty: "easy",
    category: ["basics", "math"],
    description: "Write a function that takes two integer inputs, `a` and `b`, and returns their sum.",
    input_format: { type: "array", example: "[5, 3]" },
    output_format: { type: "integer", example: "8" },
  },
  {
    id: 2,
    title: "Area of a Circle",
    difficulty: "easy",
    category: ["basics", "math"],
    description:
      "Calculate the area of a circle given its radius (`r`). Use π ≈ 3.14159. Round the result to two decimal places.",
    input_format: { type: "float", example: "4.0" },
    output_format: { type: "float", example: "50.27" },
  },
  {
    id: 3,
    title: "Celsius to Fahrenheit",
    difficulty: "easy",
    category: ["basics", "math"],
    description: "Convert a temperature from Celsius to Fahrenheit. Formula: F = C * 9/5 + 32.",
    input_format: { type: "integer", example: "20" },
    output_format: { type: "integer", example: "68" },
  },
  {
    id: 4,
    title: "Simple Calculator",
    difficulty: "medium",
    category: ["basics", "functions"],
    description:
      "Implement a function that takes two numbers and an operator (+, -, *, /) and performs the calculation.",
    input_format: { type: "object", example: "{ num1: 10, num2: 5, operator: '+' }" },
    output_format: { type: "integer", example: "15" },
  },

  // --- STRINGS (5 Items) ---
  {
    id: 5,
    title: "Reverse a String",
    difficulty: "medium",
    category: ["strings"],
    description: "Given an input string, return the string with its characters in reverse order.",
    input_format: { type: "string", example: "'programming'" },
    output_format: { type: "string", example: "'gnimmargorp'" },
  },
  {
    id: 6,
    title: "Count Vowels",
    difficulty: "easy",
    category: ["strings"],
    description:
      "Write a function that counts and returns the number of vowels (a, e, i, o, u) in a given string. Case should not matter.",
    input_format: { type: "string", example: "'Education'" },
    output_format: { type: "integer", example: "5" },
  },
  {
    id: 7,
    title: "Check Palindrome",
    difficulty: "medium",
    category: ["strings"],
    description:
      "Determine if a given string is a palindrome (reads the same forwards and backwards, ignoring case and spaces).",
    input_format: { type: "string", example: "'A man a plan a canal Panama'" },
    output_format: { type: "boolean", example: "true" },
  },
  {
    id: 8,
    title: "Title Case a Sentence",
    difficulty: "medium",
    category: ["strings"],
    description: "Convert a sentence to title case, where the first letter of every word is capitalized.",
    input_format: { type: "string", example: "'the quick brown fox'" },
    output_format: { type: "string", example: "'The Quick Brown Fox'" },
  },
  {
    id: 9,
    title: "Longest Word in Sentence",
    difficulty: "hard",
    category: ["strings", "arrays"],
    description:
      "Find and return the longest word in a sentence. If there are ties, return the first longest word found.",
    input_format: { type: "string", example: "'Find the longest word here'" },
    output_format: { type: "string", example: "'longest'" },
  },

  {
    id: 10,
    title: "Array Sum and Average",
    difficulty: "easy",
    category: ["arrays", "math"],
    description: "Calculate the sum and average of all numbers in a given list of integers.",
    input_format: { type: "array", example: "[1, 2, 3, 4, 5]" },
    output_format: { type: "object", example: "{ sum: 15, average: 3.0 }" },
  },
  {
    id: 11,
    title: "Remove Duplicates",
    difficulty: "medium",
    category: ["arrays"],
    description:
      "Given a list of items, return a new list containing only the unique elements in their original order.",
    input_format: { type: "array", example: "[1, 2, 2, 3, 4, 3]" },
    output_format: { type: "array", example: "[1, 2, 3, 4]" },
  },
  {
    id: 12,
    title: "Rotate Array Left",
    difficulty: "hard",
    category: ["arrays", "algorithms"],
    description: "Rotate the elements of an array to the left by `k` steps.",
    input_format: { type: "object", example: "{ array: [1, 2, 3, 4, 5], k: 2 }" },
    output_format: { type: "array", example: "[3, 4, 5, 1, 2]" },
  },
  {
    id: 13,
    title: "Binary Search",
    difficulty: "medium",
    category: ["arrays", "algorithms"],
    description: "Implement the binary search algorithm to efficiently find a target value in a sorted array.",
    input_format: { type: "object", example: "{ array: [2, 5, 8, 12, 16], target: 12 }" },
    output_format: { type: "integer", example: "3" },
  },
  {
    id: 14,
    title: "Two Sum",
    difficulty: "hard",
    category: ["arrays", "objects_maps", "algorithms"],
    description:
      "Given an array of integers and a target sum, return the indices of the two numbers that add up to the target.",
    input_format: { type: "object", example: "{ nums: [2, 7, 11, 15], target: 9 }" },
    output_format: { type: "array", example: "[0, 1]" },
  },

  // --- COMPLEX/ADVANCED (6 Items) ---
  {
    id: 15,
    title: "Factorial (Recursive)",
    difficulty: "medium",
    category: ["recursion", "math"],
    description: "Calculate the factorial of a non-negative integer `n` using recursion.",
    input_format: { type: "integer", example: "5" },
    output_format: { type: "integer", example: "120" },
  },
  {
    id: 16,
    title: "Fibonacci Sequence (Nth Term)",
    difficulty: "hard",
    category: ["recursion", "algorithms"],
    description:
      "Find the nth term of the Fibonacci sequence, optimizing for performance (e.g., using memoization or iteration).",
    input_format: { type: "integer", example: "7" },
    output_format: { type: "integer", example: "13" },
  },
  {
    id: 17,
    title: "Valid Parentheses",
    difficulty: "hard",
    category: ["data_structures", "algorithms", "strings"],
    description:
      "Determine if an input string of parentheses `(`, `)`, `{`, `}`, `[`, `]` is valid. Must use a stack data structure.",
    input_format: { type: "string", example: "'([{}])'" },
    output_format: { type: "boolean", example: "true" },
  },
  {
    id: 18,
    title: "Depth First Search (DFS)",
    difficulty: "expert",
    category: ["data_structures", "algorithms", "graphs"],
    description: "Implement Depth First Search on a simple tree or graph structure to find a specific node.",
    input_format: { type: "object", example: "{ graph: {a: [b, c], b: [d]}, start: 'a', target: 'd' }" },
    output_format: { type: "boolean", example: "true" },
  },
  {
    id: 19,
    title: "Count Word Frequency",
    difficulty: "medium",
    category: ["objects_maps", "strings"],
    description:
      "Given a string of text, return an object/map where keys are words and values are the frequency of those words.",
    input_format: { type: "string", example: "'apple banana apple orange'" },
    output_format: { type: "object", example: "{ apple: 2, banana: 1, orange: 1 }" },
  },
  {
    id: 20,
    title: "Linked List Reversal",
    difficulty: "expert",
    category: ["data_structures"],
    description: "Reverse a singly linked list in place and return the new head of the list.",
    input_format: { type: "array", example: "[1, 2, 3, 4]" },
    output_format: { type: "array", example: "[4, 3, 2, 1]" },
  },
];
