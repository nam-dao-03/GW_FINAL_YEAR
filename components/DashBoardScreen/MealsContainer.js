import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
import {
  BREAKFAST,
  DEFAULT_AVERAGE_NUTRITIONAL,
  DINNER,
  LUNCH,
  SNACK,
} from "../../utils/constants";
import { convertToNumber, showConfirmationDialog } from "../../utils/Common";
import useAppContext from "../../hooks/useAppContext";
import HeadingContainer from "./HeadingContainer";
import { getLocalDate } from "../../utils/Date";
import { useToast } from "react-native-toast-notifications";
import { appActions } from "../../context/app";
import { useNavigation, useRoute } from "@react-navigation/native";
export default function MealsContainer({ dailyNutrition }) {
  const navigation = useNavigation();
  const route = useRoute();
  const toast = useToast();
  const [appState, appDispatch] = useAppContext();
  const { mealList, foodList, dishList, mealFoodList, mealDishList } = appState;
  const mealListToday = mealList.filter(
    (meal) => meal.getDate() === getLocalDate()
  );
  const { targetCalories } = dailyNutrition;
  // Lấy các mealId cho từng bữa ăn
  const mealIds = {
    breakfast: mealListToday.find((meal) => meal.getName() === BREAKFAST)
      ?.mealId,
    lunch: mealListToday.find((meal) => meal.getName() === LUNCH)?.mealId,
    dinner: mealListToday.find((meal) => meal.getName() === DINNER)?.mealId,
    snack: mealListToday.find((meal) => meal.getName() === SNACK)?.mealId,
  };

  const getFoodListByMealId = (mealId) =>
    mealFoodList
      .filter((item) => item.mealId === mealId)
      .map((item) => {
        const food = foodList.find((food) => food.foodId === item.foodId);
        return food ? { ...food, mealFoodId: item.mealFoodId } : null;
      })
      .filter(Boolean); // Loại bỏ giá trị null nếu không tìm thấy food

  const getDishListByMealId = (mealId) =>
    mealDishList
      .filter((item) => item.mealId === mealId)
      .map((item) => {
        const dish = dishList.find((dish) => dish.dishId === item.dishId);
        return dish ? { ...dish, mealDishId: item.mealDishId } : null;
      })
      .filter(Boolean); // Loại bỏ giá trị null nếu không tìm thấy food

  const breakfastFoodList = getFoodListByMealId(mealIds.breakfast);
  const lunchFoodList = getFoodListByMealId(mealIds.lunch);
  const dinnerFoodList = getFoodListByMealId(mealIds.dinner);
  const snackFoodList = getFoodListByMealId(mealIds.snack);

  const breakfastDishList = getDishListByMealId(mealIds.breakfast);
  const lunchDishList = getDishListByMealId(mealIds.lunch);
  const dinnerDishList = getDishListByMealId(mealIds.dinner);
  const snackDishList = getDishListByMealId(mealIds.snack);

  const consumedCaloriesBreakfast =
    breakfastFoodList.reduce(
      (total, food) =>
        total +
        convertToNumber(
          (food.calories * food.servingSize) / DEFAULT_AVERAGE_NUTRITIONAL
        ),
      0
    ) +
    breakfastDishList.reduce(
      (total, dish) => total + convertToNumber(dish.calories),
      0
    );
  const consumedCaloriesLunch =
    lunchFoodList.reduce(
      (total, food) =>
        total +
        convertToNumber(
          (food.calories * food.servingSize) / DEFAULT_AVERAGE_NUTRITIONAL
        ),
      0
    ) +
    lunchDishList.reduce(
      (total, dish) => total + convertToNumber(dish.calories),
      0
    );
  const consumedCaloriesDinner =
    dinnerFoodList.reduce(
      (total, food) =>
        total +
        convertToNumber(
          (food.calories * food.servingSize) / DEFAULT_AVERAGE_NUTRITIONAL
        ),
      0
    ) +
    dinnerDishList.reduce(
      (total, dish) => total + convertToNumber(dish.calories),
      0
    );
  const consumedCaloriesSnack =
    snackFoodList.reduce(
      (total, food) =>
        total +
        convertToNumber(
          (food.calories * food.servingSize) / DEFAULT_AVERAGE_NUTRITIONAL
        ),
      0
    ) +
    snackDishList.reduce(
      (total, dish) => total + convertToNumber(dish.calories),
      0
    );
  function handleDeleteFoodItemFromMeal(food) {
    const { mealFoodId, nameFood } = food;
    function onConfirm() {
      appDispatch(appActions.deleteMealFoodById(mealFoodId));
      toast.show(`Delete ${nameFood} successfully!`, { type: "success" });
    }
    showConfirmationDialog(
      "Delete Item?",
      "Do you want to continue?",
      onConfirm
    );
  }

  function handleNavigateDetailFoodScreen(foodId) {
    navigation.navigate("DetailFoodScreen", {
      foodId,
      sourceScreen: route.name,
    });
  }

  function handleNavigateDetailDishScreen(dishId) {
    navigation.navigate("DetailDishScreen", {
      dishId,
      sourceScreen: route.name,
    });
  }

  function handleDeleteDishItemFromMeal(dish) {
    const { mealDishId, nameDish } = dish;
    function onConfirm() {
      appDispatch(appActions.deleteMealDishById(mealDishId));
      toast.show(`Delete ${nameDish} successfully!`, { type: "success" });
    }
    showConfirmationDialog(
      "Delete Item?",
      "Do you want to continue?",
      onConfirm
    );
  }
  function handleNavigateDetailMeal(title, mealId) {
    navigation.navigate("DetailMealScreen", { title, mealId });
  }

  return (
    <>
      {breakfastDishList.length > 0 || breakfastFoodList.length > 0 ? (
        <HeadingContainer
          title="Breakfast"
          consumedValue={consumedCaloriesBreakfast}
          targetValue={` /${targetCalories} kcal`}
          onPress={() =>
            handleNavigateDetailMeal("Breakfast", mealIds.breakfast)
          }
          style={{ marginTop: Spacing.SM }}
        />
      ) : null}
      <View style={styles.container}>
        {breakfastFoodList.map((item) => (
          <FoodItem
            key={item.mealFoodId}
            food={item}
            onDeleteFoodItem={handleDeleteFoodItemFromMeal}
            onNavigateScreen={handleNavigateDetailFoodScreen}
          />
        ))}
        {breakfastDishList.map((item) => (
          <DishItem
            key={item.mealDishId}
            dish={item}
            onDeleteDishItem={handleDeleteDishItemFromMeal}
            onNavigateDetailScreen={handleNavigateDetailDishScreen}
          />
        ))}
      </View>
      {lunchDishList.length > 0 || lunchFoodList.length > 0 ? (
        <HeadingContainer
          title="Lunch"
          consumedValue={consumedCaloriesLunch}
          targetValue={` /${targetCalories} kcal`}
          onPress={() => handleNavigateDetailMeal("Lunch", mealIds.lunch)}
          style={{ marginTop: Spacing.SM }}
        />
      ) : null}
      <View style={styles.container}>
        {lunchFoodList.map((item) => (
          <FoodItem
            key={item.mealFoodId}
            food={item}
            onDeleteFoodItem={handleDeleteFoodItemFromMeal}
            onNavigateScreen={handleNavigateDetailFoodScreen}
          />
        ))}
        {lunchDishList.map((item) => (
          <DishItem
            key={item.mealDishId}
            dish={item}
            onDeleteDishItem={handleDeleteDishItemFromMeal}
            onNavigateDetailScreen={handleNavigateDetailDishScreen}
          />
        ))}
      </View>
      {dinnerDishList.length > 0 || dinnerFoodList.length > 0 ? (
        <HeadingContainer
          title="Dinner"
          consumedValue={consumedCaloriesDinner}
          targetValue={` /${targetCalories} kcal`}
          onPress={() => handleNavigateDetailMeal("Dinner", mealIds.dinner)}
          style={{ marginTop: Spacing.SM }}
        />
      ) : null}

      <View style={styles.container}>
        {dinnerFoodList.map((item) => (
          <FoodItem
            key={item.mealFoodId}
            food={item}
            onDeleteFoodItem={handleDeleteFoodItemFromMeal}
            onNavigateScreen={handleNavigateDetailFoodScreen}
          />
        ))}
        {dinnerDishList.map((item) => (
          <DishItem
            key={item.mealDishId}
            dish={item}
            onDeleteDishItem={handleDeleteDishItemFromMeal}
            onNavigateDetailScreen={handleNavigateDetailDishScreen}
          />
        ))}
      </View>
      {snackDishList.length > 0 || snackFoodList.length > 0 ? (
        <HeadingContainer
          title="Snack"
          consumedValue={consumedCaloriesSnack}
          targetValue={` /${targetCalories} kcal`}
          onPress={() => handleNavigateDetailMeal("Snack", mealIds.snack)}
          style={{ marginTop: Spacing.SM }}
        />
      ) : null}

      <View style={styles.container}>
        {snackFoodList.map((item) => (
          <FoodItem
            key={item.mealFoodId}
            food={item}
            onDeleteFoodItem={handleDeleteFoodItemFromMeal}
            onNavigateScreen={handleNavigateDetailFoodScreen}
          />
        ))}
        {snackDishList.map((item) => (
          <DishItem
            key={item.mealDishId}
            dish={item}
            onDeleteDishItem={handleDeleteDishItemFromMeal}
            onNavigateDetailScreen={handleNavigateDetailDishScreen}
          />
        ))}
      </View>
    </>
  );
}

