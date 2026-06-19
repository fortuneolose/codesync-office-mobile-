import { FlatList, StyleSheet, Text, View, type FlatListProps } from "react-native";
import { colors, spacing, typography } from "../theme";
import type { WorkspaceItem } from "../types";
import { WorkspaceItemRow } from "./WorkspaceItemRow";

type WorkspaceListProps = {
  items: WorkspaceItem[];
  refreshControl: FlatListProps<WorkspaceItem>["refreshControl"];
};

export function WorkspaceList({ items, refreshControl }: WorkspaceListProps) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      refreshControl={refreshControl}
      contentContainerStyle={items.length === 0 ? styles.emptyContent : styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.emptyPanel}>
          <Text style={styles.emptyTitle}>No matching items</Text>
          <Text style={styles.emptyText}>Adjust the current search or filter.</Text>
        </View>
      }
      renderItem={({ item }) => <WorkspaceItemRow item={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: spacing.xl
  },
  separator: {
    height: spacing.sm
  },
  emptyPanel: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: spacing.xl
  },
  emptyTitle: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: "800"
  },
  emptyText: {
    color: colors.muted,
    fontSize: typography.body,
    marginTop: spacing.xs,
    textAlign: "center"
  }
});
