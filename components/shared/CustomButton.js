import { Pressable, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";

export default function CustomButton({ onPress, children, style = {} }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.buttonContainer, style, { opacity: 0.5 }]
          : [styles.buttonContainer, style]
      }
      onPress={onPress}
    >
      <Text style={styles.content}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.secondaryColor,
    padding: Spacing.MD,
    borderRadius: Spacing.XL,
    marginHorizontal: "auto",
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  content: {
    color: "#fff",
    fontSize: Typography.SM,
    textAlign: "center",
  },
});