function FoodItem({ food, onNavigateScreen, onDeleteFoodItem }) {
  const {
    foodId = "1",
    nameFood = "test",
    measurement = "1",
    calories = 1,
    isFavorite = 1,
  } = food;
  const scaleFactor = food
    ? convertToNumber(food.servingSize / DEFAULT_AVERAGE_NUTRITIONAL)
    : 1;
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.itemContainer, { opacity: 0.5 }]
          : [styles.itemContainer]
      }
      onPress={() => onNavigateScreen(foodId)}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.favoriteHeading}>{nameFood || "test"}</Text>
        <Text style={styles.favoriteDescription}>
          1 {measurement} - {convertToNumber(calories * scaleFactor)} kcal
        </Text>
      </View>
      <View style={styles.itemRight}>
        {!!isFavorite && (
          <Ionicons
            name="heart"
            size={Sizes.SM * 1.2}
            color={colors.fieryRed}
            style={styles.favoriteIcon}
          />
        )}
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.pressableIcon, { opacity: 0.5 }]
              : [styles.pressableIcon]
          }
          onPress={() => onDeleteFoodItem(food)}
        >
          <Ionicons
            name="close-outline"
            size={Sizes.MD}
            color={colors.textColor}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}
function DishItem({ dish, onNavigateDetailScreen, onDeleteDishItem }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.itemContainer, { opacity: 0.5 }]
          : [styles.itemContainer]
      }
      onPress={() => onNavigateDetailScreen(dish.dishId)}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.favoriteHeading}>{dish?.nameDish || ""}</Text>
        <Text style={styles.favoriteDescription}>
          1 serving size - {dish?.calories || ""} kcal
        </Text>
      </View>
      <View style={styles.itemRight}>
        {!!dish.isFavorite && (
          <Ionicons
            name="heart"
            size={Sizes.SM * 1.2}
            color={colors.fieryRed}
            style={styles.favoriteIcon}
          />
        )}
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.pressableIcon, { opacity: 0.5 }]
              : [styles.pressableIcon]
          }
          onPress={() => onDeleteDishItem(dish)}
        >
          <Ionicons name="close-outline" size={Sizes.MD} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    marginVertical: Spacing.XS,
    paddingVertical: Spacing.MD,
    paddingHorizontal: Spacing.LG,
    borderRadius: Spacing.SM,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  itemLeft: {
    width: "60%",
    gap: 5,
  },
  favoriteHeading: {
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
  favoriteDescription: {
    fontSize: Typography.SM,
    color: colors.descriptionTextColor,
  },
  itemRight: {
    flexDirection: "row",
    gap: Spacing.MD,
  },
  pressableIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.XXS * 2,
    borderRadius: 999,
  },
  favoriteIcon: {
    alignSelf: "flex-end",
  },
});
