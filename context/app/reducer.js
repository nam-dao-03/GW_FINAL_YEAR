import {
  getAllDataFormTable,
  setUpDatabase,
  createDailyNutrition,
  createUser,
  updateUser,
  createWaterIntake,
  updateWaterIntake,
  createCupDrunk,
  deleteCupDrunkById,
  createFood,
  deleteFoodById,
  updateFood,
  createDish,
  createDishFood,
  deleteDishById,
  deleteDishFoodById,
  updateDish,
  createMeal,
  createMealFood,
  deleteMealFoodById,
  createMealDish,
  deleteMealDishById,
  createWorkout,
  deleteWorkoutById,
  updateWorkout,
  updateCupDrunk,
  createWaterReminderNotification,
  deleteWaterReminderNotificationById,
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
  CREATE_DAILY_NUTRITION,
  CREATE_USER,
  CREATE_WATER_INTAKE,
  UPDATE_CUP_DRUNK,
  UPDATE_WATER_INTAKE,
  DELETE_CUP_DRUNK,
  CREATE_FOOD,
  DELETE_FOOD,
  UPDATE_FOOD,
  CREATE_DISH,
  CREATE_DISH_FOOD,
  DELETE_DISH,
  DELETE_DISH_FOOD,
  UPDATE_DISH,
  CREATE_MEAL_FOOD,
  UPDATE_MEAL_FOOD,
  DELETE_MEAL_FOOD,
  SET_TRUE_SHOW_FAB,
  SET_FALSE_SHOW_FAB,
  CREATE_MEAL,
  CREATE_MEAL_DISH,
  DELETE_MEAL_DISH,
  CREATE_WORKOUT,
  DELETE_WORKOUT,
  UPDATE_WORKOUT,
  UPDATE_USER,
  CREATE_WATER_REMINDER_NOTIFICATION,
  CREATE_WATER_REMINDER_NOTIFICATION_LIST,
  DELETE_WATER_REMINDER_NOTIFICATION,
  DELETE_WATER_REMINDER_NOTIFICATION_LIST,
  UPDATE_DAILY_NUTRITION,
} from "./constants";
import * as SQLite from "expo-sqlite";
import {
  createDishFoodInstance,
  DishFood,
} from "../../database/entities/DishFood";
import {
  createMealFoodInstance,
  MealFood,
} from "../../database/entities/MealFood";
import {
  createMealDishInstance,
  MealDish,
} from "../../database/entities/MealDish";
import {
  createWaterReminderNotificationInstance,
  WaterReminderNotification,
} from "../../database/entities/WaterReminderNotification";
console.log(SQLite.deleteDatabaseSync("nutrition-app"));
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

const waterReminderNotificationList = getAllDataFormTable(
  db,
  WaterReminderNotification.TABLE_NAME
).map((item) => createWaterReminderNotificationInstance(item));

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

const dishFoodList = getAllDataFormTable(db, DishFood.TABLE_NAME).map((item) =>
  createDishFoodInstance(item)
);

const mealFoodList = getAllDataFormTable(db, MealFood.TABLE_NAME).map((item) =>
  createMealFoodInstance(item)
);

const mealDishList = getAllDataFormTable(db, MealDish.TABLE_NAME).map((item) =>
  createMealDishInstance(item)
);

const initialState = {
  userList,
  waterIntakeList,
  cupDrunkList,
  waterReminderNotificationList,
  mealList,
  dishList,
  foodList,
  workoutList,
  dailyNutritionList,
  dishFoodList,
  mealFoodList,
  mealDishList,
  showFAB: true,
};

