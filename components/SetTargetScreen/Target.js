import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../utils/Colors";

export default function Target({ heading, description, selected, onPress }) {
  function handleSetSelected() {
    onPress(heading);
  }
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.targetContainer, { opacity: 0.7 }]
          : [
              styles.targetContainer,
              selected
                ? { borderColor: colors.primaryColor, borderWidth: 1 }
                : {},
            ]
      }
      onPress={handleSetSelected}
    >
      <Text
        style={[
          styles.targetHeading,
          selected ? { color: colors.primaryColor } : {},
        ]}
      >
        {heading}
      </Text>
      <Text style={styles.targetDescription}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  targetContainer: {
    width: "85%",
    padding: 20,
    borderRadius: 40,
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: "auto",
    borderWidth: 1,
    borderColor: "transparent",
  },
  targetHeading: {
    textAlign: "center",
    fontSize: 20,
    color: colors.textColor,
  },
  targetDescription: {
    textAlign: "center",
    fontSize: 18,
    color: colors.descriptionTextColor,
  },
});
