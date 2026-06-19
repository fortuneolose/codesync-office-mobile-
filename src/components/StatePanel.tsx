import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";
import type { SyncState } from "../types";

type StatePanelProps = {
  syncState: SyncState;
  errorMessage: string | undefined;
  lastSyncedAt: string | undefined;
  hasCachedItems: boolean;
};

function formatSyncTime(value?: string) {
  if (!value) {
    return "Not synced yet";
  }

  return `Synced ${new Date(value).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

export function StatePanel({ syncState, errorMessage, lastSyncedAt, hasCachedItems }: StatePanelProps) {
  if (syncState === "loading") {
    return (
      <View style={styles.loadingPanel}>
        <Text style={styles.loadingTitle}>Loading workspace</Text>
        <Text style={styles.loadingText}>Fetching the latest notes, tasks, and documents.</Text>
      </View>
    );
  }

  if (syncState === "offline") {
    return (
      <View style={styles.offlinePanel}>
        <Text style={styles.offlineTitle}>Offline snapshot</Text>
        <Text style={styles.offlineText}>
          {hasCachedItems ? "Showing cached workspace items." : "Showing sample items until the API is reachable."}
        </Text>
      </View>
    );
  }

  if (syncState === "error") {
    return (
      <View style={styles.errorPanel}>
        <Text style={styles.errorTitle}>Unable to sync</Text>
        <Text style={styles.errorText}>{errorMessage ?? "The notes API is unavailable."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaText}>{formatSyncTime(lastSyncedAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    minHeight: 20
  },
  metaText: {
    color: colors.muted,
    fontSize: typography.small
  },
  loadingPanel: {
    backgroundColor: colors.accentSoft,
    borderRadius: 8,
    padding: spacing.md
  },
  loadingTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "800"
  },
  loadingText: {
    color: colors.muted,
    fontSize: typography.small,
    marginTop: spacing.xs
  },
  offlinePanel: {
    backgroundColor: colors.warningSoft,
    borderRadius: 8,
    padding: spacing.md
  },
  offlineTitle: {
    color: colors.warning,
    fontSize: typography.body,
    fontWeight: "800"
  },
  offlineText: {
    color: colors.text,
    fontSize: typography.small,
    marginTop: spacing.xs
  },
  errorPanel: {
    backgroundColor: colors.dangerSoft,
    borderRadius: 8,
    padding: spacing.md
  },
  errorTitle: {
    color: colors.danger,
    fontSize: typography.body,
    fontWeight: "800"
  },
  errorText: {
    color: colors.text,
    fontSize: typography.small,
    marginTop: spacing.xs
  }
});
