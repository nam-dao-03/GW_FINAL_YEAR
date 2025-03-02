import {
  getAllDataFormTable,
  setUpDatabase,
  createDailyNutrition,
  createUser,
  createWaterIntake,
  updateWaterIntake,
  createCupDrunk,
  deleteCupDrunkById,
} from "../../database/databaseHelper";
import { User } from "../../database/entities/User";
import { WaterIntake } from "../../database/entities/WaterIntake";
import { Meal } from "../../database/entities/Meal";
import { Dish } from "../../database/entities/Dish";
import { Food } from "../../database/entities/Food";
import { Workout } from "../../database/entities/Workout";
import { DailyNutrition } from "../../database/entities/DailyNutrition";
import { CupDrunk } from "../../database/entities/CupDrunk";
import {
  CREATE_CUP_DRUNK,
  CREATE_CUP_DRUNK_LIST,
  CREATE_DAILY_NUTRITION,
  CREATE_USER,
  CREATE_WATER_INTAKE,
  UPDATE_CUP_DRUNK,
  UPDATE_WATER_INTAKE,
  DELETE_CUP_DRUNK,
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

const cupDrunkList = getAllDataFormTable(db, CupDrunk.TABLE_NAME).map((item) =>
  Object.assign(new CupDrunk(), item)
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
  cupDrunkList,
  mealList,
  dishList,
  foodList,
  workoutList,
  dailyNutritionList,
};

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
        [WaterIntake.WATER_PER_CUP_COLUMN],
        [action.payload.getWaterPerCup()],
        `${WaterIntake.ID_COLUMN} = ?`,
        [action.payload.getWaterIntakeId()]
      );
      const updatedWaterIntakeList = state.waterIntakeList.map((item) => {
        if (item.getWaterIntakeId() === action.payload.getWaterIntakeId()) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        waterIntakeList: updatedWaterIntakeList,
      };
    }
    case CREATE_CUP_DRUNK: {
      //db
      createCupDrunk(db, action.payload);
      return {
        ...state,
        cupDrunkList: [...state.cupDrunkList, action.payload],
      };
    }
    case CREATE_CUP_DRUNK_LIST: {
      //db
      action.payload.forEach((item) => {
        createCupDrunk(db, item);
      });
      return {
        ...state,
        cupDrunkList: [...state.cupDrunkList, ...action.payload],
      };
    }
    case UPDATE_CUP_DRUNK: {
      // updateCupDrunk(
      //   db,
      //   [CupDrunk.IS_DRUNK_COLUMN],
      //   [action.payload.getIsDrunk()],
      //   `${CupDrunk.ID_COLUMN} = ?`,
      //   [action.payload.getCupDrunkId()]
      // );
      // const updatedCupDrunkList = state.cupDrunkList.map((item) => {
      //   if (item.getCupDrunkId() === action.payload.getCupDrunkId()) {
      //     return action.payload;
      //   }
      //   return item;
      // });
      return {
        ...state,
        cupDrunkList: updatedCupDrunkList,
      };
    }
    case DELETE_CUP_DRUNK: {
      const cupDrunkId = action.payload;
      //db
      deleteCupDrunkById(db, cupDrunkId);
      const updatedCupDrunkList = state.cupDrunkList.filter(
        (item) => item.getCupDrunkId() !== cupDrunkId
      );
      return {
        ...state,
        cupDrunkList: updatedCupDrunkList,
      };
    }

    default: {
      return state;
    }
  }
}

export { initialState, reducer };
