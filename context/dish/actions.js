import {
  ADD_SELECTED_FOOD_TO_DISH,
  REMOVE_ALL_SELECTED_FOODS_FROM_DISH,
  REMOVE_SELECTED_FOOD_FROM_DISH,
  RESET_DISH_STATE,
  SET_DISH_NAME,
} from "./constants";

function addFoodToDish(selectedFood) {
  return {
    type: ADD_SELECTED_FOOD_TO_DISH,
    payload: selectedFood,
  };
}

function removeFoodFromDish(selectedFood) {
  return {
    type: REMOVE_SELECTED_FOOD_FROM_DISH,
    payload: selectedFood,
  };
}

function setDishName(dish) {
  return {
    type: SET_DISH_NAME,
    payload: dish,
  };
}

function removeAllFoodFromDish() {
  return {
    type: REMOVE_ALL_SELECTED_FOODS_FROM_DISH,
  };
}

function resetDish() {
  return {
    type: RESET_DISH_STATE,
  };
}

export {
  addFoodToDish,
  removeFoodFromDish,
  setDishName,
  resetDish,
  removeAllFoodFromDish,
};
