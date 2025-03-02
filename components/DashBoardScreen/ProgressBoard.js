import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../../utils/Colors";
import CaloriesContainer from "./CaloriesContainer";
import { IngredientContainer } from "./IngredientContainer";
import { calculateProgress } from "../../utils/Indicators";
import { useMemo } from "react";
const NEEDED_CALORIES_WIDTH = 140;
const CALORIES_CONTAINER_HEIGHT_IN_NEEDED_CALORIES = NEEDED_CALORIES_WIDTH;
const CALORIES_CONTAINER_WIDTH_IN_NEEDED_CALORIES = NEEDED_CALORIES_WIDTH * 0.6;
export default function ProgressBoard({ dailyNutrition, caloriesBurned = 0 }) {
  const {
    consumedCalories,
    targetCalories,
    targetCarbs,
    targetProtein,
    targetFat,
    consumedCarbs,
    consumedProtein,
    consumedFat,
  } = dailyNutrition;
  const progressCalories = calculateProgress(
    consumedCalories,
    targetCalories + caloriesBurned
  );
  const progressCarbs = calculateProgress(consumedCarbs, targetCarbs);
  const progressProtein = calculateProgress(consumedProtein, targetProtein);
  const progressFat = calculateProgress(consumedFat, targetFat);
  const ingredientContainerList = useMemo(
    () => [
      {
        ingredientLabel: "Carbs",
        ingredientConsumedValue: consumedCarbs,
        ingredientTotalValue: targetCarbs,
        progress: progressCarbs,
        extraStyle: styles.ingredientContainerExtraStyle,
      },
      {
        ingredientLabel: "Protein",
        ingredientConsumedValue: consumedProtein,
        ingredientTotalValue: targetProtein,
        progress: progressProtein,
        extraStyle: styles.ingredientContainerExtraStyle,
      },
      {
        ingredientLabel: "Fat",
        ingredientConsumedValue: consumedFat,
        ingredientTotalValue: targetFat,
        progress: progressFat,
        extraStyle: styles.ingredientContainerExtraStyle,
      },
    ],
    [
      consumedCarbs,
      targetCarbs,
      progressCarbs,
      consumedProtein,
      targetProtein,
      progressProtein,
      consumedFat,
      targetFat,
      progressFat,
    ]
  );
  return (
    <View style={styles.boardContainer}>
      <View style={styles.caloriesBoard}>
        <CaloriesContainer
          caloriesLabel="Consumed"
          caloriesValue={consumedCalories}
          extraStyle={{ width: "25%" }}
        />
        <View style={styles.neededCalories}>
          <Progress.Circle
            size={NEEDED_CALORIES_WIDTH}
            color={colors.usedProgressColor}
            unfilledColor={colors.remainingProgressColor}
            borderWidth={0}
            progress={progressCalories}
            thickness={4}
          />
          <CaloriesContainer
            caloriesLabel="Needed"
            caloriesValue={targetCalories + caloriesBurned}
            extraStyle={styles.caloriesContainerInNeededContainer}
          />
        </View>
        <CaloriesContainer
          caloriesLabel="Burned"
          caloriesValue={caloriesBurned}
          extraStyle={{ width: "25%" }}
        />
      </View>
      <View style={styles.otherIngredientBoard}>
        {ingredientContainerList.map((item, index) => (
          <IngredientContainer
            key={index}
            ingredientLabel={item.ingredientLabel}
            ingredientConsumedValue={item.ingredientConsumedValue}
            ingredientTotalValue={item.ingredientTotalValue}
            progress={item.progress}
            extraStyle={item.extraStyle}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    marginTop: 20,
  },
  caloriesBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  otherIngredientBoard: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ingredientContainerExtraStyle: {
    width: "30%",
  },
  neededCalories: {
    position: "relative",
  },
  caloriesContainerInNeededContainer: {
    width: CALORIES_CONTAINER_WIDTH_IN_NEEDED_CALORIES,
    height: CALORIES_CONTAINER_HEIGHT_IN_NEEDED_CALORIES,
    position: "absolute",
    left: "50%",
    transform: [
      { translateX: -CALORIES_CONTAINER_WIDTH_IN_NEEDED_CALORIES / 2 },
    ],
    justifyContent: "center",
  },
});
