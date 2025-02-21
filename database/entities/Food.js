import { Meal } from "./Meal";
class Food {
  static TABLE_NAME = "Food";
  static ID_COLUMN = "foodId";
  static NAME_COLUMN = "name";
  static BARCODE_COLUMN = "barcode";
  static CALORIES_COLUMN = "calories";
  static CARBS_COLUMN = "carbs";
  static FAT_COLUMN = "fat";
  static PROTEIN_COLUMN = "protein";
  static DESCRIPTION_COLUMN = "description";

  static CREATE_FOOD_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS ${Food.TABLE_NAME} (
  ${Food.ID_COLUMN} INTEGER PRIMARY KEY AUTOINCREMENT,
  ${Meal.ID_COLUMN} INTEGER,
  ${Food.NAME_COLUMN} TEXT,
  ${Food.BARCODE_COLUMN} TEXT,
  ${Food.CALORIES_COLUMN} REAL,
  ${Food.CARBS_COLUMN} REAL,
  ${Food.FAT_COLUMN} REAL,
  ${Food.PROTEIN_COLUMN} REAL,
  ${Food.DESCRIPTION_COLUMN} TEXT
  );
`;
  #foodId;
  #mealId;
  #name;
  #barcode;
  #calories;
  #carbs;
  #fat;
  #protein;
  #description;
  constructor(
    foodId,
    mealId,
    name,
    barcode,
    calories,
    carbs,
    fat,
    protein,
    description
  ) {
    this.#foodId = foodId;
    this.#mealId = mealId;
    this.#name = name;
    this.#barcode = barcode;
    this.#calories = calories;
    this.#carbs = carbs;
    this.#fat = fat;
    this.#protein = protein;
    this.#description = description;
  }
  // Getters và Setters
  getFoodId() {
    return this.#foodId;
  }
  setFoodId(value) {
    this.#foodId = value;
  }

  getMealId() {
    return this.#mealId;
  }
  setMealId(value) {
    this.#mealId = value;
  }

  getName() {
    return this.#name;
  }
  setName(value) {
    this.#name = value;
  }

  getBarcode() {
    return this.#barcode;
  }
  setBarcode(value) {
    this.#barcode = value;
  }

  getCalories() {
    return this.#calories;
  }
  setCalories(value) {
    this.#calories = value;
  }

  getCarbs() {
    return this.#carbs;
  }
  setCarbs(value) {
    this.#carbs = value;
  }

  getFat() {
    return this.#fat;
  }
  setFat(value) {
    this.#fat = value;
  }

  getProtein() {
    return this.#protein;
  }
  setProtein(value) {
    this.#protein = value;
  }

  getDescription() {
    return this.#description;
  }
  setDescription(value) {
    this.#description = value;
  }
}

export { Food };
