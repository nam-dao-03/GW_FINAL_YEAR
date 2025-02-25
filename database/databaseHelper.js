import * as SQLite from "expo-sqlite";
import { User } from "./entities/User";
import { DailyNutrition } from "./entities/DailyNutrition";
import { Workout } from "./entities/Workout";
import { WaterIntake } from "./entities/WaterIntake";
import { Meal } from "./entities/Meal";
import { MealDish } from "./entities/MealDish";
import { MealFood } from "./entities/MealFood";
import { Food } from "./entities/Food";
import { Dish } from "./entities/Dish";
const DATABASE_NAME = "nutrition-app";
const TABLE_CREATION_QUERIES = [
  User.CREATE_USER_TABLE_QUERY,
  DailyNutrition.CREATE_DAILY_NUTRITION_TABLE_QUERY,
  Workout.CREATE_WORKOUT_TABLE_QUERY,
  WaterIntake.CREATE_WATER_INTAKE_TABLE_QUERY,
  Meal.CREATE_MEAL_TABLE_QUERY,
  Dish.CREATE_DISH_TABLE_QUERY,
  Food.CREATE_FOOD_TABLE_QUERY,
  MealFood.CREATE_MEAL_FOOD_TABLE_QUERY,
  MealDish.CREATE_MEAL_DISH_TABLE_QUERY,
];

function setUpDatabase() {
  const db = SQLite.openDatabaseSync(DATABASE_NAME);
  db.execSync(`PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;`);
  TABLE_CREATION_QUERIES.forEach((query) => db.execSync(query));
  return db;
}

function openDatabase() {
  const db = SQLite.openDatabaseSync(DATABASE_NAME);
  return db;
}

function getAllDataFormTable(db, table) {
  const data = db.getAllSync(`SELECT * FROM ${table}`);
  return data;
}

function insertData(db, tableName, columns, values) {
  const placeholders = columns.map(() => "?").join(", ");
  const query = `INSERT INTO ${tableName} (${columns.join(
    ", "
  )}) VALUES (${placeholders})`;
  const result = db.runSync(query, ...values);
  return result;
}

function updateData(db, tableName, columns, values, whereClause, whereArgs) {
  const setClause = columns.map((col) => `${col} = ?`).join(", ");
  const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
  db.runSync(query, ...values, ...whereArgs);
}

function createUser(db, user) {
  return insertData(
    db,
    User.TABLE_NAME,
    [
      User.ID_COLUMN,
      User.NAME_COLUMN,
      User.EMAIL_COLUMN,
      User.PASSWORD_COLUMN,
      User.AGE_COLUMN,
      User.GENDER_COLUMN,
      User.TARGET_COLUMN,
    ],
    [
      user.getUserId(),
      user.getName(),
      user.getEmail(),
      user.getPassword(),
      user.getAge(),
      user.getGender(),
      user.getTarget(),
    ]
  );
}

function createWorkout(db, workout) {
  return insertData(
    db,
    Workout.TABLE_NAME,
    [
      Workout.ID_COLUMN,
      User.ID_COLUMN,
      Workout.DATE_COLUMN,
      Workout.EXERCISE_NAME_COLUMN,
      Workout.DURATION_COLUMN,
      Workout.CALORIES_COLUMN,
    ],
    [
      workout.getWorkoutId(),
      workout.getUserId(),
      workout.getDateWorkout(),
      workout.getExerciseName(),
      workout.getDuration(),
      workout.getCalories(),
    ]
  );
}

function createWaterIntake(db, waterIntake) {
  return insertData(
    db,
    WaterIntake.TABLE_NAME,
    [
      WaterIntake.ID_COLUMN,
      User.ID_COLUMN,
      WaterIntake.DATE_COLUMN,
      WaterIntake.CUP_DRUNK_COLUMN,
      WaterIntake.WATER_PER_CUP,
      WaterIntake.WATER_INTAKE_VOLUME_COLUMN,
    ],
    [
      waterIntake.getWaterIntakeId(),
      waterIntake.getUserId(),
      waterIntake.getDateWaterIntake(),
      waterIntake.getCupDrunk(),
      waterIntake.getWaterPerCup(),
      waterIntake.getWaterIntakeVolume(),
    ]
  );
}

