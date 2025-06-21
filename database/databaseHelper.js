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
import { DishFood } from "./entities/DishFood";
import { WaterReminderNotification } from "./entities/WaterReminderNotification";
import { testDataQuery } from "../utils/TestData";
const DATABASE_NAME = "nutrition-app";
const TABLE_CREATION_QUERIES = [
  User.CREATE_USER_TABLE_QUERY,
  DailyNutrition.CREATE_DAILY_NUTRITION_TABLE_QUERY,
  Workout.CREATE_WORKOUT_TABLE_QUERY,
  WaterIntake.CREATE_WATER_INTAKE_TABLE_QUERY,
  WaterReminderNotification.CREATE_WATER_REMINDER_NOTIFICATION_TABLE_QUERY,
  CupDrunk.CREATE_CUP_DRUNK_TABLE_QUERY,
  Meal.CREATE_MEAL_TABLE_QUERY,
  Dish.CREATE_DISH_TABLE_QUERY,
  Food.CREATE_FOOD_TABLE_QUERY,
  MealFood.CREATE_MEAL_FOOD_TABLE_QUERY,
  MealDish.CREATE_MEAL_DISH_TABLE_QUERY,
  DishFood.CREATE_DISH_FOOD_TABLE_QUERY,
];

function setUpDatabase() {
  const db = SQLite.openDatabaseSync(DATABASE_NAME);
  db.execSync(`PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;`);
  TABLE_CREATION_QUERIES.forEach((query) => db.execSync(query));
  // db.execSync(testDataQuery);
  return db;
}

function openDatabase() {
  const db = SQLite.openDatabaseSync(DATABASE_NAME);
  console.log("db", db);
  return db;
}

function getAllDataFormTable(db, table) {
  const data = db.getAllSync(`SELECT * FROM ${table}`);
  return data;
}

function deleteTable(db, table) {
  db.getAllSync(`DELETE FROM ${table}`);
}

function deleteAllTable(db) {
  const tableNames = [
    MealFood.TABLE_NAME,
    MealDish.TABLE_NAME,
    DishFood.TABLE_NAME,
    WaterReminderNotification.TABLE_NAME,
    CupDrunk.TABLE_NAME,
    WaterIntake.TABLE_NAME,
    Meal.TABLE_NAME,
    Dish.TABLE_NAME,
    Food.TABLE_NAME,
    Workout.TABLE_NAME,
    DailyNutrition.TABLE_NAME,
    User.TABLE_NAME,
  ];
  tableNames.forEach((tableName) => deleteTable(db, tableName));
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
      User.TARGET_WEIGHT_COLUMN,
      User.BED_TIME_COLUMN,
      User.WAKE_UP_TIME_COLUMN,
      User.WATER_REMINDER_INTERVAL_COLUMN,
      User.IS_ACTIVE_WATER_NOTIFICATION_COLUMN,
      User.MIN_EXER_PER_DAY_COLUMN,
      User.DAY_EXER_PER_WEEK_COLUMN,
    ],
    [
      user.getUserId(),
      user.getName(),
      user.getEmail(),
      user.getPassword(),
      user.getAge(),
      user.getGender(),
      user.getTarget(),
      user.getTargetWeight(),
      user.getBedTime(),
      user.getWakeUpTime(),
      user.getWaterReminderInterval(),
      user.getIsActiveWaterNotification(),
      user.getMinExerPerDay(),
      user.getDayExerPerWeek(),
    ]
  );
}

function updateUser(db, user) {
  return updateData(
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
      User.TARGET_WEIGHT_COLUMN,
      User.BED_TIME_COLUMN,
      User.WAKE_UP_TIME_COLUMN,
      User.WATER_REMINDER_INTERVAL_COLUMN,
      User.IS_ACTIVE_WATER_NOTIFICATION_COLUMN,
      User.MIN_EXER_PER_DAY_COLUMN,
      User.DAY_EXER_PER_WEEK_COLUMN,
    ],
    [
      user.getUserId(),
      user.getName(),
      user.getEmail(),
      user.getPassword(),
      user.getAge(),
      user.getGender(),
      user.getTarget(),
      user.getTargetWeight(),
      user.getBedTime(),
      user.getWakeUpTime(),
      user.getWaterReminderInterval(),
      user.getIsActiveWaterNotification(),
      user.getMinExerPerDay(),
      user.getDayExerPerWeek(),
    ],
    `${User.ID_COLUMN} = ?`,
    [user.getUserId()]
  );
}

