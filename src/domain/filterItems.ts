import type { WorkspaceFilter, WorkspaceItem } from "../types";

const normalize = (value: string) => value.trim().toLowerCase();

export function filterWorkspaceItems(items: WorkspaceItem[], filter: WorkspaceFilter) {
  const query = normalize(filter.query);

  return items
    .filter((item) => filter.kind === "all" || item.kind === filter.kind)
    .filter((item) => {
      if (!query) {
        return true;
      }

      const searchableText = [item.title, item.body, item.status, item.kind, ...item.tags]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    })
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt));
}

export function countByKind(items: WorkspaceItem[]) {
  return items.reduce(
    (counts, item) => ({
      ...counts,
      [item.kind]: counts[item.kind] + 1
    }),
    { all: items.length, note: 0, task: 0, document: 0 }
  );
}
