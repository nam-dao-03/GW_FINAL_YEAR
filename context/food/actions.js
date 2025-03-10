import {
  SET_NAME_FOOD,
  SET_CALORIES,
  SET_PROTEIN,
  SET_CARBS,
  SET_FAT,
  SET_AVERAGE_NUTRITIONAL,
  SET_SERVING_SIZE,
  SET_MEASUREMENT,
  SET_UNIT,
  UPDATE_FOOD_STATE,
} from "./constants";

function changeAverageNutritional(payload) {
  return { type: SET_AVERAGE_NUTRITIONAL, payload };
}

function changeServingSize(payload) {
  return { type: SET_SERVING_SIZE, payload };
}

function changeMeasurementInput(payload) {
  return { type: SET_MEASUREMENT, payload };
}

function changeNameFoodInput(payload) {
  return { type: SET_NAME_FOOD, payload };
}

function changeCaloriesInput(payload) {
  return { type: SET_CALORIES, payload };
}

function changeProteinInput(payload) {
  return { type: SET_PROTEIN, payload };
}

function changeCarbsInput(payload) {
  return { type: SET_CARBS, payload };
}

function changeFatInput(payload) {
  return { type: SET_FAT, payload };
}

function changeUnitInput(payload) {
  return { type: SET_UNIT, payload };
}

function setFoodState(payload) {
  return { type: UPDATE_FOOD_STATE, payload };
}

export {
  changeNameFoodInput,
  changeCaloriesInput,
  changeProteinInput,
  changeCarbsInput,
  changeFatInput,
  changeAverageNutritional,
  changeServingSize,
  changeMeasurementInput,
  changeUnitInput,
  setFoodState,
};
