import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useCallback } from "react";
import useAppContext from "../../../hooks/useAppContext";
import { appActions } from "../../../context/app";
import HeaderNavigation from "../../../components/shared/HeaderNavigation";
import Spacing from "../../../utils/Spacing";
import Typography from "../../../utils/Typography";
import colors from "../../../utils/Colors";
import NutritionFactsPie from "../../../components/shared/NutritionFactsPie";
import DailyNutritionBreakdown from "../../../components/shared/DailyNutritionBreakdown";
import BottomExtraPaddingScreen from "../../../components/shared/BottomExtraPaddingScreen";
import { getLocalDate } from "../../../utils/Date";
import { DEFAULT_AVERAGE_NUTRITIONAL } from "../../../utils/constants";
import { formatFloatNumber } from "../../../utils/Indicators";
export default function DetailMealScreen({ navigation, route }) {
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  const [state, dispatch] = useAppContext();
  useFocusEffect(
    useCallback(() => {
      bottomTabNavigation.setOptions({
        tabBarStyle: { display: "none" },
      });
      navigation.setOptions({
        header: () => <HeaderNavigation title={title} />,
      });
      dispatch(appActions.setFalseShowFAB());
    }, [navigation, route])
  );
  const { mealId, title } = route.params;
  const { mealDishList, mealFoodList, foodList, dishList, dailyNutritionList } =
    state;

  const dailyNutrition = dailyNutritionList.find(
    (item) => item.getDate() === getLocalDate()
  );

  const mealFoodListDetail = mealFoodList.filter(
    (item) => item.mealId === mealId
  );
  const mealDishListDetail = mealDishList.filter(
    (item) => item.mealId === mealId
  );

  const foodListInMeal = mealFoodListDetail.map((mealFood) =>
    foodList.find((food) => food.foodId === mealFood.foodId)
  );

  const dishListInMeal = mealDishListDetail.map((mealDish) =>
    dishList.find((dish) => dish.dishId === mealDish.dishId)
  );

  const totalNutrition = [...foodListInMeal, ...dishListInMeal].reduce(
    (acc, item) => {
      const factor = item.servingSize
        ? item.servingSize / DEFAULT_AVERAGE_NUTRITIONAL
        : 1; // Chỉ áp dụng cho foodListInMeal
      acc.calories += item.calories * factor;
      acc.protein += item.protein * factor;
      acc.fat += item.fat * factor;
      acc.carbs += item.carbs * factor;
      return acc;
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
  Object.keys(totalNutrition).forEach((key) => {
    totalNutrition[key] = formatFloatNumber(totalNutrition[key]);
  });

  const nutritionTarget = {
    targetCalories: dailyNutrition.targetCalories,
    targetCarbs: dailyNutrition.targetCarbs,
    targetProtein: dailyNutrition.targetProtein,
    targetFat: dailyNutrition.targetFat,
  };

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView style={styles.flex}>
        <Text style={styles.title}>Nutrition Facts</Text>
        <NutritionFactsPie
          calculatedNutritionObj={totalNutrition}
          style={{ marginTop: Spacing.MD, marginHorizontal: Spacing.SM }}
        />
        <Text style={styles.title}>Daily Target</Text>
        <DailyNutritionBreakdown
          calculatedNutritionObj={totalNutrition}
          nutritionTarget={nutritionTarget}
          style={{ marginTop: Spacing.MD, marginHorizontal: Spacing.SM }}
        />
        <BottomExtraPaddingScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    marginHorizontal: Spacing.SM,
    marginTop: Spacing.MD,
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
});
