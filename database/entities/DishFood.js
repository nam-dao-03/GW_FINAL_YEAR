import { Dish } from "./Dish";
import { Food } from "./Food";

class DishFood {
  static TABLE_NAME = "DishFood";
  static ID_COLUMN = "dishFoodId";

  static CREATE_DISH_FOOD_TABLE_QUERY = `
      CREATE TABLE IF NOT EXISTS ${DishFood.TABLE_NAME} (
      ${DishFood.ID_COLUMN} TEXT PRIMARY KEY,
      ${Dish.ID_COLUMN} TEXT,
      ${Food.ID_COLUMN} TEXT,
      FOREIGN KEY (${Dish.ID_COLUMN}) REFERENCES ${Dish.TABLE_NAME}(${Dish.ID_COLUMN}) ON DELETE CASCADE,
      FOREIGN KEY (${Food.ID_COLUMN}) REFERENCES ${Food.TABLE_NAME}(${Food.ID_COLUMN}) ON DELETE CASCADE
    )
  `;

  constructor(dishFoodId, dishId, foodId) {
    this.dishFoodId = dishFoodId;
    this.dishId = dishId;
    this.foodId = foodId;
  }

  // Getter
  getDishFoodId() {
    return this.dishFoodId;
  }

  getDishId() {
    return this.dishId;
  }

  getFoodId() {
    return this.foodId;
  }
}
function createDishFoodInstance(dishFood) {
  return Object.assign(new DishFood(), dishFood);
}

export { DishFood, createDishFoodInstance };
