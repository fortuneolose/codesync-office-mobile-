import AsyncStorage from "@react-native-async-storage/async-storage";
import type { WorkspaceItem } from "../types";

const CACHE_KEY = "codesync.office.workspaceItems.v1";

export const offlineWorkspaceCache = {
  async read(): Promise<WorkspaceItem[]> {
    const rawValue = await AsyncStorage.getItem(CACHE_KEY);

    if (!rawValue) {
      return [];
    }

    try {
      const parsed = JSON.parse(rawValue) as WorkspaceItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  async write(items: WorkspaceItem[]) {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(items));
  }
};
