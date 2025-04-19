import {
  ADD_SELECTED_FOOD_TO_DISH,
  REMOVE_ALL_SELECTED_FOODS_FROM_DISH,
  REMOVE_SELECTED_FOOD_FROM_DISH,
  RESET_DISH_STATE,
  SET_DISH_NAME,
} from "./constants";
// const selectedFood = {
//   foodId:"",
//   selectedFoodId: ""
// }
const initialState = {
  nameDish: "",
  calories: "",
  carbs: "",
  protein: "",
  fat: "",
  selectedFoodList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_SELECTED_FOOD_TO_DISH: {
      return {
        ...state,
        selectedFoodList: [...state.selectedFoodList, action.payload],
      };
    }
    case REMOVE_SELECTED_FOOD_FROM_DISH: {
      const updatedFoodList = state.selectedFoodList.filter(
        (food) => food.selectedFoodId !== action.payload.selectedFoodId
      );
      return { ...state, selectedFoodList: updatedFoodList };
    }
    case SET_DISH_NAME: {
      return { ...state, nameDish: action.payload };
    }
    case RESET_DISH_STATE: {
      return {
        ...initialState,
      };
    }
    case REMOVE_ALL_SELECTED_FOODS_FROM_DISH: {
      return { ...state, selectedFoodList: [] };
    }
    default:
      return state;
  }
}

export { initialState, reducer };
