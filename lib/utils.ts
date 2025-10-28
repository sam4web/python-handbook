export const cx = (...classNames: string[]): string => classNames.filter(Boolean).join(" ");

export function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function splitNameAndOrder(name: string): { order: number; title: string } {
  const parts = name.split("-");
  let order = Number(parts[0]);
  let slug = parts.slice(1).join("-");
  if (isNaN(order)) order = 0;
  if (!slug.length) slug = name;
  const title = toTitleCase(slug);
  return { order, title };
}
