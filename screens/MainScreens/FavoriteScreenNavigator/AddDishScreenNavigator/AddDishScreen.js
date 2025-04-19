import { SafeAreaView, StyleSheet, FlatList, View, Text } from "react-native";
import Heading from "../../../../components/AddDishScreen/Heading";
import AddNameDishContainer from "../../../../components/AddDishScreen/AddNameDishContainer";
import CustomButton from "../../../../components/shared/CustomButton";
import { useCallback, useEffect, useMemo } from "react";
import Spacing from "../../../../utils/Spacing";
import colors from "../../../../utils/Colors";
import useDishContext from "../../../../hooks/useDishContext";
import FoodItem from "../../../../components/SelectFoodForDishScreen/FoodItem";
import {
  alertNotification,
  convertToNumber,
  generateRandomString,
} from "../../../../utils/Common";
import { dishActions } from "../../../../context/dish";
import useAppContext from "../../../../hooks/useAppContext";
import Typography from "../../../../utils/Typography";
import NutritionFactsPie from "../../../../components/shared/NutritionFactsPie";
import { formatFloatNumber } from "../../../../utils/Indicators";
import DailyNutritionBreakdown from "../../../../components/shared/DailyNutritionBreakdown";
import { getLocalDate } from "../../../../utils/Date";
import BottomExtraPaddingScreen from "../../../../components/shared/BottomExtraPaddingScreen";
import { useToast } from "react-native-toast-notifications";
import { Dish } from "../../../../database/entities/Dish";
import { appActions } from "../../../../context/app";
import { DishFood } from "../../../../database/entities/DishFood";
import { CommonActions } from "@react-navigation/native";
import { DEFAULT_AVERAGE_NUTRITIONAL } from "../../../../utils/constants";
import KeyboardAvoidingWrapper from "../../../../components/shared/KeyboardAvoidingWrapper";
export default function AddDishScreen({ navigation, route }) {
  const toast = useToast();
  useEffect(() => {
    // Reset state của dish khi vào màn hình
    dishDispatch(dishActions.resetDish());
  }, [navigation]);
  const [dishState, dishDispatch] = useDishContext();
  const [appState, appDispatch] = useAppContext();
  const { selectedFoodList, nameDish } = dishState;
  const { dailyNutritionList } = appState;
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

    Object.keys(nutrition).forEach((key) => {
      nutrition[key] = formatFloatNumber(nutrition[key]);
    });

    return nutrition;
  }, [selectedFoodList]);
  const dailyNutrition = dailyNutritionList.find(
    (item) => item.getDate() === getLocalDate()
  );
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
  function handleNavigateScreen() {
    navigation.navigate("SelectFoodForDishScreen");
  }

  function handleNavigateDetailFoodScreen(foodId) {
    navigation.navigate("DetailFoodScreen", {
      foodId,
      sourceScreen: route.name,
    });
  }

  function handleCreateDish() {
    const validationRules = [
      {
        condition: selectedFoodList.length === 0,
        title: "No food Selected",
        message: "Please and some food",
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
    const dishId = generateRandomString();
    const { calories, carbs, fat, protein } = calculatedNutritionObj;
    const dish = new Dish(
      dishId,
      nameDish,
      calories,
      carbs,
      fat,
      protein,
      1, // 1 isFavorite, 0 is not favorite
      1 //is Created by user
    );
    appDispatch(appActions.createDish(dish));
    selectedFoodList.forEach((item) => {
      const dishFoodId = generateRandomString();
      const foodId = item.foodId;
      const dishFood = new DishFood(dishFoodId, dishId, foodId);
      appDispatch(appActions.createDishFood(dishFood));
    });
    toast.show("Create dish successful", { type: "success" });
    navigation.dispatch(
      CommonActions.reset({
        index: 0, // Đưa về 1 màn hình duy nhất
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
  const handleRenderFoodItem = useCallback(({ item }) => {
    //; item = {...item, selectedFoodId} đã có selectedFoodId rồi
    return (
      <FoodItem
        food={item}
        onNavigateScreen={handleNavigateDetailFoodScreen}
        onPressButton={removeFoodFromDish}
        action="close"
      />
    );
  }, []);
  function removeFoodFromDish(selectedFood) {
    dishDispatch(dishActions.removeFoodFromDish(selectedFood));
    toast.show("Food deleted from dish", { type: "success" });
  }

  const headerComponent = useMemo(() => {
    return (
      <View style={styles.headerComponent}>
        <Heading>Enter dish Information</Heading>
        <AddNameDishContainer />
        <Heading>Food Ingredients in the Dish</Heading>
        <CustomButton style={styles.button} onPress={handleNavigateScreen}>
          + Add Food
        </CustomButton>
      </View>
    );
  }, []);

  const footerComponent = useMemo(() => {
    return selectedFoodList.length > 0 ? (
      <View style={styles.footerComponent}>
        <Text style={styles.title}>Nutrition Facts</Text>
        <NutritionFactsPie
          calculatedNutritionObj={calculatedNutritionObj}
          style={{ marginHorizontal: 0, marginTop: Spacing.SM }}
        />
        <Text style={styles.title}>Daily Target</Text>
        <DailyNutritionBreakdown
          calculatedNutritionObj={calculatedNutritionObj}
          nutritionTarget={nutritionTarget}
          style={{ marginHorizontal: 0, marginTop: Spacing.SM }}
        />
        <BottomExtraPaddingScreen />
      </View>
    ) : null;
  }, [selectedFoodList, calculatedNutritionObj, nutritionTarget]);

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <FlatList
          data={selectedFoodList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={handleRenderFoodItem}
          style={styles.flatList}
          initialScrollIndex={0}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Spacing.XL,
          }}
          ListHeaderComponentStyle={{ zIndex: 10 }}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={headerComponent}
          ListFooterComponent={footerComponent}
        />
      </SafeAreaView>
      <CustomButton
        style={[styles.button, styles.buttonCreateDish]}
        onPress={handleCreateDish}
      >
        Create Dish
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
    marginTop: Spacing.MD,
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
});
