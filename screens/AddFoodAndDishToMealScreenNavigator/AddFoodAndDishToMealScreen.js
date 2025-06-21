import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  SectionList,
} from "react-native";
import SearchBar from "../../components/shared/SearchBar";
import DropdownActions from "../../components/AddFoodAndDishToMealScreen/DropdownActions";
import useAppContext from "../../hooks/useAppContext";
import Spacing from "../../utils/Spacing";
import FoodItem from "../../components/AddFoodAndDishToMealScreen/FoodItem";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import DishItem from "../../components/AddFoodAndDishToMealScreen/DishItem";
import { useCallback, useState, useMemo } from "react";
import { appActions } from "../../context/app";
import {
  generateRandomString,
  showConfirmationDialog,
} from "../../utils/Common";
import { useToast } from "react-native-toast-notifications";
import { BREAKFAST, DINNER, LUNCH, SNACK } from "../../utils/constants";
import { getLocalDate } from "../../utils/Date";
import { MealFood } from "../../database/entities/MealFood";
import { MealDish } from "../../database/entities/MealDish";
import KeyboardAvoidingWrapper from "../../components/shared/KeyboardAvoidingWrapper";
import EmptySection from "../../components/shared/EmptySection";

export default function AddFoodAndDishToMealScreen({ navigation, route }) {
  const toast = useToast();
  const [appState, appDispatch] = useAppContext();
  const { foodList, dishList, dishFoodList, mealList, selectedDay } = appState;
  const [searchValue, setSearchValue] = useState("");
  const [dropdown, setDropdown] = useState({
    meal: "",
    foodDishOption: "FoodAndDish",
  });
  const { mealName } = route.params;
  const mealListToday = mealList.filter(
    (meal) => meal.getDate() === selectedDay
  );
  // Sắp xếp yêu thích lên đầu nhưng giữ nguyên nhóm
  function sortFavoritesFirst(list) {
    const favoriteItems = list.filter((item) => item.isFavorite);
    const createdByUserItems = list.filter(
      (item) => item.isCreatedByUser && !item.isFavorite
    );
    const otherItems = list.filter(
      (item) => !item.isFavorite && !item.isCreatedByUser
    );

    const searchFilter = (item) =>
      searchValue === "" ||
      item.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nameFood?.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.nameDish?.toLowerCase().includes(searchValue.toLowerCase());

    const filteredFavoriteItems = favoriteItems.filter(searchFilter);
    const filteredCreatedByUserItems = createdByUserItems.filter(searchFilter);
    const filteredOtherItems = otherItems.filter(searchFilter);

    return [
      ...filteredFavoriteItems,
      ...filteredCreatedByUserItems,
      ...filteredOtherItems,
    ];
  }
  const sections = useMemo(() => {
    if (!Array.isArray(foodList) || !Array.isArray(dishList)) return [];

    switch (dropdown.foodDishOption) {
      case "FoodAndDish":
        return [
          { title: "Food List", data: sortFavoritesFirst(foodList) },
          { title: "Dish List", data: sortFavoritesFirst(dishList) },
        ];
      case "FoodList":
        return [{ title: "Food List", data: sortFavoritesFirst(foodList) }];
      case "DishList":
        return [{ title: "Dish List", data: sortFavoritesFirst(dishList) }];
      default:
        return [];
    }
  }, [foodList, dishList, dropdown, searchValue]);

  function changeDropdownMeal(meal) {
    setDropdown((prev) => ({ ...prev, meal }));
  }

  function changeDropdownFoodDishOption(foodDishOption) {
    setDropdown((prev) => ({ ...prev, foodDishOption }));
  }

  function navigateDetailsFoodScreen(foodId) {
    navigation.navigate("DetailFoodScreen", {
      foodId,
      mealName: dropdown.meal || mealName,
      sourceScreen: route.name,
    });
  }

  function navigateDetailsDishScreen(dishId) {
    navigation.navigate("DetailDishScreen", {
      dishId,
      mealName: dropdown.meal || mealName,
      sourceScreen: route.name,
    });
  }

  function handleDeleteFoodItem(food) {
    const { foodId, nameFood } = food;
    function onConfirm() {
      const dishFood = dishFoodList.find(
        (dishFood) => dishFood.foodId === foodId
      );
      const isDishInFood = dishFood !== undefined;
      if (isDishInFood) {
        const dish = dishList.find((dish) => dish.dishId === dishFood.dishId);
        toast.show(`${nameFood} in ${dish?.nameDish || ""} Dish!`, {
          type: "danger",
        });
        return;
      }
      appDispatch(appActions.deleteFoodById(foodId));
      toast.show(`Delete ${nameFood} successfully!`, { type: "success" });
    }
    showConfirmationDialog(
      "Delete Item?",
      "Do you want to continue?",
      onConfirm
    );
  }

  function handleDeleteDishItem(dish) {
    const { dishId, name } = dish;
    function onConfirm() {
      appDispatch(appActions.deleteDishById(dishId));
      dishFoodList.forEach((dishFood) => {
        if (dishFood.getDishId() === dishId)
          appDispatch(appActions.deleteDishFoodById(dishFood.getDishFoodId()));
      });
      toast.show(`Delete ${name} successfully!`, { type: "success" });
    }
    showConfirmationDialog(
      "Delete Item?",
      "Do you want to continue?",
      onConfirm
    );
  }
  function handleAddFoodToMeal(food) {
    const { nameFood, foodId } = food;
    const mealFoodId = generateRandomString();
    const mealTitle = dropdown.meal || mealName; // vì state ban đầu là "" nên nếu trường hợp người dùng chưa chọn meal thì sẽ mặc định là breakfast
    const mealObj = mealListToday.find((meal) => meal.getName() === mealTitle);
    const { mealId, nameMeal } = mealObj;
    const mealFood = new MealFood(mealFoodId, mealId, foodId);
    appDispatch(appActions.createMealFood(mealFood));
    toast.show(`Added ${nameFood} to ${nameMeal}!`, { type: "success" });
  }

  function handleAddDishToMeal(dish) {
    const { nameDish, dishId } = dish;
    const mealDishId = generateRandomString();
    const mealTitle = dropdown.meal || mealName; // vì state ban đầu là "" nên nếu trường hợp người dùng chưa chọn meal thì sẽ mặc định là breakfast
    const mealObj = mealListToday.find((meal) => meal.getName() === mealTitle);
    const { mealId, nameMeal } = mealObj;
    const mealDish = new MealDish(mealDishId, mealId, dishId);
    appDispatch(appActions.createMealDish(mealDish));
    toast.show(`Added ${nameDish} to ${nameMeal}!`, { type: "success" });
  }

  const renderItem = useCallback(
    ({ item, section }) => {
      return section.title === "Food List" ? (
        <FoodItem
          food={item}
          onNavigateScreen={navigateDetailsFoodScreen}
          onDeleteFoodItem={handleDeleteFoodItem}
          onAddFoodToMeal={handleAddFoodToMeal}
        />
      ) : (
        <DishItem
          dish={item}
          onNavigateScreen={navigateDetailsDishScreen}
          onDeleteDishItem={handleDeleteDishItem}
          onAddDishToMeal={handleAddDishToMeal}
        />
      );
    },
    [foodList, dishList, dropdown]
  );

  const headerFlatList = (title) => (
    <View style={styles.headerFlatList}>
      <Text style={styles.headerFlatListText}>{title}</Text>
    </View>
  );
  function handleChangeSearchText(value) {
    setSearchValue(value);
  }
  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <SearchBar navigation={navigation} onSearch={handleChangeSearchText} />
        <DropdownActions
          defaultValueMeal={mealName}
          defaultValueFoodDish="FoodAndDish"
          onChangeMeal={changeDropdownMeal}
          onChangeFoodDishOption={changeDropdownFoodDishOption}
        />
        {sections.length === 0 ? (
          <EmptySection description="Empty List" />
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.getDishId?.() || item.getFoodId?.()}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title } }) =>
              headerFlatList(title)
            }
            style={styles.sectionList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Spacing.BIG_70 }}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  headerFlatList: {
    paddingTop: Spacing.SM,
  },
  headerFlatListText: {
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
  sectionList: {
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
    flex: 1,
  },
});
