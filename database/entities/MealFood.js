import { Meal } from "./Meal";
import { Food } from "./Food";
class MealFood {
  static TABLE_NAME = "MealFood";
  static ID_COLUMN = "mealFoodId";

  static CREATE_MEAL_FOOD_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS ${MealFood.TABLE_NAME} (
    ${MealFood.ID_COLUMN} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${Meal.ID_COLUMN} INTEGER,
    ${Food.ID_COLUMN} INTEGER,
    FOREIGN KEY (${Meal.ID_COLUMN}) REFERENCES ${Meal.TABLE_NAME}(${Meal.ID_COLUMN}) ON DELETE CASCADE,
    FOREIGN KEY (${Food.ID_COLUMN}) REFERENCES ${Food.TABLE_NAME}(${Food.ID_COLUMN}) ON DELETE CASCADE
  );
`;

  #mealFoodId;
  #mealId;
  #foodId;

  constructor(mealFoodId, mealId, foodId) {
    this.#mealFoodId = mealFoodId;
    this.#mealId = mealId;
    this.#foodId = foodId;
  }

  getMealFoodId() {
    return this.#mealFoodId;
  }
  setMealFoodId(value) {
    this.#mealFoodId = value;
  }

  getMealId() {
    return this.#mealId;
  }
  setMealId(value) {
    this.#mealId = value;
  }

  getFoodId() {
    return this.#foodId;
  }
  setFoodId(value) {
    this.#foodId = value;
  }
}

export { MealFood };
