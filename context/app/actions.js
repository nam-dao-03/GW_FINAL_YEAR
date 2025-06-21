import { createCupDrunkInstance } from "../../database/entities/CupDrunk";
import { createDailyNutritionInstance } from "../../database/entities/DailyNutrition";
import { createDishInstance } from "../../database/entities/Dish";
import { createDishFoodInstance } from "../../database/entities/DishFood";
import { createFoodInstance } from "../../database/entities/Food";
import { createMealInstance } from "../../database/entities/Meal";
import { createMealDishInstance } from "../../database/entities/MealDish";
import { createMealFoodInstance } from "../../database/entities/MealFood";
import { createUserInstance } from "../../database/entities/User";
import { createWaterIntakeInstance } from "../../database/entities/WaterIntake";
import { createWorkoutInstance } from "../../database/entities/Workout";
import {
  CREATE_CUP_DRUNK,
  CREATE_CUP_DRUNK_LIST,
  CREATE_DAILY_NUTRITION,
  UPDATE_DAILY_NUTRITION,
  CREATE_FOOD,
  CREATE_MEAL,
  CREATE_USER,
  UPDATE_USER,
  CREATE_WATER_INTAKE,
  DELETE_CUP_DRUNK,
  DELETE_FOOD,
  UPDATE_CUP_DRUNK,
  UPDATE_WATER_INTAKE,
  UPDATE_FOOD,
  CREATE_DISH,
  CREATE_DISH_FOOD,
  DELETE_DISH,
  DELETE_DISH_FOOD,
  UPDATE_DISH,
  UPDATE_DISH_FOOD,
  SET_TRUE_SHOW_FAB,
  SET_FALSE_SHOW_FAB,
  CREATE_MEAL_FOOD,
  DELETE_MEAL_FOOD,
  CREATE_MEAL_DISH,
  DELETE_MEAL_DISH,
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
  CREATE_WATER_REMINDER_NOTIFICATION,
  CREATE_WATER_REMINDER_NOTIFICATION_LIST,
  DELETE_WATER_REMINDER_NOTIFICATION,
  DELETE_WATER_REMINDER_NOTIFICATION_LIST,
  SET_SELECTED_DAY,
  DELETE_ALL_DATA,
} from "./constants";

function setSelectedDay(selectedDay) {
  return {
    type: SET_SELECTED_DAY,
    payload: selectedDay,
  };
}

function createUser(user) {
  return {
    type: CREATE_USER,
    payload: createUserInstance(user),
  };
}

function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: createUserInstance(user),
  };
}

function createWaterReminderNotification(waterReminderNotification) {
  return {
    type: CREATE_WATER_REMINDER_NOTIFICATION,
    payload: waterReminderNotification,
  };
}

function createWaterReminderNotificationList(list) {
  return {
    type: CREATE_WATER_REMINDER_NOTIFICATION_LIST,
    payload: list,
  };
}

function deleteWaterReminderNotificationById(waterReminderNotificationId) {
  return {
    type: DELETE_WATER_REMINDER_NOTIFICATION,
    payload: waterReminderNotificationId,
  };
}

function deleteWaterReminderNotificationList() {
  return {
    type: DELETE_WATER_REMINDER_NOTIFICATION_LIST,
  };
}

function createDailyNutrition(dailyNutrition) {
  return {
    type: CREATE_DAILY_NUTRITION,
    payload: createDailyNutritionInstance(dailyNutrition),
  };
}

function updateDailyNutrition(dailyNutrition) {
  return {
    type: UPDATE_DAILY_NUTRITION,
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

//Workout

function createWorkout(workout) {
  return {
    type: CREATE_WORKOUT,
    payload: createWorkoutInstance(workout),
  };
}

function deleteWorkoutById(workoutId) {
  return {
    type: DELETE_WORKOUT,
    payload: workoutId,
  };
}

function updateWorkout(workout) {
  return {
    type: UPDATE_WORKOUT,
    payload: createWorkoutInstance(workout),
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

function createDish(dish) {
  return {
    type: CREATE_DISH,
    payload: createDishInstance(dish),
  };
}

function deleteDishById(dishId) {
  return {
    type: DELETE_DISH,
    payload: dishId,
  };
}

function updateDish(dish) {
  return {
    type: UPDATE_DISH,
    payload: createDishInstance(dish),
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

//DishFood
function createDishFood(dishFood) {
  return {
    type: CREATE_DISH_FOOD,
    payload: createDishFoodInstance(dishFood),
  };
}

function deleteDishFoodById(dishFoodId) {
  return {
    type: DELETE_DISH_FOOD,
    payload: dishFoodId,
  };
}

//Meal
function createMeal(meal) {
  return {
    type: CREATE_MEAL,
    payload: createMealInstance(meal),
  };
}

//MealFood
function createMealFood(mealFood) {
  return {
    type: CREATE_MEAL_FOOD,
    payload: createMealFoodInstance(mealFood),
  };
}

function deleteMealFoodById(mealFoodId) {
  return {
    type: DELETE_MEAL_FOOD,
    payload: mealFoodId,
  };
}

//MealDish

function createMealDish(mealDish) {
  return {
    type: CREATE_MEAL_DISH,
    payload: createMealDishInstance(mealDish),
  };
}

function deleteMealDishById(mealDishId) {
  return {
    type: DELETE_MEAL_DISH,
    payload: mealDishId,
  };
}

//Show FAB
function setTrueShowFAB() {
  return {
    type: SET_TRUE_SHOW_FAB,
    payload: true,
  };
}

function setFalseShowFAB() {
  return {
    type: SET_FALSE_SHOW_FAB,
    payload: false,
  };
}

//DELETE_ALL_DATA

function deleteAllData() {
  return {
    type: DELETE_ALL_DATA,
  };
}

export {
  setSelectedDay,
  createUser,
  updateUser,
  createWaterReminderNotification,
  createWaterReminderNotificationList,
  deleteWaterReminderNotificationById,
  deleteWaterReminderNotificationList,
  createDailyNutrition,
  updateDailyNutrition,
  createWaterIntake,
  updateWaterIntake,
  createCupDrunk,
  updateCupDrunk,
  deleteCupDrunkById,
  createDish,
  deleteDishById,
  updateDish,
  createFood,
  deleteFoodById,
  updateFood,
  createDishFood,
  deleteDishFoodById,
  createMeal,
  createMealFood,
  deleteMealFoodById,
  createMealDish,
  deleteMealDishById,
  setTrueShowFAB,
  setFalseShowFAB,
  createWorkout,
  updateWorkout,
  deleteWorkoutById,
  deleteAllData,
};
