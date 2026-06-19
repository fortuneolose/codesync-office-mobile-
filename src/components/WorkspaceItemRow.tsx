import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../theme";
import type { WorkspaceItem, WorkspaceItemKind } from "../types";

type WorkspaceItemRowProps = {
  item: WorkspaceItem;
};

const kindMeta: Record<WorkspaceItemKind, { label: string; icon: keyof typeof Feather.glyphMap }> = {
  document: { label: "Doc", icon: "file-text" },
  note: { label: "Note", icon: "edit-3" },
  task: { label: "Task", icon: "check-square" }
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

export function WorkspaceItemRow({ item }: WorkspaceItemRowProps) {
  const meta = kindMeta[item.kind];
  const done = item.status === "done";

  return (
    <View style={styles.row}>
      <View style={styles.iconBox}>
        <Feather name={meta.icon} size={18} color={colors.accent} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.status, done && styles.doneStatus]}>{done ? "Done" : meta.label}</Text>
        </View>
        <Text style={styles.body} numberOfLines={2}>
          {item.body}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{formatDate(item.updatedAt)}</Text>
          {item.tags.slice(0, 2).map((tag) => (
            <Text key={tag} style={styles.tag} numberOfLines={1}>
              {tag}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    minHeight: 106,
    padding: spacing.md
  },
  iconBox: {
    alignItems: "center",
    backgroundColor: colors.accentSoft,
    borderRadius: 8,
    height: 40,
    justifyContent: "center",
    width: 40
  },
  content: {
    flex: 1,
    minWidth: 0
  },
  titleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "space-between"
  },
  title: {
    color: colors.text,
    flex: 1,
    fontSize: typography.title,
    fontWeight: "800",
    lineHeight: 22
  },
  status: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 6,
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "800",
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  doneStatus: {
    backgroundColor: colors.doneSoft,
    color: colors.done
  },
  body: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: 20,
    marginTop: spacing.xs
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.sm
  },
  metaText: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: "700"
  },
  tag: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 6,
    color: colors.text,
    flexShrink: 1,
    fontSize: typography.small,
    fontWeight: "700",
    overflow: "hidden",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  }
});
