import { Pressable, StyleSheet, Text } from "react-native";
export default function PressableIcon({ onPress, children, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [style, { opacity: 0.5 }, styles.icon] : [style, styles.icon]
      }
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 5,
  },
});
