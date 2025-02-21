import { Text, StyleSheet, Pressable } from "react-native";

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
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
  },
});
