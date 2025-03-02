import { Pressable, StyleSheet, Text } from "react-native";
export default function PressableIcon({
  onPress,
  children,
  style,
  disabled = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.icon, style, { opacity: 0.5 }] : [styles.icon, style]
      }
      disabled={disabled}
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