function updateWaterIntake(db, columns, values, whereClause, whereArgs) {
  return updateData(
    db,
    WaterIntake.TABLE_NAME,
    columns,
    values,
    whereClause,
    whereArgs
  );
}

function createDailyNutrition(db, dailyNutrition) {
  return insertData(
    db,
    DailyNutrition.TABLE_NAME,
    [
      DailyNutrition.ID_COLUMN,
      User.ID_COLUMN,
      DailyNutrition.WEIGHT_COLUMN,
      DailyNutrition.HEIGHT_COLUMN,
      DailyNutrition.BMI_COLUMN,
      DailyNutrition.TARGET_CALORIES_COLUMN,
      DailyNutrition.TARGET_CARBS_COLUMN,
      DailyNutrition.TARGET_FAT_COLUMN,
      DailyNutrition.TARGET_PROTEIN_COLUMN,
      DailyNutrition.CONSUMED_CALORIES_COLUMN,
      DailyNutrition.CONSUMED_CARBS_COLUMN,
      DailyNutrition.CONSUMED_FAT_COLUMN,
      DailyNutrition.CONSUMED_PROTEIN_COLUMN,
      DailyNutrition.DATE_COLUMN,
    ],
    [
      dailyNutrition.getDailyNutritionId(),
      dailyNutrition.getUserId(),
      dailyNutrition.getWeight(),
      dailyNutrition.getHeight(),
      dailyNutrition.getBmi(),
      dailyNutrition.getTargetCalories(),
      dailyNutrition.getTargetCarbs(),
      dailyNutrition.getTargetFat(),
      dailyNutrition.getTargetProtein(),
      dailyNutrition.getConsumedCalories(),
      dailyNutrition.getConsumedCarbs(),
      dailyNutrition.getConsumedFat(),
      dailyNutrition.getConsumedProtein(),
      dailyNutrition.getDate(),
    ]
  );
}

function createMeal(db, meal) {
  return insertData(
    db,
    Meal.TABLE_NAME,
    [
      Meal.ID_COLUMN,
      User.ID_COLUMN,
      Meal.NAME_COLUMN,
      Meal.DATE_COLUMN,
      Meal.CALORIES_COLUMN,
      Meal.CARBS_COLUMN,
      Meal.FAT_COLUMN,
      Meal.PROTEIN_COLUMN,
      Meal.DESCRIPTION_COLUMN,
    ],
    [
      meal.getMealId(),
      meal.getUserId(),
      meal.getName(),
      meal.getDateMeal(),
      meal.getCalories(),
      meal.getCarbs(),
      meal.getFat(),
      meal.getProtein(),
      meal.getDescription(),
    ]
  );
}

function createDish(db, dish) {
  return insertData(
    db,
    Dish.TABLE_NAME,
    [
      Dish.ID_COLUMN,
      Meal.ID_COLUMN,
      Dish.NAME_COLUMN,
      Dish.CALORIES_COLUMN,
      Dish.CARBS_COLUMN,
      Dish.FAT_COLUMN,
      Dish.PROTEIN_COLUMN,
      Dish.DESCRIPTION_COLUMN,
    ],
    [
      dish.getDishId(),
      dish.getMealId(),
      dish.getName(),
      dish.getCalories(),
      dish.getCarbs(),
      dish.getFat(),
      dish.getProtein(),
      dish.getDescription(),
    ]
  );
}

