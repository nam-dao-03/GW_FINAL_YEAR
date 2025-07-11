import { User } from "./User";
class Meal {
  static TABLE_NAME = "Meal";
  static ID_COLUMN = "mealId";
  static NAME_COLUMN = "nameMeal";
  static DATE_COLUMN = "dateMeal";

  static CREATE_MEAL_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${Meal.TABLE_NAME} (
    ${Meal.ID_COLUMN} TEXT PRIMARY KEY,
    ${User.ID_COLUMN} TEXT,
    ${Meal.NAME_COLUMN} TEXT,
    ${Meal.DATE_COLUMN} TEXT,
    FOREIGN KEY (${User.ID_COLUMN}) REFERENCES ${User.TABLE_NAME}(${User.ID_COLUMN})
    );
`;
  constructor(mealId, userId, nameMeal, dateMeal) {
    this.mealId = mealId;
    this.userId = userId;
    this.nameMeal = nameMeal;
    this.dateMeal = dateMeal;
  }
  // Getters và Setters
  getMealId() {
    return this.mealId;
  }

  getUserId() {
    return this.userId;
  }

  getName() {
    return this.nameMeal;
  }

  getDate() {
    return this.dateMeal;
  }
}

function createMealInstance(meal) {
  return Object.assign(new Meal(), meal);
}

export { Meal, createMealInstance };
