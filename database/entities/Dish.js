import { Meal } from "./Meal";
class Dish {
  static TABLE_NAME = "Dish";
  static ID_COLUMN = "dishId";
  static NAME_COLUMN = "name";
  static CALORIES_COLUMN = "calories";
  static CARBS_COLUMN = "carbs";
  static FAT_COLUMN = "fat";
  static PROTEIN_COLUMN = "protein";
  static DESCRIPTION_COLUMN = "description";

  static CREATE_DISH_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${Dish.TABLE_NAME} (
    ${Dish.ID_COLUMN} TEXT PRIMARY KEY,
    ${Meal.ID_COLUMN} TEXT,
    ${Dish.NAME_COLUMN} TEXT,
    ${Dish.CALORIES_COLUMN} REAL,
    ${Dish.CARBS_COLUMN} REAL,
    ${Dish.FAT_COLUMN} REAL,
    ${Dish.PROTEIN_COLUMN} REAL,
    ${Dish.DESCRIPTION_COLUMN} TEXT
    );
`;
  constructor(
    dishId,
    mealId,
    name,
    calories,
    carbs,
    fat,
    protein,
    description
  ) {
    this.dishId = dishId;
    this.mealId = mealId;
    this.name = name;
    this.calories = calories;
    this.carbs = carbs;
    this.fat = fat;
    this.protein = protein;
    this.description = description;
  }
  // Getters và Setters
  getDishId() {
    return this.dishId;
  }
  setDishId(value) {
    this.dishId = value;
  }

  getMealId() {
    return this.mealId;
  }
  setMealId(value) {
    this.mealId = value;
  }

  getName() {
    return this.name;
  }
  setName(value) {
    this.name = value;
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

function createDishInstance(dish) {
  return Object.assign(new Dish(), dish);
}

export { Dish, createDishInstance };
