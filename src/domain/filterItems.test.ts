import { describe, expect, it } from "vitest";
import { countByKind, filterWorkspaceItems } from "./filterItems";
import type { WorkspaceItem } from "../types";

const items: WorkspaceItem[] = [
  {
    id: "1",
    kind: "note",
    title: "Meeting notes",
    body: "Capture design decisions",
    status: "active",
    tags: ["design"],
    updatedAt: "2026-06-17T10:00:00.000Z"
  },
  {
    id: "2",
    kind: "task",
    title: "Ship mobile README",
    body: "Document API boundary",
    status: "done",
    tags: ["docs"],
    updatedAt: "2026-06-18T10:00:00.000Z"
  },
  {
    id: "3",
    kind: "document",
    title: "API contract",
    body: "Notes service response format",
    status: "active",
    tags: ["api"],
    updatedAt: "2026-06-16T10:00:00.000Z"
  }
];

describe("filterWorkspaceItems", () => {
  it("filters by item kind", () => {
    expect(filterWorkspaceItems(items, { query: "", kind: "task" })).toEqual([items[1]]);
  });

  it("searches title, body, status, kind, and tags", () => {
    expect(filterWorkspaceItems(items, { query: "api", kind: "all" }).map((item) => item.id)).toEqual([
      "2",
      "3"
    ]);
  });

  it("sorts newest updated items first", () => {
    expect(filterWorkspaceItems(items, { query: "", kind: "all" }).map((item) => item.id)).toEqual([
      "2",
      "1",
      "3"
    ]);
  });
});

describe("countByKind", () => {
  it("returns totals for all segmented filters", () => {
    expect(countByKind(items)).toEqual({ all: 3, note: 1, task: 1, document: 1 });
  });
});
