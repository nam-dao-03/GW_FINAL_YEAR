import { Pressable, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
export default function Intensity({
  heading,
  description,
  selected,
  status,
  onPress,
}) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.intensityContainer, { opacity: 0.7 }]
          : [
              styles.intensityContainer,
              selected
                ? { borderColor: colors.primaryColor, borderWidth: 1 }
                : {},
            ]
      }
      onPress={onPress}
    >
      <Text
        style={[
          styles.intensityHeading,
          selected ? { color: colors.primaryColor } : {},
        ]}
      >
        {heading}
      </Text>
      <Text style={styles.intensityDescription}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet({
  intensityContainer: {
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
  intensityHeading: {
    textAlign: "center",
    fontSize: 20,
    color: colors.textColor,
  },
  intensityDescription: {
    textAlign: "center",
    fontSize: 16,
    color: colors.descriptionTextColor,
  },
});
