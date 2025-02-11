import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
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
    gap: 5,
    alignItems: "center",
  },
  caloriesValue: {
    fontSize: 20,
    paddingBottom: 2,
    color: colors.whiteColor,
    width: "100%",
    textAlign: "center",
    borderBottomColor: colors.remainingProgressColor,
    borderBottomWidth: 1,
  },
  caloriesLabel: {
    fontSize: 16,
    color: colors.whiteColor,
  },
});
