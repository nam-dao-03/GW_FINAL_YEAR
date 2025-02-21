import {
  getAllDataFormTable,
  setUpDatabase,
  createUser,
  createWorkout,
} from "../../database/databaseHelper";
import { User } from "../../database/entities/User";
import { WaterIntake } from "../../database/entities/WaterIntake";
import { Meal } from "../../database/entities/Meal";
import { Dish } from "../../database/entities/Dish";
import { Food } from "../../database/entities/Food";
import { Workout } from "../../database/entities/Workout";
import { DailyNutrition } from "../../database/entities/DailyNutrition";
import * as SQLite from "expo-sqlite";
import { CREATE_MEAL, CREATE_USER } from "./constants";
// console.log(SQLite.deleteDatabaseSync("nutrition-app"));
const db = setUpDatabase();
// const result = createUser(
//   db,
//   new User(-1, "name", "email", "password", 12, "male", "target")
// );
// createWorkout(db, new Workout(-1, 1, "12-12", "name", 123, 12332));
const usersList = getAllDataFormTable(db, User.TABLE_NAME);
const waterIntakeList = getAllDataFormTable(db, WaterIntake.TABLE_NAME);
const mealList = getAllDataFormTable(db, Meal.TABLE_NAME);
const dishList = getAllDataFormTable(db, Dish.TABLE_NAME);
const foodList = getAllDataFormTable(db, Food.TABLE_NAME);
const workoutList = getAllDataFormTable(db, Workout.TABLE_NAME);
const dailyNutritionList = getAllDataFormTable(db, DailyNutrition.TABLE_NAME);
const initialState = {
  user: usersList,
  waterIntake: waterIntakeList,
  meal: mealList,
  dish: dishList,
  food: foodList,
  workout: workoutList,
  dailyNutrition: dailyNutritionList,
};

console.log(
  initialState,
  "user>>>",
  usersList.length,
  "workout>>>",
  workoutList.length
);

function reducer(state, action) {
  switch (action.type) {
    case CREATE_USER: {
      return {
        ...state,
        user: [...state.user, action.payload],
      };
    }
    case CREATE_MEAL: {
      return {
        ...state,
        meal: [...state.meal, action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

export { initialState, reducer };
