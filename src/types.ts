export type WorkspaceItemKind = "note" | "task" | "document";

export type WorkspaceItemStatus = "active" | "done" | "archived";

export type WorkspaceItem = {
  id: string;
  kind: WorkspaceItemKind;
  title: string;
  body: string;
  status: WorkspaceItemStatus;
  tags: string[];
  updatedAt: string;
  dueAt?: string;
  owner?: string;
};

export type WorkspaceFilter = {
  query: string;
  kind: WorkspaceItemKind | "all";
};

export type SyncState = "idle" | "loading" | "offline" | "error";

export type RemoteWorkspaceItem = Partial<WorkspaceItem> & {
  type?: string;
  content?: string;
  text?: string;
  updated_at?: string;
  due_at?: string;
};
