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
