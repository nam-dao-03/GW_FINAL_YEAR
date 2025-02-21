import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function PressableIcon({ onPress, size, color, name, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [style, { opacity: 0.5 }, styles.icon] : [style, styles.icon]
      }
    >
      <Ionicons size={size} color={color} name={name} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
});
