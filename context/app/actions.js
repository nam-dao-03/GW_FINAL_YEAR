import {
  CREATE_DAILY_NUTRITION,
  CREATE_MEAL,
  CREATE_USER,
  CREATE_WATER_INTAKE,
  UPDATE_WATER_INTAKE,
} from "./constants";

function createUser(user) {
  return {
    type: CREATE_USER,
    payload: user,
  };
}

function createDailyNutrition(dailyNutrition) {
  return {
    type: CREATE_DAILY_NUTRITION,
    payload: dailyNutrition,
  };
}

function createWaterIntake(waterIntake) {
  return {
    type: CREATE_WATER_INTAKE,
    payload: waterIntake,
  };
}

function updateWaterIntake(waterIntake) {
  return {
    type: UPDATE_WATER_INTAKE,
    payload: waterIntake,
  };
}

export {
  createUser,
  createDailyNutrition,
  createWaterIntake,
  updateWaterIntake,
};
