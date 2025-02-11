import { Pressable, View, Text, StyleSheet } from "react-native";
import colors from "../utils/Colors";

export default function ContinueButton({ onPress, extraStyle = {} }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.buttonContainer, extraStyle, { opacity: 0.5 }]
          : [styles.buttonContainer, extraStyle]
      }
      onPress={onPress}
    >
      <Text style={styles.content}>Continue</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.secondaryColor,
    padding: 16,
    borderRadius: 20,
    width: "40%",
    marginHorizontal: "auto",
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  content: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