function createFood(db, food) {
  return insertData(
    db,
    Food.TABLE_NAME,
    [
      Food.ID_COLUMN,
      Meal.ID_COLUMN,
      Food.NAME_COLUMN,
      Food.BARCODE_COLUMN,
      Food.CALORIES_COLUMN,
      Food.CARBS_COLUMN,
      Food.FAT_COLUMN,
      Food.PROTEIN_COLUMN,
      Food.DESCRIPTION_COLUMN,
    ],
    [
      food.getFoodId(),
      food.getMealId(),
      food.getName(),
      food.getBarcode(),
      food.getCalories(),
      food.getCarbs(),
      food.getFat(),
      food.getProtein(),
      food.getDescription(),
    ]
  );
}

function createMealDish(db, mealDish) {
  return insertData(
    db,
    MealDish.TABLE_NAME,
    [MealDish.ID_COLUMN, Meal.ID_COLUMN, Dish.ID_COLUMN],
    [mealDish.getMealDishId(), mealDish.getMealId(), mealDish.getDishId()]
  );
}

function createMealFood(db, mealFood) {
  return insertData(
    db,
    MealFood.TABLE_NAME,
    [MealFood.ID_COLUMN, Meal.ID_COLUMN, Food.ID_COLUMN],
    [mealFood.getMealFoodId(), mealFood.getMealId(), mealFood.getFoodId()]
  );
}

