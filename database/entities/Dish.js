class Dish {
  static TABLE_NAME = "Dish";
  static ID_COLUMN = "dishId";
  static NAME_COLUMN = "nameDish";
  static CALORIES_COLUMN = "calories";
  static CARBS_COLUMN = "carbs";
  static FAT_COLUMN = "fat";
  static PROTEIN_COLUMN = "protein";
  static IS_FAVORITE_COLUMN = "isFavorite";
  static IS_CREATED_BY_USER = "isCreatedByUser";

  static CREATE_DISH_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${Dish.TABLE_NAME} (
    ${Dish.ID_COLUMN} TEXT PRIMARY KEY,
    ${Dish.NAME_COLUMN} TEXT,
    ${Dish.CALORIES_COLUMN} REAL,
    ${Dish.CARBS_COLUMN} REAL,
    ${Dish.FAT_COLUMN} REAL,
    ${Dish.PROTEIN_COLUMN} REAL,
    ${Dish.IS_FAVORITE_COLUMN} INTEGER,
    ${Dish.IS_CREATED_BY_USER} INTEGER
    );
`;
  constructor(
    dishId,
    nameDish,
    calories,
    carbs,
    fat,
    protein,
    isFavorite,
    isCreatedByUser
  ) {
    this.dishId = dishId;
    this.nameDish = nameDish;
    this.calories = calories;
    this.carbs = carbs;
    this.fat = fat;
    this.protein = protein;
    this.isFavorite = isFavorite;
    this.isCreatedByUser = isCreatedByUser;
  }
  // Getters và Setters
  getDishId() {
    return this.dishId;
  }

  getName() {
    return this.nameDish;
  }

  getCalories() {
    return this.calories;
  }

  getCarbs() {
    return this.carbs;
  }

  getFat() {
    return this.fat;
  }

  getProtein() {
    return this.protein;
  }

  getIsFavorite() {
    return this.isFavorite;
  }

  getIsCreatedByUser() {
    return this.isCreatedByUser;
  }
}

function createDishInstance(dish) {
  return Object.assign(new Dish(), dish);
}

export { Dish, createDishInstance };
