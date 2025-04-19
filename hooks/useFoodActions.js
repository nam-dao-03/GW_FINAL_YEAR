export default function useFoodActions(sourceScreen) {
  switch (sourceScreen) {
    case "FoodScreen": {
      const titleButton = "Add to Meal";
      const isDisableEdit = false;
      return { titleButton, isDisableEdit };
    }
    case "SelectFoodForDishScreen": {
      const titleButton = null;
      const isDisableEdit = false;
      return { titleButton, isDisableEdit };
    }
    case "AddDishScreen": {
      const titleButton = null;
      const isDisableEdit = false;
      return { titleButton, isDisableEdit };
    }
    case "DetailDishScreen": {
      const titleButton = null;
      const isDisableEdit = false;
      return { titleButton, isDisableEdit };
    }
    case "AddFoodAndDishToMealScreen": {
      const titleButton = "Add to Meal";
      const isDisableEdit = true;
      return { titleButton, isDisableEdit };
    }
    case "DashboardScreen": {
      const titleButton = null;
      const isDisableEdit = true;
      return { titleButton, isDisableEdit };
    }
    default: {
      const titleButton = null;
      const isDisableEdit = true;
      return { titleButton, isDisableEdit };
    }
  }
}

// đây là những màn hình dùng chung DetaiFoodScreen, mỗi navigation của nó đều có đối tượng Stack.Screen riêng còn component thì dùng chung trừ FoodScreen là trỏ tới DetailFoodScreen trong FoodScreenNavigator
