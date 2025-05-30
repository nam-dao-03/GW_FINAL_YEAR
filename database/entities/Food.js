import { Meal } from "./Meal";
class Food {
  static TABLE_NAME = "Food";
  static ID_COLUMN = "foodId";
  static NAME_COLUMN = "nameFood";
  static BARCODE_COLUMN = "barcode";
  static CALORIES_COLUMN = "calories";
  static CARBS_COLUMN = "carbs";
  static FAT_COLUMN = "fat";
  static PROTEIN_COLUMN = "protein";
  static AVERAGE_NUTRITIONAL = "averageNutritional";
  static MEASUREMENT_COLUMN = "measurement";
  static SERVING_SIZE_COLUMN = "servingSize";
  static UNIT_COLUMN = "unit";
  static IS_FAVORITE_COLUMN = "isFavorite";
  static IS_CREATED_BY_USER_COLUMN = "isCreatedByUser";

  static CREATE_FOOD_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS ${Food.TABLE_NAME} (
  ${Food.ID_COLUMN} TEXT PRIMARY KEY,
  ${Food.NAME_COLUMN} TEXT,
  ${Food.BARCODE_COLUMN} TEXT,
  ${Food.CALORIES_COLUMN} REAL,
  ${Food.CARBS_COLUMN} REAL,
  ${Food.FAT_COLUMN} REAL,
  ${Food.PROTEIN_COLUMN} REAL,
  ${Food.AVERAGE_NUTRITIONAL} REAL,
  ${Food.MEASUREMENT_COLUMN} TEXT,
  ${Food.SERVING_SIZE_COLUMN} REAL,
  ${Food.UNIT_COLUMN} TEXT,
  ${Food.IS_FAVORITE_COLUMN} INTEGER,
  ${Food.IS_CREATED_BY_USER_COLUMN} INTEGER
  );
`;
  constructor(
    foodId,
    nameFood,
    barcode,
    calories,
    carbs,
    fat,
    protein,
    averageNutritional,
    measurement,
    servingSize,
    unit,
    isFavorite,
    isCreatedByUser
  ) {
    this.foodId = foodId;
    this.nameFood = nameFood;
    this.barcode = barcode;
    this.calories = calories;
    this.carbs = carbs;
    this.fat = fat;
    this.protein = protein;
    this.averageNutritional = averageNutritional;
    this.measurement = measurement;
    this.servingSize = servingSize;
    this.unit = unit;
    this.isFavorite = isFavorite;
    this.isCreatedByUser = isCreatedByUser;
  }
  // Getters và Setters
  getFoodId() {
    return this.foodId;
  }
  setFoodId(value) {
    this.foodId = value;
  }
  getNameFood() {
    return this.nameFood;
  }
  setNameFood(value) {
    this.nameFood = value;
  }

  getBarcode() {
    return this.barcode;
  }
  setBarcode(value) {
    this.barcode = value;
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

  setAverageNutritional(averageNutritional) {
    this.averageNutritional = averageNutritional;
  }

  getAverageNutritional() {
    return this.averageNutritional;
  }

  setMeasurement(measurement) {
    this.measurement = measurement;
  }

  getMeasurement() {
    return this.measurement;
  }

  setServingSize(servingSize) {
    this.servingSize = servingSize;
  }
  getServingSize() {
    return this.servingSize;
  }
  setUnit(unit) {
    this.unit = unit;
  }
  getUnit() {
    return this.unit;
  }

  setIsFavorite(isFavorite) {
    this.isFavorite = isFavorite;
  }
  getIsFavorite() {
    return this.isFavorite;
  }

  setIsCreatedByUser(isCreatedByUser) {
    this.isCreatedByUser = isCreatedByUser;
  }
  getIsCreatedByUser() {
    return this.isCreatedByUser;
  }
}

function createFoodInstance(food) {
  return Object.assign(new Food(), food);
}

export { Food, createFoodInstance };
