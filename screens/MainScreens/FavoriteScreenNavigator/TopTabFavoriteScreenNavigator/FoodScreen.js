import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

import Spacing from "../../../../utils/Spacing";
import { appActions } from "../../../../context/app";
import { showConfirmationDialog } from "../../../../utils/Common";

import colors from "../../../../utils/Colors";
import FavoriteFoodItem from "../../../../components/FoodScreen/FavoriteFoodItem";
import useAppContext from "../../../../hooks/useAppContext";
import { useToast } from "react-native-toast-notifications";
import { useState } from "react";
import AddFoodToMealModal from "../../../../components/shared/AddFoodToMealModal";

export default function FoodScreen({ navigation, route }) {
  const toast = useToast();
  const [state, dispatch] = useAppContext();
  const { foodList, dishFoodList, dishList, mealFoodList, mealList } = state;
  const [food, setFood] = useState(null);
  const [isAddFoodToMealModalVisible, setIsAddFoodToMealModalVisible] =
    useState(false);
  const favoriteFoodList = foodList.filter(
    (food) => food.isFavorite || food.isCreatedByUser
  );

  function handleDeleteFoodItem(food) {
    const { foodId, nameFood } = food;
    function onConfirm() {
      const dishFood = dishFoodList.find(
        (dishFood) => dishFood.foodId === foodId
      );
      const foodMeal = mealFoodList.find((item) => item.foodId === foodId);
      if (dishFood) {
        const dish = dishList.find((dish) => dish.dishId === dishFood.dishId);
        toast.show(`${nameFood} in ${dish?.nameDish || ""} Dish!`, {
          type: "danger",
        });
        return;
      }
      if (foodMeal) {
        const meal = mealList.find((meal) => meal.mealId === foodMeal.mealId);
        toast.show(`${nameFood} in ${meal?.nameMeal || ""}!`, {
          type: "danger",
        });
        return;
      }
      dispatch(appActions.deleteFoodById(foodId));
      toast.show(`Delete ${nameFood} successfully!`, { type: "success" });
    }
    showConfirmationDialog(
      "Delete Item?",
      "Do you want to continue?",
      onConfirm
    );
  }

  function handleNavigateDetailScreen(foodId) {
    navigation
      .getParent("FavoriteScreenNavigator")
      .navigate("FoodScreenNavigator", {
        screen: "DetailFoodScreen",
        params: { foodId, sourceScreen: route.name },
      });
  }

  function handleOpenAddFoodToMealModal(food) {
    setIsAddFoodToMealModalVisible(true);
    setFood(food);
  }

  function renderFoodItemList({ item }) {
    return (
      <FavoriteFoodItem
        food={item}
        onDeleteFoodItem={handleDeleteFoodItem}
        onNavigateDetailScreen={handleNavigateDetailScreen}
        onOpenAddFoodToMealModal={handleOpenAddFoodToMealModal}
      />
    );
  }
  return (
    <>
      <FlatList
        data={favoriteFoodList}
        keyExtractor={(item) => item.getFoodId()}
        renderItem={renderFoodItemList}
        style={styles.flatList}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Spacing.XL }}
        ListHeaderComponentStyle={{ zIndex: 10 }}
        keyboardShouldPersistTaps="handled"
      />
      {food && (
        <AddFoodToMealModal
          isVisible={isAddFoodToMealModalVisible}
          food={food}
          onBackdropPress={setIsAddFoodToMealModalVisible}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: Spacing.SM,
    paddingVertical: Spacing.MD,
    backgroundColor: colors.backgroundColorScreen,
  },
});
