import { useNavigation, useRoute } from "@react-navigation/native";
export default function useDishActions(sourceScreen) {
  const navigation = useNavigation();
  const route = useRoute();
  switch (sourceScreen) {
    case "AddFoodAndDishToMealScreen": {
      const titleButton = "Add to meal";
      const isDisableEdit = true;
      function handleNavigateDetailFoodScreen(foodId) {
        navigation.navigate("DetailFoodScreen", {
          foodId,
          sourceScreen: route.name,
          isDisableEditFoodFromDish: false,
        });
      }
      return { titleButton, handleNavigateDetailFoodScreen, isDisableEdit };
    }
    case "DishScreen": {
      const titleButton = "Add to meal";
      const isDisableEdit = false;
      function handleNavigateDetailFoodScreen(foodId) {
        navigation.navigate("DetailFoodScreen", {
          foodId,
          sourceScreen: route.name,
          isDisableEditFoodFromDish: false,
        });
      }
      return { titleButton, handleNavigateDetailFoodScreen, isDisableEdit };
    }
    case "DashboardScreen": {
      const titleButton = "Edit Dish to Meal";
      const isDisableEdit = true;
      function handleNavigateDetailFoodScreen(foodId) {
        navigation.navigate("DetailFoodScreen", {
          foodId,
          sourceScreen: route.name,
          isDisableEditFoodFromDish: true,
        });
      }
      return { titleButton, handleNavigateDetailFoodScreen, isDisableEdit };
    }
    default: {
      const titleButton = "Hello";
      return { titleButton };
    }
  }
}
