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

  getNameFood() {
    return this.nameFood;
  }

  getBarcode() {
    return this.barcode;
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

  getAverageNutritional() {
    return this.averageNutritional;
  }

  getMeasurement() {
    return this.measurement;
  }

  getServingSize() {
    return this.servingSize;
  }

  getUnit() {
    return this.unit;
  }

  getIsFavorite() {
    return this.isFavorite;
  }

  getIsCreatedByUser() {
    return this.isCreatedByUser;
  }
}

function createFoodInstance(food) {
  return Object.assign(new Food(), food);
}

export { Food, createFoodInstance };
