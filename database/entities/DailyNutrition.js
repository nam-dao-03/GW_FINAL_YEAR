import { User } from "./User";
class DailyNutrition {
  static TABLE_NAME = "DailyNutrition";
  static ID_COLUMN = "dailyNutritionId";
  static WEIGHT_COLUMN = "weight";
  static HEIGHT_COLUMN = "height";
  static BMI_COLUMN = "bmi";
  static TARGET_CALORIES_COLUMN = "targetCalories";
  static TARGET_CARBS_COLUMN = "targetCarbs";
  static TARGET_FAT_COLUMN = "targetFat";
  static TARGET_PROTEIN_COLUMN = "targetProtein";
  static DATE_COLUMN = "dateDailyNutrition";
  static CREATE_DAILY_NUTRITION_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${DailyNutrition.TABLE_NAME} (
    ${DailyNutrition.ID_COLUMN} TEXT PRIMARY KEY,
    ${User.ID_COLUMN} TEXT,
    ${DailyNutrition.WEIGHT_COLUMN} REAL,
    ${DailyNutrition.HEIGHT_COLUMN} REAL,
    ${DailyNutrition.BMI_COLUMN} REAL,
    ${DailyNutrition.TARGET_CALORIES_COLUMN} REAL,
    ${DailyNutrition.TARGET_CARBS_COLUMN} REAL,
    ${DailyNutrition.TARGET_FAT_COLUMN} REAL,
    ${DailyNutrition.TARGET_PROTEIN_COLUMN} REAL,
    ${DailyNutrition.DATE_COLUMN} TEXT,
    FOREIGN KEY (${User.ID_COLUMN}) REFERENCES ${User.TABLE_NAME}(${User.ID_COLUMN})
    );
`;
  constructor(
    dailyNutritionId,
    userId,
    weight,
    height,
    bmi,
    targetCalories,
    targetCarbs,
    targetProtein,
    targetFat,
    dateDailyNutrition
  ) {
    this.dailyNutritionId = dailyNutritionId;
    this.userId = userId;
    this.weight = weight;
    this.height = height;
    this.bmi = bmi;
    this.targetCalories = targetCalories;
    this.targetCarbs = targetCarbs;
    this.targetFat = targetFat;
    this.targetProtein = targetProtein;
    this.dateDailyNutrition = dateDailyNutrition;
  }
  getDailyNutritionId() {
    return this.dailyNutritionId;
  }

  getUserId() {
    return this.userId;
  }

  getWeight() {
    return this.weight;
  }

  getHeight() {
    return this.height;
  }

  getBmi() {
    return this.bmi;
  }

  getTargetCalories() {
    return this.targetCalories;
  }

  getTargetCarbs() {
    return this.targetCarbs;
  }

  getTargetFat() {
    return this.targetFat;
  }

  getTargetProtein() {
    return this.targetProtein;
  }

  getDate() {
    return this.dateDailyNutrition;
  }
}

function createDailyNutritionInstance(dailyNutrition) {
  return Object.assign(new DailyNutrition(), dailyNutrition);
}

export { DailyNutrition, createDailyNutritionInstance };
