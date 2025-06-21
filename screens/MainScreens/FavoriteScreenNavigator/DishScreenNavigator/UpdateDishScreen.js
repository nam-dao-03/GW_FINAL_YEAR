import { SafeAreaView, StyleSheet, FlatList, View, Text } from "react-native";
import { useCallback, useEffect, useMemo } from "react";
import { useToast } from "react-native-toast-notifications";
import { CommonActions } from "@react-navigation/native";

import Heading from "../../../../components/AddDishScreen/Heading";
import AddNameDishContainer from "../../../../components/AddDishScreen/AddNameDishContainer";
import CustomButton from "../../../../components/shared/CustomButton";
import FoodItem from "../../../../components/SelectFoodForDishScreen/FoodItem";
import NutritionFactsPie from "../../../../components/shared/NutritionFactsPie";
import DailyNutritionBreakdown from "../../../../components/shared/DailyNutritionBreakdown";
import BottomExtraPaddingScreen from "../../../../components/shared/BottomExtraPaddingScreen";

import Spacing from "../../../../utils/Spacing";
import colors from "../../../../utils/Colors";
import Typography from "../../../../utils/Typography";
import { DEFAULT_AVERAGE_NUTRITIONAL } from "../../../../utils/constants";
import {
  alertNotification,
  convertToNumber,
  generateRandomString,
} from "../../../../utils/Common";
import { formatFloatNumber } from "../../../../utils/Indicators";
import { getLocalDate } from "../../../../utils/Date";

import { dishActions } from "../../../../context/dish";
import { appActions } from "../../../../context/app";
import useDishContext from "../../../../hooks/useDishContext";
import useAppContext from "../../../../hooks/useAppContext";

import { Dish } from "../../../../database/entities/Dish";
import { DishFood } from "../../../../database/entities/DishFood";
import KeyboardAvoidingWrapper from "../../../../components/shared/KeyboardAvoidingWrapper";

