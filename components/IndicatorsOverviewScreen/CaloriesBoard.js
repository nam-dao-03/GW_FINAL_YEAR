import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
export default function CaloriesBoard({
  TDEE,
  additionCaloriesNeed,
  targetDay,
}) {
  return (
    <View style={styles.caloriesBoard}>
      <View style={styles.caloriesTextContainer}>
        <Text style={styles.calories}>
          {additionCaloriesNeed ? TDEE + additionCaloriesNeed : TDEE}
        </Text>
        <Text style={styles.caloriesDesc}>Kcal/Day</Text>
      </View>
      {additionCaloriesNeed === 0 ? (
        <Text style={styles.targetDay}>To maintain your healthy weight.</Text>
      ) : (
        <Text style={styles.targetDay}>
          You will reach your goal in{" "}
          <Text style={styles.strongTargetDay}>{targetDay}</Text> days.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  caloriesBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.XL,
    paddingVertical: Spacing.XXL,
    backgroundColor: colors.whiteColor,
    borderTopRightRadius: Spacing.XL,
    borderRadius: Spacing.XS,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
    marginHorizontal: Spacing.LG,
    alignItems: "center",
  },
  caloriesTextContainer: {
    flexDirection: "column",
    gap: Spacing.SM,
    alignItems: "center",
  },
  calories: {
    fontSize: Typography.XL,
    color: colors.tertiaryColor,
  },
  caloriesDesc: {
    fontSize: Typography.SM,
    color: colors.tertiaryColor,
  },
  targetDay: {
    fontSize: Typography.MD,
    width: "60%",
    flexWrap: "wrap",
    lineHeight: Spacing.XL,
    color: colors.textColor,
  },
  strongTargetDay: {
    color: colors.secondaryColor,
    fontWeight: "bold",
    fontSize: Typography.MD,
  },
});
