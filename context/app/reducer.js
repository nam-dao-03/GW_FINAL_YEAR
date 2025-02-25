import {
  getAllDataFormTable,
  setUpDatabase,
  createDailyNutrition,
  createUser,
  createWaterIntake,
  updateWaterIntake,
} from "../../database/databaseHelper";
import { User } from "../../database/entities/User";
import { WaterIntake } from "../../database/entities/WaterIntake";
import { Meal } from "../../database/entities/Meal";
import { Dish } from "../../database/entities/Dish";
import { Food } from "../../database/entities/Food";
import { Workout } from "../../database/entities/Workout";
import { DailyNutrition } from "../../database/entities/DailyNutrition";
import {
  CREATE_DAILY_NUTRITION,
  CREATE_MEAL,
  CREATE_USER,
  CREATE_WATER_INTAKE,
  UPDATE_WATER_INTAKE,
} from "./constants";
import * as SQLite from "expo-sqlite";
// console.log(SQLite.deleteDatabaseSync("nutrition-app"));
const db = setUpDatabase();
// console.log(db);
const userList = getAllDataFormTable(db, User.TABLE_NAME).map((item) =>
  Object.assign(new User(), item)
);
const waterIntakeList = getAllDataFormTable(db, WaterIntake.TABLE_NAME).map(
  (item) => Object.assign(new WaterIntake(), item)
);
const mealList = getAllDataFormTable(db, Meal.TABLE_NAME).map((item) =>
  Object.assign(new Meal(), item)
);
const dishList = getAllDataFormTable(db, Dish.TABLE_NAME).map((item) =>
  Object.assign(new Dish(), item)
);
const foodList = getAllDataFormTable(db, Food.TABLE_NAME).map((item) =>
  Object.assign(new Food(), item)
);
const workoutList = getAllDataFormTable(db, Workout.TABLE_NAME).map((item) =>
  Object.assign(new Workout(), item)
);
const dailyNutritionList = getAllDataFormTable(
  db,
  DailyNutrition.TABLE_NAME
).map((item) => Object.assign(new DailyNutrition(), item));
const initialState = {
  userList,
  waterIntakeList,
  mealList,
  dishList,
  foodList,
  workoutList,
  dailyNutritionList,
};

console.log("reducer", initialState);

function reducer(state, action) {
  switch (action.type) {
    case CREATE_USER: {
      //db
      createUser(db, action.payload);
      return {
        ...state,
        userList: [...state.userList, action.payload],
      };
    }
    case CREATE_DAILY_NUTRITION:
      //db
      createDailyNutrition(db, action.payload);
      return {
        ...state,
        dailyNutritionList: [...state.dailyNutritionList, action.payload],
      };
    case CREATE_WATER_INTAKE: {
      //db
      createWaterIntake(db, action.payload);
      return {
        ...state,
        waterIntakeList: [...state.waterIntakeList, action.payload],
      };
    }
    case UPDATE_WATER_INTAKE: {
      //db
      updateWaterIntake(
        db,
        [WaterIntake.CUP_DRUNK_COLUMN],
        [action.payload.cupDrunk],
        `${WaterIntake.ID_COLUMN} = ?`,
        [action.payload.waterIntakeId]
      );
      return {
        ...state,
        waterIntakeList: [...state.waterIntakeList, action.payload],
      };
    }
    case CREATE_MEAL: {
      return {
        ...state,
        mealList: [...state.mealList, action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

export { initialState, reducer };
