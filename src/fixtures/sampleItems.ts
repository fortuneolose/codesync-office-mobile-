import type { WorkspaceItem } from "../types";

export const sampleItems: WorkspaceItem[] = [
  {
    id: "sample-note-1",
    kind: "note",
    title: "Application checklist",
    body: "Keep the mobile portfolio project focused on notes, tasks, documents, API boundaries, and offline behavior.",
    status: "active",
    tags: ["portfolio", "mobile"],
    updatedAt: "2026-06-18T16:30:00.000Z",
    owner: "Avent"
  },
  {
    id: "sample-task-1",
    kind: "task",
    title: "Write README tradeoffs",
    body: "Explain state management, API boundary, and why the app keeps offline cache logic separate from components.",
    status: "done",
    tags: ["docs"],
    updatedAt: "2026-06-18T12:15:00.000Z",
    dueAt: "2026-06-19T12:00:00.000Z",
    owner: "Avent"
  },
  {
    id: "sample-document-1",
    kind: "document",
    title: "Interview project brief",
    body: "React Native TypeScript productivity app with search, filtering, async states, and testable domain logic.",
    status: "active",
    tags: ["brief", "react-native"],
    updatedAt: "2026-06-17T09:20:00.000Z",
    owner: "Avent"
  }
];
