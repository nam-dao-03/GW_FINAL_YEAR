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
  static CONSUMED_CALORIES_COLUMN = "consumedCalories";
  static CONSUMED_CARBS_COLUMN = "consumedCarbs";
  static CONSUMED_FAT_COLUMN = "consumedFat";
  static CONSUMED_PROTEIN_COLUMN = "consumedProtein";
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
    ${DailyNutrition.CONSUMED_CALORIES_COLUMN} REAL,
    ${DailyNutrition.CONSUMED_CARBS_COLUMN} REAL,
    ${DailyNutrition.CONSUMED_FAT_COLUMN} REAL,
    ${DailyNutrition.CONSUMED_PROTEIN_COLUMN} REAL,
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
    consumedCalories,
    consumedCarbs,
    consumedProtein,
    consumedFat,
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
    this.consumedCalories = consumedCalories;
    this.consumedCarbs = consumedCarbs;
    this.consumedFat = consumedFat;
    this.consumedProtein = consumedProtein;
    this.dateDailyNutrition = dateDailyNutrition;
  }
  // Getters và Setters
  getDailyNutritionId() {
    return this.dailyNutritionId;
  }
  setDailyNutritionId(value) {
    this.dailyNutritionId = value;
  }

  getUserId() {
    return this.userId;
  }
  setUserId(value) {
    this.userId = value;
  }

  getWeight() {
    return this.weight;
  }
  setWeight(value) {
    this.weight = value;
  }

  getHeight() {
    return this.height;
  }
  setHeight(value) {
    this.height = value;
  }

  getBmi() {
    return this.bmi;
  }
  setBmi(value) {
    this.bmi = value;
  }

  getTargetCalories() {
    return this.targetCalories;
  }
  setTargetCalories(value) {
    this.targetCalories = value;
  }

  getTargetCarbs() {
    return this.targetCarbs;
  }
  setTargetCarbs(value) {
    this.targetCarbs = value;
  }

  getTargetFat() {
    return this.targetFat;
  }
  setTargetFat(value) {
    this.targetFat = value;
  }

  getTargetProtein() {
    return this.targetProtein;
  }
  setTargetProtein(value) {
    this.targetProtein = value;
  }

  getConsumedCalories() {
    return this.consumedCalories;
  }
  setConsumedCalories(value) {
    this.consumedCalories = value;
  }

  getConsumedCarbs() {
    return this.consumedCarbs;
  }
  setConsumedCarbs(value) {
    this.consumedCarbs = value;
  }

  getConsumedFat() {
    return this.consumedFat;
  }
  setConsumedFat(value) {
    this.consumedFat = value;
  }

  getConsumedProtein() {
    return this.consumedProtein;
  }
  setConsumedProtein(value) {
    this.consumedProtein = value;
  }

  getDate() {
    return this.dateDailyNutrition;
  }
  setDate(dateDailyNutrition) {
    this.dateDailyNutrition = dateDailyNutrition;
  }
  toString() {
    return `
      DailyNutrition {
        dailyNutritionId: ${this.dailyNutritionId},
        userId: ${this.userId},
        weight: ${this.weight},
        height: ${this.height},
        bmi: ${this.bmi},
        targetCalories: ${this.targetCalories},
        targetCarbs: ${this.targetCarbs},
        targetFat: ${this.targetFat},
        targetProtein: ${this.targetProtein},
        consumedCalories: ${this.consumedCalories},
        consumedCarbs: ${this.consumedCarbs},
        consumedFat: ${this.consumedFat},
        consumedProtein: ${this.consumedProtein},
        date: ${this.dateDailyNutrition}
      }
    `;
  }
}

function createDailyNutritionInstance(dailyNutrition) {
  return Object.assign(new DailyNutrition(), dailyNutrition);
}

export { DailyNutrition, createDailyNutritionInstance };
