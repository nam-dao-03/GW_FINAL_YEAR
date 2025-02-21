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
function setUpDatabase() {
  const db = SQLite.openDatabaseSync(DATABASE_NAME);
  db.execSync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;`);
  db.execSync(`
    ${User.CREATE_USER_TABLE_QUERY}
    ${DailyNutrition.CREATE_DAILY_NUTRITION_TABLE_QUERY}
    ${Workout.CREATE_WORKOUT_TABLE_QUERY}
    ${WaterIntake.CREATE_WATER_INTAKE_TABLE_QUERY}
    ${Meal.CREATE_MEAL_TABLE_QUERY}
    ${Dish.CREATE_DISH_TABLE_QUERY}
    ${Food.CREATE_FOOD_TABLE_QUERY}
    ${MealFood.CREATE_MEAL_FOOD_TABLE_QUERY}
    ${MealDish.CREATE_MEAL_DISH_TABLE_QUERY}
    `);
  return db;
  // SQLite.deleteDatabaseAsync(DATABASE_NAME);
}

function getAllDataFormTable(db, table) {
  const data = db.getAllSync(`SELECT * FROM ${table}`);
  return data;
}

function createUser(db, user) {
  const result = db.runSync(
    `INSERT INTO ${User.TABLE_NAME} (
    ${User.NAME_COLUMN},
    ${User.EMAIL_COLUMN},
    ${User.PASSWORD_COLUMN},
    ${User.AGE_COLUMN},
    ${User.GENDER_COLUMN},
    ${User.TARGET_COLUMN}) VALUES
    (?, ?, ?, ?, ?, ?)`,
    user.getName(),
    user.getEmail(),
    user.getPassword(),
    user.getAge(),
    user.getGender(),
    user.getTarget()
  );
  return result;
}

function createWorkout(db, workout) {
  const result = db.runSync(
    `INSERT INTO ${Workout.TABLE_NAME} (
    ${User.ID_COLUMN},
    ${Workout.DATE_COLUMN},
    ${Workout.EXERCISE_NAME_COLUMN},
    ${Workout.DURATION_COLUMN},
    ${Workout.CALORIES_COLUMN}
    ) VALUES (?, ?, ?, ?, ?)`,
    workout.getUserId(),
    workout.getDateWorkout(),
    workout.getExerciseName(),
    workout.getDuration(),
    workout.getCalories()
  );
  return result;
}
function createWaterIntake(db, waterIntake) {
  const result = db.runSync(
    `
    INSERT INTO ${WaterIntake.TABLE_NAME} (
    ${User.ID_COLUMN},
    ${WaterIntake.DATE_COLUMN},
    ${WaterIntake.CUP_DRUNK_COLUMN},
    ${WaterIntake.TOTAL_CUPS_COLUMN}
    ) VALUES (?, ?, ?, ?)`,
    waterIntake.getUserId(),
    waterIntake.getDateWaterIntake(),
    waterIntake.getCupDrunk(),
    waterIntake.getTotalCups()
  );
  return result;
}
function createDailyNutrition(db, dailyNutrition) {
  const result = db.runSync(
    `
    INSERT INTO ${DailyNutrition.TABLE_NAME} (
    ${User.ID_COLUMN},
    ${DailyNutrition.WEIGHT_COLUMN},
    ${DailyNutrition.HEIGHT_COLUMN},
    ${DailyNutrition.BMI_COLUMN},
    ${DailyNutrition.TARGET_CALORIES_COLUMN},
    ${DailyNutrition.TARGET_CARBS_COLUMN},
    ${DailyNutrition.TARGET_FAT_COLUMN},
    ${DailyNutrition.TARGET_PROTEIN_COLUMN},
    ${DailyNutrition.CONSUMED_CALORIES_COLUMN},
    ${DailyNutrition.CONSUMED_CARBS_COLUMN},
    ${DailyNutrition.CONSUMED_FAT_COLUMN},
    ${DailyNutrition.CONSUMED_PROTEIN_COLUMN}
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
    dailyNutrition.getConsumedProtein()
  );
  return result;
}
function createMeal(db, meal) {
  const result = db.runSync(
    `
    INSERT INTO ${Meal.TABLE_NAME} (
    ${User.ID_COLUMN},
    ${Meal.NAME_COLUMN},
    ${Meal.DATE_COLUMN},
    ${Meal.CALORIES_COLUMN},
    ${Meal.CARBS_COLUMN},
    ${Meal.FAT_COLUMN},
    ${Meal.PROTEIN_COLUMN},
    ${Meal.DESCRIPTION_COLUMN}
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    meal.getUserId(),
    meal.getName(),
    meal.getDateMeal(),
    meal.getCalories(),
    meal.getCarbs(),
    meal.getFat(),
    meal.getProtein(),
    meal.getDescription()
  );
  return result;
}
function createDish(db, dish) {
  const result = db.runSync(
    `
    INSERT INTO ${Dish.TABLE_NAME} (
    ${Meal.ID_COLUMN},
    ${Dish.NAME_COLUMN},
    ${Dish.CALORIES_COLUMN},
    ${Dish.CARBS_COLUMN},
    ${Dish.FAT_COLUMN},
    ${Dish.PROTEIN_COLUMN},
    ${Dish.DESCRIPTION_COLUMN}
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    dish.getMealId(),
    dish.getName(),
    dish.getCalories(),
    dish.getCarbs(),
    dish.getFat(),
    dish.getProtein(),
    dish.getDescription()
  );
}
function createFood(db, food) {
  const result = db.runSync(
    `
    INSERT INTO ${Food.TABLE_NAME} (
    ${Meal.ID_COLUMN},
    ${Food.NAME_COLUMN},
    ${Food.BARCODE_COLUMN},
    ${Food.CALORIES_COLUMN},
    ${Food.CARBS_COLUMN},
    ${Food.FAT_COLUMN},
    ${Food.PROTEIN_COLUMN},
    ${Food.DESCRIPTION_COLUMN}
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    food.getMealId(),
    food.getName(),
    food.getBarcode(),
    food.getCalories(),
    food.getCarbs(),
    food.getFat(),
    food.getProtein(),
    food.getDescription()
  );
}
function createMealDish(db, mealDish) {
  const result = db.runSync(
    `
    INSERT INTO ${MealDish.TABLE_NAME} (
    ${Meal.ID_COLUMN},
    ${Dish.ID_COLUMN}
    ) VALUES (?, ?)`,
    mealDish.getMealId(),
    mealDish.getDishId()
  );
  return result;
}
function createMealFood(db, mealFood) {
  const result = db.runSync(
    `
    INSERT INTO ${MealFood.TABLE_NAME} (
    ${Meal.ID_COLUMN},
    ${Food.ID_COLUMN}
    ) VALUES (?, ?)`,
    mealFood.getMealId(),
    mealFood.getFoodId()
  );
}

export {
  setUpDatabase,
  getAllDataFormTable,
  createUser,
  createWorkout,
  createWaterIntake,
  createDailyNutrition,
  createMeal,
  createDish,
  createMealDish,
  createMealFood,
};

// ${MealDish.CREATE_MEAL_DISH_TABLE_QUERY}
