import { Meal } from "./Meal";
import { Dish } from "./Dish";
class MealDish {
  static TABLE_NAME = "MealDish";
  static ID_COLUMN = "mealDishId";

  static CREATE_MEAL_DISH_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS ${MealDish.TABLE_NAME} (
      ${MealDish.ID_COLUMN} TEXT PRIMARY KEY,
      ${Meal.ID_COLUMN} TEXT,
      ${Dish.ID_COLUMN} TEXT,
      FOREIGN KEY (${Meal.ID_COLUMN}) REFERENCES ${Meal.TABLE_NAME}(${Meal.ID_COLUMN}) ON DELETE CASCADE,
      FOREIGN KEY (${Dish.ID_COLUMN}) REFERENCES ${Dish.TABLE_NAME}(${Dish.ID_COLUMN}) ON DELETE CASCADE
        )
    `;

  constructor(mealDishId, mealId, dishId) {
    this.mealDishId = mealDishId;
    this.mealId = mealId;
    this.dishId = dishId;
  }
  // Getters và Setters
  getMealDishId() {
    return this.mealDishId;
  }
  setMealDishId(value) {
    this.mealDishId = value;
  }

  getMealId() {
    return this.mealId;
  }
  setMealId(value) {
    this.mealId = value;
  }

  getDishId() {
    return this.dishId;
  }
  setDishId(value) {
    this.dishId = value;
  }
}

function createMealDishInstance(mealDish) {
  return Object.assign(new MealDish(), mealDish);
}

export { MealDish, createMealDishInstance };