//Workout

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
      Workout.IS_CREATED_BY_USER_COLUMN,
    ],
    [
      workout.getWorkoutId(),
      workout.getUserId(),
      workout.getDate(),
      workout.getExerciseName(),
      workout.getDuration(),
      workout.getCalories(),
      workout.getIsCreatedByUser(),
    ]
  );
}

function updateWorkout(db, workout) {
  return updateData(
    db,
    Workout.TABLE_NAME,
    [
      Workout.ID_COLUMN,
      User.ID_COLUMN,
      Workout.DATE_COLUMN,
      Workout.EXERCISE_NAME_COLUMN,
      Workout.DURATION_COLUMN,
      Workout.CALORIES_COLUMN,
      Workout.IS_CREATED_BY_USER_COLUMN,
    ],
    [
      workout.getWorkoutId(),
      workout.getUserId(),
      workout.getDate(),
      workout.getExerciseName(),
      workout.getDuration(),
      workout.getCalories(),
      workout.getIsCreatedByUser(),
    ],
    `${Workout.ID_COLUMN} = ?`,
    [workout.getWorkoutId()]
  );
}

function deleteWorkoutById(db, id) {
  return deleteData(db, Workout.TABLE_NAME, { [Workout.ID_COLUMN]: id });
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

function updateCupDrunk(db, cupDrunk) {
  return updateData(
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
    ],
    `${CupDrunk.ID_COLUMN} = ?`,
    [cupDrunk.getCupDrunkId()]
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

//WaterReminderNotification
function createWaterReminderNotification(db, waterReminderNotification) {
  return insertData(
    db,
    WaterReminderNotification.TABLE_NAME,
    [
      WaterReminderNotification.ID_COLUMN,
      User.ID_COLUMN,
      WaterReminderNotification.TITLE_COLUMN,
      WaterReminderNotification.BODY_COLUMN,
      WaterReminderNotification.NOTIFICATION_TIME_COLUMN,
    ],
    [
      waterReminderNotification.getWaterReminderNotificationId(),
      waterReminderNotification.getUserId(),
      waterReminderNotification.getTitle(),
      waterReminderNotification.getBody(),
      waterReminderNotification.getNotificationTime(),
    ]
  );
}

function updateWaterReminderNotification(db, waterReminderNotification) {
  return updateData(
    db,
    WaterReminderNotification.TABLE_NAME,
    [
      User.ID_COLUMN,
      WaterReminderNotification.TITLE_COLUMN,
      WaterReminderNotification.BODY_COLUMN,
      WaterReminderNotification.NOTIFICATION_TIME_COLUMN,
    ],
    [
      waterReminderNotification.getUserId(),
      waterReminderNotification.getTitle(),
      waterReminderNotification.getBody(),
      waterReminderNotification.getNotificationTime(),
    ],
    `${WaterReminderNotification.ID_COLUMN} = ?`,
    [waterReminderNotification.getWaterReminderNotificationId()]
  );
}

function deleteWaterReminderNotificationById(db, id) {
  return deleteData(db, WaterReminderNotification.TABLE_NAME, {
    [WaterReminderNotification.ID_COLUMN]: id,
  });
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
      dailyNutrition.getDate(),
    ]
  );
}

function updateDailyNutrition(db, dailyNutrition) {
  return updateData(
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
      dailyNutrition.getDate(),
    ],
    `${DailyNutrition.ID_COLUMN} = ?`,
    [dailyNutrition.getDailyNutritionId()]
  );
}

function createMeal(db, meal) {
  return insertData(
    db,
    Meal.TABLE_NAME,
    [Meal.ID_COLUMN, User.ID_COLUMN, Meal.NAME_COLUMN, Meal.DATE_COLUMN],
    [meal.getMealId(), meal.getUserId(), meal.getName(), meal.getDate()]
  );
}

