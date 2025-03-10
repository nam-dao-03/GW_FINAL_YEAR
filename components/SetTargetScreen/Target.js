import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../utils/Colors";
import usePersonContext from "../../hooks/usePersonContext";
import { personActions } from "../../context/person";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
export default function Target({
  heading,
  description,
  status,
  selected,
  onPress,
}) {
  const [state, dispatch] = usePersonContext();
  const { target } = state;
  function handleSetSelected() {
    onPress(target === status ? "" : status);
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
    padding: Spacing.LG,
    borderRadius: Spacing.XXXL,
    alignItems: "center",
    gap: Spacing.SM,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
    marginHorizontal: "auto",
    borderWidth: 1,
    borderColor: "transparent",
  },
  targetHeading: {
    textAlign: "center",
    fontSize: Typography.MD,
    color: colors.textColor,
  },
  targetDescription: {
    textAlign: "center",
    fontSize: Typography.SM,
    color: colors.descriptionTextColor,
    lineHeight: Spacing.XL,
  },
});
