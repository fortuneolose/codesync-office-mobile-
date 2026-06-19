import { describe, expect, it, vi } from "vitest";
import { loadWorkspaceItems, type WorkspaceCache, type WorkspaceClient } from "./workspaceRepository";
import type { WorkspaceItem } from "../types";

const item: WorkspaceItem = {
  id: "1",
  kind: "note",
  title: "Cached note",
  body: "Available offline",
  status: "active",
  tags: [],
  updatedAt: "2026-06-18T10:00:00.000Z"
};

function makeCache(initialItems: WorkspaceItem[] = []): WorkspaceCache {
  let stored = initialItems;

  return {
    read: vi.fn(async () => stored),
    write: vi.fn(async (items) => {
      stored = items;
    })
  };
}

describe("loadWorkspaceItems", () => {
  it("returns network items and writes them to cache", async () => {
    const client: WorkspaceClient = { listItems: vi.fn(async () => [item]) };
    const cache = makeCache();

    await expect(loadWorkspaceItems(client, cache)).resolves.toEqual({
      source: "network",
      items: [item]
    });
    expect(cache.write).toHaveBeenCalledWith([item]);
  });

  it("returns cached items when the API fails", async () => {
    const client: WorkspaceClient = {
      listItems: vi.fn(async () => {
        throw new Error("Network unavailable");
      })
    };
    const cache = makeCache([item]);

    await expect(loadWorkspaceItems(client, cache)).resolves.toEqual({
      source: "cache",
      items: [item],
      errorMessage: "Network unavailable"
    });
  });

  it("returns an empty state when API and cache are unavailable", async () => {
    const client: WorkspaceClient = {
      listItems: vi.fn(async () => {
        throw new Error("Unauthorized");
      })
    };
    const cache = makeCache();

    await expect(loadWorkspaceItems(client, cache)).resolves.toEqual({
      source: "empty",
      items: [],
      errorMessage: "Unauthorized"
    });
  });
});
