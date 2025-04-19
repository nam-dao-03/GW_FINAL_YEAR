import { StyleSheet, Text, View } from "react-native";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import PieChart from "react-native-pie-chart";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import { calculatePercentage } from "../../utils/Indicators";
// const DEFAULT_SERVING_SIZE = 100;

export default function NutritionFactsPie({
  calculatedNutritionObj = {
    calories: 1,
    carbs: 1,
    protein: 1,
    fat: 1,
  },
  style,
}) {
  const widthAndHeight = Sizes.MASSIVE + Sizes.HUGE;

  const nutritionData = [
    { key: "carbs", label: "Carbs", color: colors.brightBlue },
    { key: "protein", label: "Protein", color: colors.amber },
    { key: "fat", label: "Fat", color: colors.violet },
  ];
  const totalNutrition = [
    calculatedNutritionObj.carbs,
    calculatedNutritionObj.protein,
    calculatedNutritionObj.fat,
  ];

  const series = nutritionData.map(({ key, color }) => ({
    value: calculatedNutritionObj[key],
    color,
    label: {
      text: calculatePercentage(calculatedNutritionObj[key], totalNutrition),
      fontSize: Typography.XS,
      fontWeight: "bold",
      fill: colors.whiteColor,
    },
  }));

  return (
    <View style={[styles.container, style]}>
      <View style={styles.pieChartContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          cover={0.45}
        />
        <View style={styles.caloriesContainer}>
          <Text style={styles.caloriesValue}>
            {calculatedNutritionObj.calories}
          </Text>
          <Text style={styles.caloriesTitle}>Kcal</Text>
        </View>
      </View>
      <View style={styles.nutritionInfoSection}>
        {nutritionData.map(({ key, label, color }) => (
          <NutrientInfo
            key={key}
            color={color}
            label={label}
            value={calculatedNutritionObj[key]}
          />
        ))}
      </View>
    </View>
  );
}

function NutrientInfo({ color, label, value }) {
  return (
    <View style={styles.nutrientInfoContainer}>
      <View style={styles.nutrientInfoHeader}>
        <View style={[styles.nutrientInfoCheck, { backgroundColor: color }]} />
        <Text style={styles.nutrientInfoTitle}>{label}</Text>
      </View>
      <Text style={styles.nutrientInfoValue}>{value} g</Text>
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
    flexDirection: "row",
    gap: Spacing.XXXL,
  },
  pieChartContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  caloriesContainer: {
    position: "absolute",
    alignItems: "center",
  },
  caloriesValue: {
    color: colors.tertiaryColor,
    fontSize: Typography.MD,
    fontWeight: "bold",
  },
  caloriesTitle: {
    color: colors.tertiaryColor,
    fontSize: Typography.SM,
  },
  nutritionInfoSection: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.SM,
  },

  nutrientInfoContainer: {
    width: Sizes.MASSIVE,
  },

  nutrientInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.XXS,
  },
  nutrientInfoCheck: {
    width: Sizes.SM,
    height: Sizes.SM,
    borderRadius: Sizes.SM / 2,
  },
  nutrientInfoTitle: {
    fontSize: Typography.SM,
    fontWeight: "bold",
    color: colors.textColor,
  },
  nutrientInfoValue: {
    paddingLeft: Sizes.SM + Spacing.XXS,
    fontSize: Typography.SM,
    color: colors.descriptionTextColor,
  },
});
