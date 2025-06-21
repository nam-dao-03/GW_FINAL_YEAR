import { Meal } from "./Meal";
import { Food } from "./Food";
class MealFood {
  static TABLE_NAME = "MealFood";
  static ID_COLUMN = "mealFoodId";

  static CREATE_MEAL_FOOD_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS ${MealFood.TABLE_NAME} (
    ${MealFood.ID_COLUMN} TEXT PRIMARY KEY,
    ${Meal.ID_COLUMN} TEXT,
    ${Food.ID_COLUMN} TEXT,
    FOREIGN KEY (${Meal.ID_COLUMN}) REFERENCES ${Meal.TABLE_NAME}(${Meal.ID_COLUMN}) ON DELETE CASCADE,
    FOREIGN KEY (${Food.ID_COLUMN}) REFERENCES ${Food.TABLE_NAME}(${Food.ID_COLUMN}) ON DELETE CASCADE
  );
`;

  constructor(mealFoodId, mealId, foodId) {
    this.mealFoodId = mealFoodId;
    this.mealId = mealId;
    this.foodId = foodId;
  }

  getMealFoodId() {
    return this.mealFoodId;
  }

  getMealId() {
    return this.mealId;
  }

  getFoodId() {
    return this.foodId;
  }
}

function createMealFoodInstance(mealFood) {
  return Object.assign(new MealFood(), mealFood);
}

export { MealFood, createMealFoodInstance };
