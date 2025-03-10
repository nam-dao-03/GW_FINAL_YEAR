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
import { CupDrunk } from "./entities/CupDrunk";
const DATABASE_NAME = "nutrition-app";
const TABLE_CREATION_QUERIES = [
  User.CREATE_USER_TABLE_QUERY,
  DailyNutrition.CREATE_DAILY_NUTRITION_TABLE_QUERY,
  Workout.CREATE_WORKOUT_TABLE_QUERY,
  WaterIntake.CREATE_WATER_INTAKE_TABLE_QUERY,
  CupDrunk.CREATE_CUP_DRUNK_TABLE_QUERY,
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

function deleteData(db, tableName, conditions) {
  const conditionString = Object.keys(conditions)
    .map((key) => `${key} = $${key}`)
    .join(" AND ");

  const query = `DELETE FROM ${tableName} WHERE ${conditionString}`;

  // Tạo object với key có prefix "$" cho đúng định dạng
  const parameters = Object.fromEntries(
    Object.entries(conditions).map(([key, value]) => [`$${key}`, value])
  );
  const result = db.runSync(query, parameters);
  return result;
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
      workout.getDate(),
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
      WaterIntake.WATER_PER_CUP_COLUMN,
      WaterIntake.WATER_INTAKE_VOLUME_COLUMN,
    ],
    [
      waterIntake.getWaterIntakeId(),
      waterIntake.getUserId(),
      waterIntake.getDate(),
      waterIntake.getWaterPerCup(),
      waterIntake.getWaterIntakeVolume(),
    ]
  );
}

function createCupDrunk(db, cupDrunk) {
  return insertData(
    db,
    CupDrunk.TABLE_NAME,
    [
      CupDrunk.ID_COLUMN,
      WaterIntake.ID_COLUMN,
      CupDrunk.WATER_PER_CUP_COLUMN,
      CupDrunk.DATE_COLUMN,
    ],
    [
      cupDrunk.getCupDrunkId(),
      cupDrunk.getWaterIntakeId(),
      cupDrunk.getWaterPerCup(),
      cupDrunk.getDate(),
    ]
  );
}

function updateCupDrunk(db, columns, values, whereClause, whereArgs) {
  return updateData(
    db,
    CupDrunk.TABLE_NAME,
    columns,
    values,
    whereClause,
    whereArgs
  );
}

function deleteCupDrunkById(db, id) {
  return deleteData(db, CupDrunk.TABLE_NAME, { [CupDrunk.ID_COLUMN]: id });
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
      Food.AVERAGE_NUTRITIONAL,
      Food.MEASUREMENT_COLUMN,
      Food.SERVING_SIZE_COLUMN,
      Food.UNIT_COLUMN,
    ],
    [
      food.getFoodId(),
      food.getMealId(),
      food.getNameFood(),
      food.getBarcode(),
      food.getCalories(),
      food.getCarbs(),
      food.getFat(),
      food.getProtein(),
      food.getAverageNutritional(),
      food.getMeasurement(),
      food.getServingSize(),
      food.getUnit(),
    ]
  );
}

function deleteFoodById(db, id) {
  return deleteData(db, Food.TABLE_NAME, { [Food.ID_COLUMN]: id });
}

function updateFood(db, columns, values, whereClause, whereArgs) {
  return updateData(
    db,
    Food.TABLE_NAME,
    columns,
    values,
    whereClause,
    whereArgs
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

export {
  setUpDatabase,
  openDatabase,
  getAllDataFormTable,
  createUser,
  createWorkout,
  createWaterIntake,
  createCupDrunk,
  createDailyNutrition,
  createMeal,
  createDish,
  createFood,
  deleteFoodById,
  createMealDish,
  createMealFood,
  updateWaterIntake,
  updateCupDrunk,
  deleteCupDrunkById,
  updateFood,
};
