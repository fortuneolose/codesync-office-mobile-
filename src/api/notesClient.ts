import { NOTES_API_TOKEN, NOTES_API_URL } from "../config";
import type { RemoteWorkspaceItem, WorkspaceItem, WorkspaceItemKind, WorkspaceItemStatus } from "../types";

type NotesApiResponse = RemoteWorkspaceItem[] | { items?: RemoteWorkspaceItem[]; notes?: RemoteWorkspaceItem[] };

const validKinds: WorkspaceItemKind[] = ["note", "task", "document"];
const validStatuses: WorkspaceItemStatus[] = ["active", "done", "archived"];

function normalizeKind(value: unknown): WorkspaceItemKind {
  return validKinds.includes(value as WorkspaceItemKind) ? (value as WorkspaceItemKind) : "note";
}

function normalizeStatus(value: unknown): WorkspaceItemStatus {
  return validStatuses.includes(value as WorkspaceItemStatus) ? (value as WorkspaceItemStatus) : "active";
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((tag): tag is string => typeof tag === "string");
}

export function normalizeRemoteItem(remoteItem: RemoteWorkspaceItem): WorkspaceItem {
  const updatedAt = remoteItem.updatedAt ?? remoteItem.updated_at ?? new Date().toISOString();
  const dueAt = remoteItem.dueAt ?? remoteItem.due_at;
  const owner = remoteItem.owner;
  const item: WorkspaceItem = {
    id: String(remoteItem.id ?? `local-${Date.now()}-${Math.round(Math.random() * 100000)}`),
    kind: normalizeKind(remoteItem.kind ?? remoteItem.type),
    title: String(remoteItem.title ?? "Untitled"),
    body: String(remoteItem.body ?? remoteItem.content ?? remoteItem.text ?? ""),
    status: normalizeStatus(remoteItem.status),
    tags: normalizeTags(remoteItem.tags),
    updatedAt
  };

  if (dueAt) {
    item.dueAt = dueAt;
  }

  if (owner) {
    item.owner = owner;
  }

  return item;
}

function extractItems(payload: NotesApiResponse): RemoteWorkspaceItem[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.items ?? payload.notes ?? [];
}

export async function listWorkspaceItems(baseUrl = NOTES_API_URL): Promise<WorkspaceItem[]> {
  const url = `${baseUrl.replace(/\/$/, "")}/notes`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      ...(NOTES_API_TOKEN ? { Authorization: `Bearer ${NOTES_API_TOKEN}` } : {})
    }
  });

  if (!response.ok) {
    throw new Error(`Notes API returned ${response.status}`);
  }

  const payload = (await response.json()) as NotesApiResponse;
  return extractItems(payload).map(normalizeRemoteItem);
}
