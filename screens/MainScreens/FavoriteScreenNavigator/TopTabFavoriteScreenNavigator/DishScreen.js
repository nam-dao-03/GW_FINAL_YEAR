import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import KnowledgeSection from "../../../../components/shared/KnowledgeSection";
import Spacing from "../../../../utils/Spacing";
import colors from "../../../../utils/Colors";
import useAppContext from "../../../../hooks/useAppContext";
import FavoriteDishItem from "../../../../components/DishScreen/FavoriteDishItem";
import { showConfirmationDialog } from "../../../../utils/Common";
import { appActions } from "../../../../context/app";
import { useToast } from "react-native-toast-notifications";
import BottomExtraPaddingScreen from "../../../../components/shared/BottomExtraPaddingScreen";
import AddDishToMealModal from "../../../../components/shared/AddDishToMealModal";
import { useState } from "react";

export default function DishScreen({ navigation, route }) {
  const toast = useToast();
  const [appState, appDispatch] = useAppContext();
  const [isModalAddMenuItemVisible, setIsModalAddMenuItemVisible] =
    useState(false);
  const { dishList, dishFoodList, mealList, mealDishList } = appState;
  const [dish, setDish] = useState(null);
  const favoriteDishList = dishList.filter(
    (dish) => dish.isFavorite || dish.isCreatedByUser
  );

  const isFavoriteDishListEmpty = !dishList.some(
    (dish) => dish.isFavorite || dish.isCreatedByUser
  );

  function handleOpenAddFoodToMealModal(dish) {
    setIsModalAddMenuItemVisible(true);
    setDish(dish);
  }

  function handleRenderDishItem({ item }) {
    return (
      <FavoriteDishItem
        dish={item}
        onDeleteDishItem={handleDeleteDishItem}
        onNavigateDetailScreen={handleNavigateDetailScreen}
        onOpenAddDishToMealModal={handleOpenAddFoodToMealModal}
      />
    );
  }
  function handleNavigateDetailScreen(dishId) {
    navigation
      .getParent("FavoriteScreenNavigator")
      .navigate("DishScreenNavigator", {
        screen: "DetailDishScreen",
        params: { dishId, sourceScreen: route.name },
      });
  }

  function handleDeleteDishItem(dish) {
    const { dishId, nameDish } = dish;
    function onConfirm() {
      const mealDish = mealDishList.find((item) => item.dishId);
      if (mealDish) {
        const meal = mealList.find((item) => item.mealId === mealDish.mealId);
        toast.show(`${nameDish} in ${meal?.nameMeal || ""} Dish!`, {
          type: "danger",
        });
        return;
      }

      appDispatch(appActions.deleteDishById(dishId));
      dishFoodList.forEach((dishFood) => {
        if (dishFood.getDishId() === dishId)
          appDispatch(appActions.deleteDishFoodById(dishFood.getDishFoodId()));
      });
      toast.show(`Delete ${nameDish} successfully!`, { type: "success" });
    }
    showConfirmationDialog(
      "Delete Item?",
      "Do you want to continue?",
      onConfirm
    );
  }

  return isFavoriteDishListEmpty ? (
    <ScrollView style={styles.screenContainer}>
      <KnowledgeSection />
      <BottomExtraPaddingScreen />
    </ScrollView>
  ) : (
    <>
      <FlatList
        data={favoriteDishList}
        keyExtractor={(item) => item.getDishId()}
        renderItem={handleRenderDishItem}
        style={styles.flatList}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Spacing.BIG_70,
        }}
        ListHeaderComponentStyle={{ zIndex: 10 }}
        keyboardShouldPersistTaps="handled"
      />
      {dish && (
        <AddDishToMealModal
          isVisible={isModalAddMenuItemVisible}
          dish={dish}
          onBackdropPress={setIsModalAddMenuItemVisible}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: Spacing.SM,
    paddingVertical: Spacing.XL,
    backgroundColor: colors.backgroundColorScreen,
    paddingBottom: Spacing.BIG_40,
  },
  flatList: {
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
    paddingVertical: Spacing.MD,
  },
});
