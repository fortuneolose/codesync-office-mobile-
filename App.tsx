import { StatusBar } from "expo-status-bar";
import { RefreshControl, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FilterTabs } from "./src/components/FilterTabs";
import { SearchToolbar } from "./src/components/SearchToolbar";
import { StatePanel } from "./src/components/StatePanel";
import { WorkspaceList } from "./src/components/WorkspaceList";
import { filterWorkspaceItems } from "./src/domain/filterItems";
import { useWorkspaceItems } from "./src/state/useWorkspaceItems";
import { colors, spacing, typography } from "./src/theme";

export default function App() {
  const {
    items,
    query,
    setQuery,
    selectedKind,
    setSelectedKind,
    syncState,
    lastSyncedAt,
    errorMessage,
    refresh
  } = useWorkspaceItems();

  const filteredItems = filterWorkspaceItems(items, {
    query,
    kind: selectedKind
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.screen}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>Workspace</Text>
            <Text style={styles.title}>Office Hub</Text>
          </View>
          <View style={styles.syncPill}>
            <Text style={styles.syncText}>{syncState === "offline" ? "Offline" : "Live"}</Text>
          </View>
        </View>

        <SearchToolbar value={query} onChangeText={setQuery} />
        <FilterTabs selectedKind={selectedKind} onChange={setSelectedKind} items={items} />

        <StatePanel
          syncState={syncState}
          errorMessage={errorMessage}
          lastSyncedAt={lastSyncedAt}
          hasCachedItems={items.length > 0}
        />

        <WorkspaceList
          items={filteredItems}
          refreshControl={
            <RefreshControl
              refreshing={syncState === "loading"}
              onRefresh={refresh}
              tintColor={colors.accent}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas
  },
  screen: {
    flex: 1,
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  kicker: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 36
  },
  syncPill: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  syncText: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: "700"
  }
});
