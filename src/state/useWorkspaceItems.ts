import { useCallback, useEffect, useState } from "react";
import { listWorkspaceItems } from "../api/notesClient";
import { loadWorkspaceItems } from "../domain/workspaceRepository";
import { sampleItems } from "../fixtures/sampleItems";
import { offlineWorkspaceCache } from "../storage/offlineCache";
import type { SyncState, WorkspaceItem, WorkspaceItemKind } from "../types";

export function useWorkspaceItems() {
  const [items, setItems] = useState<WorkspaceItem[]>(sampleItems);
  const [query, setQuery] = useState("");
  const [selectedKind, setSelectedKind] = useState<WorkspaceItemKind | "all">("all");
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [lastSyncedAt, setLastSyncedAt] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const refresh = useCallback(async () => {
    setSyncState("loading");
    setErrorMessage(undefined);

    const result = await loadWorkspaceItems({ listItems: listWorkspaceItems }, offlineWorkspaceCache);
    setItems(result.items.length > 0 ? result.items : sampleItems);

    if (result.source === "network") {
      setSyncState("idle");
      setLastSyncedAt(new Date().toISOString());
      return;
    }

    setSyncState(result.source === "cache" ? "offline" : "error");
    setErrorMessage(result.errorMessage);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    items,
    query,
    setQuery,
    selectedKind,
    setSelectedKind,
    syncState,
    lastSyncedAt,
    errorMessage,
    refresh
  };
}
