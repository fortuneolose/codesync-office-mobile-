import { Pressable, StyleSheet, Text, View } from "react-native";
import { countByKind } from "../domain/filterItems";
import { colors, spacing, typography } from "../theme";
import type { WorkspaceItem, WorkspaceItemKind } from "../types";

type FilterKind = WorkspaceItemKind | "all";

type FilterTabsProps = {
  selectedKind: FilterKind;
  onChange: (kind: FilterKind) => void;
  items: WorkspaceItem[];
};

const filters: Array<{ key: FilterKind; label: string }> = [
  { key: "all", label: "All" },
  { key: "note", label: "Notes" },
  { key: "task", label: "Tasks" },
  { key: "document", label: "Docs" }
];

export function FilterTabs({ selectedKind, onChange, items }: FilterTabsProps) {
  const counts = countByKind(items);

  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const selected = selectedKind === filter.key;

        return (
          <Pressable
            key={filter.key}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(filter.key)}
            style={[styles.tab, selected && styles.selectedTab]}
          >
            <Text style={[styles.label, selected && styles.selectedLabel]} numberOfLines={1}>
              {filter.label}
            </Text>
            <Text style={[styles.count, selected && styles.selectedLabel]}>{counts[filter.key]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    flexDirection: "row",
    gap: spacing.xs,
    padding: spacing.xs
  },
  tab: {
    alignItems: "center",
    borderRadius: 6,
    flex: 1,
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "center",
    minHeight: 36,
    paddingHorizontal: spacing.sm
  },
  selectedTab: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1
  },
  label: {
    color: colors.muted,
    flexShrink: 1,
    fontSize: typography.small,
    fontWeight: "700"
  },
  count: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "800"
  },
  selectedLabel: {
    color: colors.text
  }
});
