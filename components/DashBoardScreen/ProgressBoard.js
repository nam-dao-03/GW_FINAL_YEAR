import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../../utils/Colors";
import CaloriesContainer from "./CaloriesContainer";
import { IngredientContainer } from "./IngredientContainer";
import { calculateProgress } from "../../utils/Indicators";
import { useMemo } from "react";
import Sizes from "../../utils/Size";
import Spacing from "../../utils/Spacing";
import useAppContext from "../../hooks/useAppContext";
import { getLocalDate } from "../../utils/Date";
import { DEFAULT_AVERAGE_NUTRITIONAL } from "../../utils/constants";
import { convertToNumber } from "../../utils/Common";
const NEEDED_CALORIES_WIDTH = Sizes.MASSIVE + Sizes.XXL;
const CALORIES_CONTAINER_HEIGHT_IN_NEEDED_CALORIES = NEEDED_CALORIES_WIDTH;
const CALORIES_CONTAINER_WIDTH_IN_NEEDED_CALORIES = NEEDED_CALORIES_WIDTH * 0.6;
export default function ProgressBoard({ dailyNutrition }) {
  const { targetCalories, targetCarbs, targetProtein, targetFat } =
    dailyNutrition;

  const [appState, appDispatch] = useAppContext();
  const {
    mealList,
    foodList,
    dishList,
    mealFoodList,
    mealDishList,
    workoutList,
  } = appState;
  const mealListToday = mealList.filter(
    (meal) => meal.getDate() === getLocalDate()
  );
  const workoutListToday = workoutList.filter(
    (item) => item.workoutDate === getLocalDate()
  );

  const caloriesBurned = workoutListToday.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );

  const mealIds = mealListToday.map((meal) => meal.mealId);
  const allFoods = mealFoodList
    .filter((item) => mealIds.includes(item.mealId))
    .map((item) => foodList.find((food) => food.foodId === item.foodId))
    .filter(Boolean);
  const allDishes = mealDishList
    .filter((item) => mealIds.includes(item.mealId))
    .map((item) => dishList.find((dish) => dish.dishId === item.dishId))
    .filter(Boolean);

  const consumedNutrition = [...allFoods, ...allDishes].reduce(
    (total, item) => {
      total.calories +=
        item.calories *
          (item.averageNutritional
            ? convertToNumber(item.servingSize / DEFAULT_AVERAGE_NUTRITIONAL)
            : 1) || 0;
      total.carbs +=
        item.carbs *
          (item.averageNutritional
            ? convertToNumber(item.servingSize / DEFAULT_AVERAGE_NUTRITIONAL)
            : 1) || 0;
      total.protein +=
        item.protein *
          (item.averageNutritional
            ? convertToNumber(item.servingSize / DEFAULT_AVERAGE_NUTRITIONAL)
            : 1) || 0;
      total.fat +=
        item.fat *
          (item.averageNutritional
            ? convertToNumber(item.servingSize / DEFAULT_AVERAGE_NUTRITIONAL)
            : 1) || 0;
      return total;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );
  const progressCalories = calculateProgress(
    consumedNutrition.calories,
    targetCalories + caloriesBurned
  );
  const progressCarbs = calculateProgress(consumedNutrition.carbs, targetCarbs);
  const progressProtein = calculateProgress(
    consumedNutrition.protein,
    targetProtein
  );
  const progressFat = calculateProgress(consumedNutrition.fat, targetFat);
  const ingredientContainerList = useMemo(
    () => [
      {
        ingredientLabel: "Carbs",
        ingredientConsumedValue: Math.floor(consumedNutrition.carbs),
        ingredientTotalValue: targetCarbs,
        progress: progressCarbs,
        extraStyle: styles.ingredientContainerExtraStyle,
      },
      {
        ingredientLabel: "Protein",
        ingredientConsumedValue: Math.floor(consumedNutrition.protein),
        ingredientTotalValue: targetProtein,
        progress: progressProtein,
        extraStyle: styles.ingredientContainerExtraStyle,
      },
      {
        ingredientLabel: "Fat",
        ingredientConsumedValue: Math.floor(consumedNutrition.fat),
        ingredientTotalValue: targetFat,
        progress: progressFat,
        extraStyle: styles.ingredientContainerExtraStyle,
      },
    ],
    [appState]
  );
  return (
    <View style={styles.boardContainer}>
      <View style={styles.caloriesBoard}>
        <CaloriesContainer
          caloriesLabel="Consumed"
          caloriesValue={Math.floor(consumedNutrition.calories)}
          extraStyle={{ width: "25%" }}
        />
        <View style={styles.neededCalories}>
          <Progress.Circle
            size={NEEDED_CALORIES_WIDTH}
            color={colors.usedProgressColor}
            unfilledColor={colors.remainingProgressColor}
            borderWidth={0}
            progress={progressCalories}
            thickness={Sizes.TINY * 2}
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
    marginTop: Spacing.XL,
  },
  caloriesBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.LG,
  },
  otherIngredientBoard: {
    marginTop: Spacing.XL,
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
