import { createCupDrunkInstance } from "../../database/entities/CupDrunk";
import { createDailyNutritionInstance } from "../../database/entities/DailyNutrition";
import { createFoodInstance } from "../../database/entities/Food";
import { createUserInstance } from "../../database/entities/User";
import { createWaterIntakeInstance } from "../../database/entities/WaterIntake";
import {
  CREATE_CUP_DRUNK,
  CREATE_CUP_DRUNK_LIST,
  CREATE_DAILY_NUTRITION,
  CREATE_FOOD,
  CREATE_MEAL,
  CREATE_USER,
  CREATE_WATER_INTAKE,
  DELETE_CUP_DRUNK,
  DELETE_FOOD,
  UPDATE_CUP_DRUNK,
  UPDATE_WATER_INTAKE,
  UPDATE_FOOD,
} from "./constants";

function createUser(user) {
  return {
    type: CREATE_USER,
    payload: createUserInstance(user),
  };
}

function createDailyNutrition(dailyNutrition) {
  return {
    type: CREATE_DAILY_NUTRITION,
    payload: createDailyNutritionInstance(dailyNutrition),
  };
}

function createWaterIntake(waterIntake) {
  return {
    type: CREATE_WATER_INTAKE,
    payload: createWaterIntakeInstance(waterIntake),
  };
}

function updateWaterIntake(waterIntake) {
  return {
    type: UPDATE_WATER_INTAKE,
    payload: createWaterIntakeInstance(waterIntake),
  };
}

function createCupDrunk(cupDrunk) {
  return {
    type: CREATE_CUP_DRUNK,
    payload: createCupDrunkInstance(cupDrunk),
  };
}

function deleteCupDrunkById(cupDrunkId) {
  return {
    type: DELETE_CUP_DRUNK,
    payload: cupDrunkId,
  };
}

function updateCupDrunk(cupDrunk) {
  return {
    type: UPDATE_CUP_DRUNK,
    payload: createCupDrunkInstance(cupDrunk),
  };
}

//Food

function createFood(food) {
  return {
    type: CREATE_FOOD,
    payload: createFoodInstance(food),
  };
}

function deleteFoodById(foodId) {
  return {
    type: DELETE_FOOD,
    payload: foodId,
  };
}

function updateFood(food) {
  return {
    type: UPDATE_FOOD,
    payload: createFoodInstance(food),
  };
}

export {
  createUser,
  createDailyNutrition,
  createWaterIntake,
  updateWaterIntake,
  createCupDrunk,
  updateCupDrunk,
  deleteCupDrunkById,
  createFood,
  deleteFoodById,
  updateFood,
};