function createDish(db, dish) {
  return insertData(
    db,
    Dish.TABLE_NAME,
    [
      Dish.ID_COLUMN,
      Dish.NAME_COLUMN,
      Dish.CALORIES_COLUMN,
      Dish.CARBS_COLUMN,
      Dish.FAT_COLUMN,
      Dish.PROTEIN_COLUMN,
      Dish.IS_FAVORITE_COLUMN,
      Dish.IS_CREATED_BY_USER,
    ],
    [
      dish.getDishId(),
      dish.getName(),
      dish.getCalories(),
      dish.getCarbs(),
      dish.getFat(),
      dish.getProtein(),
      dish.getIsFavorite(),
      dish.getIsCreatedByUser(),
    ]
  );
}

function updateDish(db, dish) {
  return updateData(
    db,
    Dish.TABLE_NAME,
    [
      Dish.NAME_COLUMN,
      Dish.CALORIES_COLUMN,
      Dish.CARBS_COLUMN,
      Dish.FAT_COLUMN,
      Dish.PROTEIN_COLUMN,
      Dish.IS_FAVORITE_COLUMN,
      Dish.IS_CREATED_BY_USER,
    ],
    [
      dish.getName(),
      dish.getCalories(),
      dish.getCarbs(),
      dish.getFat(),
      dish.getProtein(),
      dish.getIsFavorite(),
      dish.getIsCreatedByUser(),
    ],
    `${Dish.ID_COLUMN} = ?`,
    [dish.getDishId()]
  );
}

function deleteDishById(db, id) {
  return deleteData(db, Dish.TABLE_NAME, { [Dish.ID_COLUMN]: id });
}

//Food

function createFood(db, food) {
  return insertData(
    db,
    Food.TABLE_NAME,
    [
      Food.ID_COLUMN,
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
      Food.IS_FAVORITE_COLUMN,
      Food.IS_CREATED_BY_USER_COLUMN,
    ],
    [
      food.getFoodId(),
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
      food.getIsFavorite(),
      food.getIsCreatedByUser(),
    ]
  );
}

function deleteFoodById(db, id) {
  return deleteData(db, Food.TABLE_NAME, { [Food.ID_COLUMN]: id });
}

function updateFood(db, food) {
  return updateData(
    db,
    Food.TABLE_NAME,
    [
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
      Food.IS_FAVORITE_COLUMN,
      Food.IS_CREATED_BY_USER_COLUMN,
    ],
    [
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
      food.getIsFavorite(),
      food.getIsCreatedByUser(),
    ],
    `${Food.ID_COLUMN} = ?`,
    [food.getFoodId()]
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

function deleteMealDishById(db, id) {
  return deleteData(db, MealDish.TABLE_NAME, { [MealDish.ID_COLUMN]: id });
}

function createMealFood(db, mealFood) {
  return insertData(
    db,
    MealFood.TABLE_NAME,
    [MealFood.ID_COLUMN, Meal.ID_COLUMN, Food.ID_COLUMN],
    [mealFood.getMealFoodId(), mealFood.getMealId(), mealFood.getFoodId()]
  );
}

function deleteMealFoodById(db, id) {
  return deleteData(db, MealFood.TABLE_NAME, { [MealFood.ID_COLUMN]: id });
}

function createDishFood(db, dishFood) {
  return insertData(
    db,
    DishFood.TABLE_NAME,
    [DishFood.ID_COLUMN, Dish.ID_COLUMN, Food.ID_COLUMN],
    [dishFood.getDishFoodId(), dishFood.getDishId(), dishFood.getFoodId()]
  );
}
function deleteDishFoodById(db, id) {
  return deleteData(db, DishFood.TABLE_NAME, { [DishFood.ID_COLUMN]: id });
}

export {
  setUpDatabase,
  openDatabase,
  getAllDataFormTable,
  createUser,
  updateUser,
  createWorkout,
  updateWorkout,
  deleteWorkoutById,
  createWaterIntake,
  createCupDrunk,
  createWaterReminderNotification,
  updateWaterReminderNotification,
  deleteWaterReminderNotificationById,
  createDailyNutrition,
  updateDailyNutrition,
  createMeal,
  createDish,
  updateDish,
  deleteDishById,
  createFood,
  deleteFoodById,
  createMealDish,
  deleteMealDishById,
  createMealFood,
  deleteMealFoodById,
  updateWaterIntake,
  updateCupDrunk,
  deleteCupDrunkById,
  updateFood,
  createDishFood,
  deleteDishFoodById,
  deleteAllTable,
};
