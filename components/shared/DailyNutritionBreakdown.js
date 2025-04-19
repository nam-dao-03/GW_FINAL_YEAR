import { View, StyleSheet, Text } from "react-native";
import Spacing from "../utils/Spacing";
import colors from "../utils/Colors";
import * as Progress from "react-native-progress";
import Sizes from "../utils/Size";
import Typography from "../utils/Typography";
import { calculatePercentage, calculateProgress } from "../utils/Indicators";

export default function DailyNutritionBreakdown({
  calculatedNutritionObj = {
    calories: 1,
    carbs: 1,
    protein: 1,
    fat: 1,
  },
  nutritionTarget = {
    targetCalories: 1,
    targetCarbs: 1,
    targetProtein: 1,
    targetFat: 1,
  },
  style,
}) {
  const nutritionInfoList = [
    {
      label: "Kcal",
      borderColor: colors.fieryRed,
      color: colors.fieryRed,
      unfilledColor: colors.softPeach,
      percent: calculatePercentage(calculatedNutritionObj.calories, [
        nutritionTarget.targetCalories,
      ]),
      progress: calculateProgress(
        calculatedNutritionObj.calories,
        nutritionTarget.targetCalories
      ),
    },
    {
      label: "Carbs",
      borderColor: colors.brightBlue,
      color: colors.brightBlue,
      unfilledColor: colors.paleCyan,
      percent: calculatePercentage(calculatedNutritionObj.carbs, [
        nutritionTarget.targetCarbs,
      ]),
      progress: calculateProgress(
        calculatedNutritionObj.carbs,
        nutritionTarget.targetCarbs
      ),
    },
    {
      label: "Protein",
      borderColor: colors.amber,
      color: colors.amber,
      unfilledColor: colors.peachPuff,
      percent: calculatePercentage(calculatedNutritionObj.protein, [
        nutritionTarget.targetProtein,
      ]),
      progress: calculateProgress(
        calculatedNutritionObj.protein,
        nutritionTarget.targetProtein
      ),
    },
    {
      label: "Fat",
      borderColor: colors.violet,
      color: colors.violet,
      unfilledColor: colors.lavenderMist,
      percent: calculatePercentage(calculatedNutritionObj.fat, [
        nutritionTarget.targetFat,
      ]),
      progress: calculateProgress(
        calculatedNutritionObj.fat,
        nutritionTarget.targetFat
      ),
    },
  ];
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <NutritionInfo {...nutritionInfoList[0]} />
        <NutritionInfo {...nutritionInfoList[1]} />
      </View>
      <View style={styles.row}>
        <NutritionInfo {...nutritionInfoList[2]} />
        <NutritionInfo {...nutritionInfoList[3]} />
      </View>
    </View>
  );
}

function NutritionInfo({
  borderColor,
  color,
  unfilledColor,
  progress,
  percent,
  label,
}) {
  return (
    <View style={styles.nutritionInfoContainer}>
      <Progress.Bar
        progress={progress}
        width={Sizes.MASSIVE * 1.5}
        W
        height={Sizes.TINY * 2.5}
        borderRadius={0}
        borderColor={borderColor}
        color={color}
        unfilledColor={unfilledColor}
      />
      <Text style={styles.nutritionInfoDesc}>
        {percent} {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.SM,
    paddingHorizontal: Spacing.MD,
    marginHorizontal: Spacing.SM,
    backgroundColor: colors.whiteColor,
    borderRadius: Spacing.SM,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
    gap: Spacing.SM,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nutritionInfoContainer: {
    gap: Spacing.XXS,
  },
  nutritionInfoDesc: {
    fontSize: Typography.SM,
    color: colors.descriptionTextColor,
  },
});