export default function UpdateDishScreen({ navigation, route }) {
  const { dishId } = route.params;
  const toast = useToast();
  const [dishState, dishDispatch] = useDishContext();
  const [appState, appDispatch] = useAppContext();
  const { dishList, dishFoodList, foodList, dailyNutritionList } = appState;
  const { selectedFoodList, nameDish } = dishState;

  // Lấy dish hiện tại từ dishList
  const dish = useMemo(
    () => dishList.find((dish) => dish.dishId === dishId),
    [dishList, dishId]
  );

  // Lấy nutrition target của ngày hiện tại
  const dailyNutrition = useMemo(
    () => dailyNutritionList.find((item) => item.getDate() === getLocalDate()),
    [dailyNutritionList]
  );

  // Lấy danh sách food từ dishFoodList
  const foodListInDish = useMemo(() => {
    return dishFoodList
      .filter((dishFood) => dishFood.dishId === dishId)
      .map((dishFood) => {
        const food = foodList.find((food) => food.foodId === dishFood.foodId);
        return food
          ? { ...food, selectedFoodId: generateRandomString() }
          : null;
      })
      .filter(Boolean);
  }, [dishFoodList, foodList, dishId]);

  useEffect(() => {
    dishDispatch(dishActions.setDishName(dish?.nameDish || ""));
    dishDispatch(dishActions.removeAllFoodFromDish());
    foodListInDish.forEach((food) =>
      dishDispatch(dishActions.addFoodToDish(food))
    );
  }, [dish, foodListInDish, dishDispatch]);

  // Tính toán dinh dưỡng từ selectedFoodList
  const calculatedNutritionObj = useMemo(() => {
    const nutrition = selectedFoodList.reduce(
      (acc, food) => {
        const scaleFactor = convertToNumber(
          food.servingSize / DEFAULT_AVERAGE_NUTRITIONAL
        );
        acc.calories += food.calories * scaleFactor;
        acc.carbs += food.carbs * scaleFactor;
        acc.protein += food.protein * scaleFactor;
        acc.fat += food.fat * scaleFactor;
        return acc;
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0 }
    );

    return Object.fromEntries(
      Object.entries(nutrition).map(([key, value]) => [
        key,
        formatFloatNumber(value),
      ])
    );
  }, [selectedFoodList]);

  const nutritionTarget = useMemo(() => {
    return dailyNutrition
      ? {
          targetCalories: dailyNutrition.targetCalories,
          targetCarbs: dailyNutrition.targetCarbs,
          targetProtein: dailyNutrition.targetProtein,
          targetFat: dailyNutrition.targetFat,
        }
      : { targetCalories: 0, targetCarbs: 0, targetProtein: 0, targetFat: 0 };
  }, [dailyNutrition]);

  // Xóa food khỏi dish tạm thời
  const removeFoodFromDish = useCallback(
    (selectedFood) => {
      dishDispatch(dishActions.removeFoodFromDish(selectedFood));
      toast.show("Food deleted from dish", { type: "success" });
    },
    [dishDispatch, toast]
  );

  // Tạo dish mới
  function handleCreateDish() {
    const validationRules = [
      {
        condition: selectedFoodList.length === 0,
        title: "No food Selected",
        message: "Please add some food",
      },
      {
        condition: !nameDish || nameDish.trim() === "",
        title: "Empty Name!",
        message: "Please input Name Food",
      },
    ];

    for (const rule of validationRules) {
      if (rule.condition) {
        alertNotification(rule.title, rule.message);
        return;
      }
    }
    const updatedDish = {
      ...dish,
      nameDish: nameDish,
      calories: calculatedNutritionObj.calories,
      carbs: calculatedNutritionObj.carbs,
      fat: calculatedNutritionObj.fat,
      protein: calculatedNutritionObj.protein,
    };
    appDispatch(appActions.updateDish(updatedDish));

    console.warn("foodListInDish", foodListInDish);
    console.warn("selectedFoodList", selectedFoodList);

    dishFoodList.forEach((item) => {
      appDispatch(appActions.deleteDishFoodById(item.dishFoodId));
    });
    selectedFoodList.forEach((item) => {
      const dishFoodId = generateRandomString();
      const foodId = item.foodId;
      const dishFood = new DishFood(dishFoodId, dishId, foodId);
      appDispatch(appActions.createDishFood(dishFood));
    });
    toast.show("Update dish successful", { type: "success" });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "FavoriteScreenNavigator",
            state: {
              routes: [
                { name: "FavoriteScreen", params: { screen: "DishScreen" } },
              ],
            },
          },
        ],
      })
    );
  }

  // Render danh sách food
  const handleRenderFoodItem = useCallback(
    ({ item }) => (
      <FoodItem
        food={item}
        onNavigateScreen={handleNavigateDetailFoodScreen}
        onPressButton={removeFoodFromDish}
        action="close"
      />
    ),
    [removeFoodFromDish]
  );

  function handleNavigateDetailFoodScreen(foodId) {
    navigation
      .getParent("FavoriteScreenNavigator")
      .navigate("FoodScreenNavigator", {
        screen: "DetailFoodScreen",
        params: { foodId, sourceScreen: "UpdateDishScreen" },
      });
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <FlatList
          data={selectedFoodList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={handleRenderFoodItem}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.XL }}
          ListHeaderComponent={
            <View style={styles.headerComponent}>
              <Heading>Enter dish Information</Heading>
              <AddNameDishContainer />
              <Heading>Food Ingredients in the Dish</Heading>
              <CustomButton
                style={styles.button}
                onPress={() => navigation.navigate("UpdateFoodForDishScreen")}
              >
                + Add Food
              </CustomButton>
            </View>
          }
          ListFooterComponent={
            selectedFoodList.length > 0 && (
              <View style={styles.footerComponent}>
                <Text style={styles.title}>Nutrition Facts</Text>
                <NutritionFactsPie
                  calculatedNutritionObj={calculatedNutritionObj}
                />
                <Text style={styles.title}>Daily Target</Text>
                <DailyNutritionBreakdown
                  calculatedNutritionObj={calculatedNutritionObj}
                  nutritionTarget={nutritionTarget}
                />
                <BottomExtraPaddingScreen />
              </View>
            )
          }
        />
      </SafeAreaView>
      <CustomButton
        style={[styles.button, styles.buttonCreateDish]}
        onPress={handleCreateDish}
      >
        Update Dish
      </CustomButton>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    position: "relative",
  },
  button: {
    paddingVertical: Spacing.XS,
    paddingHorizontal: Spacing.BIG_70,
    backgroundColor: colors.primaryColor,
  },
  buttonCreateDish: {
    backgroundColor: colors.secondaryColor,
    position: "absolute",
    bottom: Spacing.MD,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
  headerComponent: {
    marginBottom: Spacing.XS,
  },
  flatList: {
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
  },
  footerComponent: {
    marginTop: Spacing.XS,
  },
  title: {
    marginVertical: Spacing.MD,
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
});
