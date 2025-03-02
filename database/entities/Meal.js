import { User } from "./User";
class Meal {
  static TABLE_NAME = "Meal";
  static ID_COLUMN = "mealId";
  static NAME_COLUMN = "name";
  static DATE_COLUMN = "dateMeal";
  static CALORIES_COLUMN = "calories";
  static CARBS_COLUMN = "carbs";
  static FAT_COLUMN = "fat";
  static PROTEIN_COLUMN = "protein";
  static DESCRIPTION_COLUMN = "description";

  static CREATE_MEAL_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${Meal.TABLE_NAME} (
    ${Meal.ID_COLUMN} TEXT PRIMARY KEY,
    ${User.ID_COLUMN} TEXT,
    ${Meal.NAME_COLUMN} TEXT,
    ${Meal.DATE_COLUMN} TEXT,
    ${Meal.CALORIES_COLUMN} REAL,
    ${Meal.CARBS_COLUMN} REAL,
    ${Meal.FAT_COLUMN} REAL,
    ${Meal.PROTEIN_COLUMN} REAL,
    ${Meal.DESCRIPTION_COLUMN} TEXT,
    FOREIGN KEY (${User.ID_COLUMN}) REFERENCES ${User.TABLE_NAME}(${User.ID_COLUMN})
    );
`;
  constructor(
    mealId,
    userId,
    name,
    dateMeal,
    calories,
    carbs,
    fat,
    protein,
    description
  ) {
    this.mealId = mealId;
    this.userId = userId;
    this.name = name;
    this.dateMeal = dateMeal;
    this.calories = calories;
    this.carbs = carbs;
    this.fat = fat;
    this.protein = protein;
    this.description = description;
  }
  // Getters và Setters
  getMealId() {
    return this.mealId;
  }
  setMealId(value) {
    this.mealId = value;
  }

  getUserId() {
    return this.userId;
  }
  setUserId(value) {
    this.userId = value;
  }

  getName() {
    return this.name;
  }
  setName(value) {
    this.name = value;
  }

  getDateMeal() {
    return this.dateMeal;
  }
  setDateMeal(value) {
    this.dateMeal = value;
  }

  getCalories() {
    return this.calories;
  }
  setCalories(value) {
    this.calories = value;
  }

  getCarbs() {
    return this.carbs;
  }
  setCarbs(value) {
    this.carbs = value;
  }

  getFat() {
    return this.fat;
  }
  setFat(value) {
    this.fat = value;
  }

  getProtein() {
    return this.protein;
  }
  setProtein(value) {
    this.protein = value;
  }

  getDescription() {
    return this.description;
  }
  setDescription(value) {
    this.description = value;
  }
}

function createMealInstance(meal) {
  return Object.assign(new Meal(), meal);
}

export { Meal, createMealInstance };
