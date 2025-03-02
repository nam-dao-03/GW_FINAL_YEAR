import { createCupDrunkInstance } from "../../database/entities/CupDrunk";
import { createDailyNutritionInstance } from "../../database/entities/DailyNutrition";
import { createUserInstance } from "../../database/entities/User";
import { createWaterIntakeInstance } from "../../database/entities/WaterIntake";
import {
  CREATE_CUP_DRUNK,
  CREATE_CUP_DRUNK_LIST,
  CREATE_DAILY_NUTRITION,
  CREATE_MEAL,
  CREATE_USER,
  CREATE_WATER_INTAKE,
  DELETE_CUP_DRUNK,
  UPDATE_CUP_DRUNK,
  UPDATE_WATER_INTAKE,
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
function createCupDrunkList(cupDrunkList) {
  return {
    type: CREATE_CUP_DRUNK_LIST,
    payload: cupDrunkList.map((item) => createCupDrunkInstance(item)),
  };
}
function deleteCupDrunkById(cupDrunkId) {
  return {
    type: DELETE_CUP_DRUNK,
    payload: cupDrunkId,
  };
}

function updateCupDrinkList(cupDrunkList) {}

function updateCupDrunk(cupDrunk) {
  return {
    type: UPDATE_CUP_DRUNK,
    payload: createCupDrunkInstance(cupDrunk),
  };
}

export {
  createUser,
  createDailyNutrition,
  createWaterIntake,
  updateWaterIntake,
  createCupDrunk,
  updateCupDrunk,
  createCupDrunkList,
  deleteCupDrunkById,
};
