import { Text, StyleSheet, Pressable } from "react-native";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";

export default function AddTitle({ onPress, style, children }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [{ opacity: 0.5 }, styles.addTitleContainer, style]
          : [styles.addTitleContainer, style]
      }
      onPress={onPress}
    >
      <Text style={styles.title}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addTitleContainer: {
    paddingVertical: Spacing.SM,
  },
  title: {
    fontSize: Typography.SM,
  },
});