// function createWorkout(db, workout) {
//   const result = db.runSync(
//     `INSERT INTO ${Workout.TABLE_NAME} (
//     ${User.ID_COLUMN},
//     ${Workout.DATE_COLUMN},
//     ${Workout.EXERCISE_NAME_COLUMN},
//     ${Workout.DURATION_COLUMN},
//     ${Workout.CALORIES_COLUMN}
//     ) VALUES (?, ?, ?, ?, ?)`,
//     workout.getUserId(),
//     workout.getDateWorkout(),
//     workout.getExerciseName(),
//     workout.getDuration(),
//     workout.getCalories()
//   );
//   return result;
// }
// function createWaterIntake(db, waterIntake) {
//   const result = db.runSync(
//     `
//     INSERT INTO ${WaterIntake.TABLE_NAME} (
//     ${User.ID_COLUMN},
//     ${WaterIntake.DATE_COLUMN},
//     ${WaterIntake.CUP_DRUNK_COLUMN},
//     ${WaterIntake.TOTAL_CUPS_COLUMN}
//     ) VALUES (?, ?, ?, ?)`,
//     waterIntake.getUserId(),
//     waterIntake.getDateWaterIntake(),
//     waterIntake.getCupDrunk(),
//     waterIntake.getTotalCups()
//   );
//   return result;
// }
// function createDailyNutrition(db, dailyNutrition) {
//   const result = db.runSync(
//     `
//     INSERT INTO ${DailyNutrition.TABLE_NAME} (
//     ${User.ID_COLUMN},
//     ${DailyNutrition.WEIGHT_COLUMN},
//     ${DailyNutrition.HEIGHT_COLUMN},
//     ${DailyNutrition.BMI_COLUMN},
//     ${DailyNutrition.TARGET_CALORIES_COLUMN},
//     ${DailyNutrition.TARGET_CARBS_COLUMN},
//     ${DailyNutrition.TARGET_FAT_COLUMN},
//     ${DailyNutrition.TARGET_PROTEIN_COLUMN},
//     ${DailyNutrition.CONSUMED_CALORIES_COLUMN},
//     ${DailyNutrition.CONSUMED_CARBS_COLUMN},
//     ${DailyNutrition.CONSUMED_FAT_COLUMN},
//     ${DailyNutrition.CONSUMED_PROTEIN_COLUMN},
//     ${DailyNutrition.DATE_COLUMN}
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     dailyNutrition.getUserId(),
//     dailyNutrition.getWeight(),
//     dailyNutrition.getHeight(),
//     dailyNutrition.getBmi(),
//     dailyNutrition.getTargetCalories(),
//     dailyNutrition.getTargetCarbs(),
//     dailyNutrition.getTargetFat(),
//     dailyNutrition.getTargetProtein(),
//     dailyNutrition.getConsumedCalories(),
//     dailyNutrition.getConsumedCarbs(),
//     dailyNutrition.getConsumedFat(),
//     dailyNutrition.getConsumedProtein(),
//     dailyNutrition.getDate()
//   );
//   return result;
// }
// function createMeal(db, meal) {
//   const result = db.runSync(
//     `
//     INSERT INTO ${Meal.TABLE_NAME} (
//     ${User.ID_COLUMN},
//     ${Meal.NAME_COLUMN},
//     ${Meal.DATE_COLUMN},
//     ${Meal.CALORIES_COLUMN},
//     ${Meal.CARBS_COLUMN},
//     ${Meal.FAT_COLUMN},
//     ${Meal.PROTEIN_COLUMN},
//     ${Meal.DESCRIPTION_COLUMN}
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     meal.getUserId(),
//     meal.getName(),
//     meal.getDateMeal(),
//     meal.getCalories(),
//     meal.getCarbs(),
//     meal.getFat(),
//     meal.getProtein(),
//     meal.getDescription()
//   );
//   return result;
// }
// function createDish(db, dish) {
//   const result = db.runSync(
//     `
//     INSERT INTO ${Dish.TABLE_NAME} (
//     ${Meal.ID_COLUMN},
//     ${Dish.NAME_COLUMN},
//     ${Dish.CALORIES_COLUMN},
//     ${Dish.CARBS_COLUMN},
//     ${Dish.FAT_COLUMN},
//     ${Dish.PROTEIN_COLUMN},
//     ${Dish.DESCRIPTION_COLUMN}
//     ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//     dish.getMealId(),
//     dish.getName(),
//     dish.getCalories(),
//     dish.getCarbs(),
//     dish.getFat(),
//     dish.getProtein(),
//     dish.getDescription()
//   );
//   return result;
// }
// function createFood(db, food) {
//   const result = db.runSync(
//     `
//     INSERT INTO ${Food.TABLE_NAME} (
//     ${Meal.ID_COLUMN},
//     ${Food.NAME_COLUMN},
//     ${Food.BARCODE_COLUMN},
//     ${Food.CALORIES_COLUMN},
//     ${Food.CARBS_COLUMN},
//     ${Food.FAT_COLUMN},
//     ${Food.PROTEIN_COLUMN},
//     ${Food.DESCRIPTION_COLUMN}
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//     food.getMealId(),
//     food.getName(),
//     food.getBarcode(),
//     food.getCalories(),
//     food.getCarbs(),
//     food.getFat(),
//     food.getProtein(),
//     food.getDescription()
//   );
//   return result;
// }
// function createMealDish(db, mealDish) {
//   const result = db.runSync(
//     `
//     INSERT INTO ${MealDish.TABLE_NAME} (
//     ${Meal.ID_COLUMN},
//     ${Dish.ID_COLUMN}
//     ) VALUES (?, ?)`,
//     mealDish.getMealId(),
//     mealDish.getDishId()
//   );
//   return result;
// }
// function createMealFood(db, mealFood) {
//   const result = db.runSync(
//     `
//     INSERT INTO ${MealFood.TABLE_NAME} (
//     ${Meal.ID_COLUMN},
//     ${Food.ID_COLUMN}
//     ) VALUES (?, ?)`,
//     mealFood.getMealId(),
//     mealFood.getFoodId()
//   );
//   return result;
// }

export {
  setUpDatabase,
  openDatabase,
  getAllDataFormTable,
  createUser,
  createWorkout,
  createWaterIntake,
  createDailyNutrition,
  createMeal,
  createDish,
  createFood,
  createMealDish,
  createMealFood,
  updateWaterIntake,
};

// ${MealDish.CREATE_MEAL_DISH_TABLE_QUERY}
