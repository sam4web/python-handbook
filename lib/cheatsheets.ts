export interface ICheatsheetItem {
  title: string;
  description: string;
  content: string;
}

export interface ICheatsheetCategory {
  id: number;
  name: string;
  cheatsheets: ICheatsheetItem[];
}

export const mockCheatsheetData: ICheatsheetCategory[] = [
  {
    id: 1,
    name: "Git Version Control", // <-- Usage updated here
    cheatsheets: [
      {
        title: "Commit Changes",
        description: "Records changes to the repository with a descriptive message.",
        content: `git commit -m "feat: Add new feature"
git commit -m "feat: Add new feature"
git commit -m "feat: Add new feature"
git commit -m "feat: Add new featurexxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`,
      },
      {
        title: "Force Push",
        description: "Overwrites the remote branch history with your local version (use with caution).",
        content: `git push --force origin <branch-name>`,
      },
      {
        title: "Undo Last Commit",
        description: "Moves HEAD pointer back one commit, keeping changes in the working directory.",
        content: `git reset HEAD~1`,
      },
      {
        title: "View History",
        description: "Displays a clean, graphical history of the commit tree.",
        content: `git log --oneline --graph --decorate`,
      },
    ],
  },
  {
    id: 2,
    name: "CSS Layouts and Styling", // <-- Usage updated here
    cheatsheets: [
      {
        title: "Center Horizontally (Flexbox)",
        description: "Centers an item within a flex container along the main axis.",
        content: `.container {
  display: flex;
  justify-content: center;
}`,
      },
      {
        title: "Grid Template",
        description: "Defines a 3-column grid with equal width tracks.",
        content: `.grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}`,
      },
      {
        title: "Visually Hide Element",
        description: "Hides an element from view but keeps it accessible to screen readers.",
        content: `.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}`,
      },
    ],
  },
  {
    id: 3,
    name: "TypeScript Basics", // <-- Usage updated here
    cheatsheets: [
      {
        title: "Interface Definition",
        description: "Defines a shape for objects to ensure type safety.",
        content: `interface User {
  id: number;
  name: string;
  email?: string; // optional property
}`,
      },
      {
        title: "Generics Usage",
        description: "Creates reusable components that can work over several types.",
        content: `function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);`,
      },
      {
        title: "Union Types",
        description: "Allows a variable to be one of several types.",
        content: `let status: "success" | "error" | number;

status = "success";
status = 404;`,
      },
    ],
  },
];