console.log("user state in reducer", initialState);

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
    case UPDATE_USER: {
      const user = action.payload;
      //db
      updateUser(db, user);
      const updatedUserList = state.userList.map((item) => {
        if (item.getUserId() === user.getUserId()) {
          return user;
        }
        return item;
      });
      return {
        ...state,
        userList: updatedUserList,
      };
    }

    case CREATE_WATER_REMINDER_NOTIFICATION: {
      //db
      createWaterReminderNotification(db, action.payload);
      return {
        ...state,
        waterReminderNotificationList: [
          ...state.waterReminderNotificationList,
          action.payload,
        ],
      };
    }
    case CREATE_WATER_REMINDER_NOTIFICATION_LIST: {
      //db
      action.payload.forEach((item) => {
        createWaterReminderNotification(
          db,
          createWaterReminderNotificationInstance(item)
        );
      });
      return {
        ...state,
        waterReminderNotificationList: [...action.payload],
      };
    }

    case DELETE_WATER_REMINDER_NOTIFICATION: {
      const waterReminderNotificationId = action.payload;
      //db
      deleteWaterReminderNotificationById(db, waterReminderNotificationId);
      const updatedWaterReminderNotificationList =
        state.waterReminderNotificationList.filter(
          (item) =>
            item.getWaterReminderNotificationId() !==
            waterReminderNotificationId
        );
      return {
        ...state,
        waterReminderNotificationList: updatedWaterReminderNotificationList,
      };
    }

    case DELETE_WATER_REMINDER_NOTIFICATION_LIST: {
      //db
      state.waterReminderNotificationList.forEach((item) => {
        deleteWaterReminderNotificationById(
          db,
          createWaterReminderNotificationInstance(
            item
          ).getWaterReminderNotificationId()
        );
      });
      return {
        ...state,
        waterReminderNotificationList: [],
      };
    }

    case CREATE_DAILY_NUTRITION:
      //db
      createDailyNutrition(db, action.payload);
      return {
        ...state,
        dailyNutritionList: [...state.dailyNutritionList, action.payload],
      };

    case UPDATE_DAILY_NUTRITION: {
      //db
      const updatedDailyNutritionList = state.dailyNutritionList.map((item) => {
        if (
          item.getDailyNutritionId() === action.payload.getDailyNutritionId()
        ) {
          return action.payload;
        }
        return item;
      });

      return {
        ...state,
        dailyNutritionList: updatedDailyNutritionList,
      };
    }
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

    case UPDATE_CUP_DRUNK: {
      updateCupDrunk(db, action.payload);
      const updatedCupDrunkList = state.cupDrunkList.map((item) => {
        if (item.getCupDrunkId() === action.payload.getCupDrunkId()) {
          return action.payload;
        }
        return item;
      });

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

    // Workout
    case CREATE_WORKOUT: {
      //db
      createWorkout(db, action.payload);
      return {
        ...state,
        workoutList: [...state.workoutList, action.payload],
      };
    }

    case UPDATE_WORKOUT: {
      //db
      updateWorkout(db, action.payload);
      const updatedWorkoutList = state.workoutList.map((item) => {
        if (item.getWorkoutId() === action.payload.getWorkoutId()) {
          return action.payload;
        }
        return item;
      });
      return {
        ...state,
        workoutList: updatedWorkoutList,
      };
    }

    case DELETE_WORKOUT: {
      const workoutId = action.payload;
      //db
      deleteWorkoutById(db, workoutId);
      const updatedWorkoutList = state.workoutList.filter(
        (item) => item.getWorkoutId() !== workoutId
      );
      return {
        ...state,
        workoutList: updatedWorkoutList,
      };
    }

    //Dish
    case CREATE_DISH: {
      //db
      createDish(db, action.payload);
      return {
        ...state,
        dishList: [...state.dishList, action.payload],
      };
    }
    case DELETE_DISH: {
      const dishId = action.payload;
      //db
      deleteDishById(db, dishId);
      const updatedDishList = state.dishList.filter(
        (item) => item.getDishId() !== dishId
      );
      return {
        ...state,
        dishList: updatedDishList,
      };
    }
    case UPDATE_DISH: {
      const dish = action.payload;
      //db
      updateDish(db, dish);
      const updatedDishList = state.dishList.map((item) => {
        if (item.getDishId() === dish.getDishId()) {
          return dish;
        }
        return item;
      });
      return {
        ...state,
        dishList: updatedDishList,
      };
    }

    //Food
    case CREATE_FOOD: {
      //db
      createFood(db, action.payload);
      return {
        ...state,
        foodList: [...state.foodList, action.payload],
      };
    }
    case DELETE_FOOD: {
      const foodId = action.payload;
      //db
      deleteFoodById(db, foodId);
      const updatedFoodList = state.foodList.filter(
        (item) => item.getFoodId() !== foodId
      );
      return {
        ...state,
        foodList: updatedFoodList,
      };
    }
    case UPDATE_FOOD: {
      const food = action.payload;
      //db
      updateFood(db, food);
      const updatedFoodList = state.foodList.map((item) => {
        if (item.getFoodId() === food.getFoodId()) {
          return food;
        }
        return item;
      });
      return {
        ...state,
        foodList: updatedFoodList,
      };
    }
    case CREATE_DISH_FOOD: {
      //db
      createDishFood(db, action.payload);
      return {
        ...state,
        dishFoodList: [...state.dishFoodList, action.payload],
      };
    }
    case DELETE_DISH_FOOD: {
      //db
      deleteDishFoodById(db, action.payload);
      const updatedDishFoodList = state.dishFoodList.filter(
        (item) => item.getDishFoodId() !== action.payload
      );
      return {
        ...state,
        dishFoodList: updatedDishFoodList,
      };
    }

    //Meal
    case CREATE_MEAL: {
      //db
      createMeal(db, action.payload);
      return {
        ...state,
        mealList: [...state.mealList, action.payload],
      };
    }

    //MealFood
    case CREATE_MEAL_FOOD: {
      //db
      createMealFood(db, action.payload);
      return {
        ...state,
        mealFoodList: [...state.mealFoodList, action.payload],
      };
    }

    case DELETE_MEAL_FOOD: {
      //db
      deleteMealFoodById(db, action.payload);
      const updatedMealFoodList = state.mealFoodList.filter(
        (item) => item.getMealFoodId() !== action.payload
      );
      return {
        ...state,
        mealFoodList: updatedMealFoodList,
      };
    }

    case CREATE_MEAL_DISH: {
      //db
      createMealDish(db, action.payload);
      return {
        ...state,
        mealDishList: [...state.mealDishList, action.payload],
      };
    }

    case DELETE_MEAL_DISH: {
      //db
      deleteMealDishById(db, action.payload);
      const updatedMealDishList = state.mealDishList.filter(
        (item) => item.getMealDishId() !== action.payload
      );
      return {
        ...state,
        mealDishList: updatedMealDishList,
      };
    }

    // Floating Action Button
    case SET_TRUE_SHOW_FAB: {
      return {
        ...state,
        showFAB: true,
      };
    }
    case SET_FALSE_SHOW_FAB: {
      return {
        ...state,
        showFAB: false,
      };
    }
    default: {
      return state;
    }
  }
}

export { initialState, reducer };
