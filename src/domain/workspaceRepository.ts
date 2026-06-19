import type { WorkspaceItem } from "../types";

export type WorkspaceClient = {
  listItems: () => Promise<WorkspaceItem[]>;
};

export type WorkspaceCache = {
  read: () => Promise<WorkspaceItem[]>;
  write: (items: WorkspaceItem[]) => Promise<void>;
};

export type LoadWorkspaceResult =
  | {
      source: "network";
      items: WorkspaceItem[];
      errorMessage?: never;
    }
  | {
      source: "cache";
      items: WorkspaceItem[];
      errorMessage: string;
    }
  | {
      source: "empty";
      items: WorkspaceItem[];
      errorMessage: string;
    };

export async function loadWorkspaceItems(
  client: WorkspaceClient,
  cache: WorkspaceCache
): Promise<LoadWorkspaceResult> {
  try {
    const items = await client.listItems();
    await cache.write(items);
    return { source: "network", items };
  } catch (error) {
    const cachedItems = await cache.read();
    const errorMessage = error instanceof Error ? error.message : "Unable to load workspace items.";

    if (cachedItems.length > 0) {
      return { source: "cache", items: cachedItems, errorMessage };
    }

    return { source: "empty", items: [], errorMessage };
  }
}
