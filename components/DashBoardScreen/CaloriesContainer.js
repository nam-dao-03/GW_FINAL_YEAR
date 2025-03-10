import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
export default function CaloriesContainer({
  caloriesLabel,
  caloriesValue,
  extraStyle,
}) {
  return (
    <View style={[styles.caloriesContainer, extraStyle]}>
      <Text style={styles.caloriesValue}>{caloriesValue}</Text>
      <Text style={styles.caloriesLabel}>{caloriesLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caloriesContainer: {
    gap: Spacing.XS,
    alignItems: "center",
  },
  caloriesValue: {
    fontSize: Typography.MD,
    paddingBottom: Spacing.XXS,
    color: colors.whiteColor,
    width: "100%",
    textAlign: "center",
    borderBottomColor: colors.remainingProgressColor,
    borderBottomWidth: Sizes.XXXS,
  },
  caloriesLabel: {
    fontSize: Typography.SM,
    color: colors.whiteColor,
  },
});
