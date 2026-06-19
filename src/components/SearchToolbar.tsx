import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { colors, spacing, typography } from "../theme";

type SearchToolbarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchToolbar({ value, onChangeText }: SearchToolbarProps) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color={colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search notes, tasks, documents"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 46,
    paddingHorizontal: spacing.md
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: typography.body,
    lineHeight: 20,
    minWidth: 0
  }
});
