export interface ITutorialMetadata {
  title: string;
  description?: string;
  [key: string]: any;
}

export interface ISidebarItem {
  title: string;
  order: number;
  items: {
    title: string;
    order: number;
    slug: string;
  }[];
}
