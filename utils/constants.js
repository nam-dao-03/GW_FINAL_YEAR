const LOSE_WEIGHT = "lose_weight";
const LOSE_MORE_WEIGHT = "lose_more_weight";
const MAINTAIN_WEIGHT = "maintain_weight";
const GAIN_WEIGHT = "gain_weight";
const GAIN_MORE_WEIGHT = "gain_more_weight";

const VERY_LOW_INTENSITY = "very_low_intensity";
const LOW_INTENSITY = "low_intensity";
const MODERATE_INTENSITY = "moderate_intensity";
const HIGH_INTENSITY = "high_intensity";
const VERY_HIGH_INTENSITY = "very_high_intensity";

const DAY_PER_WEEK = 7;
const MIN_HEIGHT = 50;
const MAX_HEIGHT = 200;
const MIN_WEIGHT = 4;
const MAX_WEIGHT = 150;
const MIN_AGE = 10;
const MAX_AGE = 90;

const CALORIES_PER_GRAM_CARB = 4;
const CALORIES_PER_GRAM_PROTEIN = 4;
const CALORIES_PER_GRAM_FAT = 9;

const CARBS_MAINTAIN_WEIGHT_PERCENT = 0.5;
const PROTEIN_MAINTAIN_WEIGHT_PERCENT = 0.2;
const FAT_MAINTAIN_WEIGHT_PERCENT = 0.3;

const CARBS_GAIN_WEIGHT_PERCENT = 0.4;
const PROTEIN_GAIN_WEIGHT_PERCENT = 0.3;
const FAT_GAIN_WEIGHT_PERCENT = 0.3;

const CARBS_LOSE_WEIGHT_PERCENT = 0.55;
const PROTEIN_LOSE_WEIGHT_PERCENT = 0.25;
const FAT_LOSE_WEIGHT_PERCENT = 0.2;

const CALORIES_PER_KILOGRAM = 7700;

const DEFAULT_AVERAGE_NUTRITIONAL = 100;

const BACKGROUND_FETCH_TASK = "background-fetch";

const BREAKFAST = "Breakfast";
const LUNCH = "Lunch";
const DINNER = "Dinner";
const SNACK = "Snack";
const WORKOUT = "Workout";

const MEASURE_TYPE = {
  WEIGHT: "Weight",
  HEIGHT: "Height",
};

const FITNESS_PARAMETERS = {
  TARGET: "Target",
  TARGET_WEIGHT: "Target Weight",
  TARGET_CALORIES: "Target Calories",
  WEIGHT: "Weight",
  HEIGHT: "Height",
  AGE: "Age",
  MINS_EXER_PER_DAY: "Minutes",
  DAY_EXER_PER_WEEK: "Days",
  GENDER: "Gender",
};

function getGoalTitle(goalType) {
  switch (goalType) {
    case LOSE_WEIGHT:
      return "Lose Weight";
    case LOSE_MORE_WEIGHT:
      return "Lose Weight Faster";
    case MAINTAIN_WEIGHT:
      return "Maintain Weight";
    case GAIN_WEIGHT:
      return "Gain Weight";
    case GAIN_MORE_WEIGHT:
      return "Gain Weight Fast";
    default:
      return "unknown Goal";
  }
}

export {
  LOSE_MORE_WEIGHT,
  LOSE_WEIGHT,
  MAINTAIN_WEIGHT,
  GAIN_WEIGHT,
  GAIN_MORE_WEIGHT,
  DAY_PER_WEEK,
  VERY_LOW_INTENSITY,
  LOW_INTENSITY,
  MODERATE_INTENSITY,
  HIGH_INTENSITY,
  VERY_HIGH_INTENSITY,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_WEIGHT,
  MAX_WEIGHT,
  MIN_AGE,
  MAX_AGE,
  CALORIES_PER_KILOGRAM,
  CALORIES_PER_GRAM_CARB,
  CALORIES_PER_GRAM_PROTEIN,
  CALORIES_PER_GRAM_FAT,
  CARBS_MAINTAIN_WEIGHT_PERCENT,
  PROTEIN_MAINTAIN_WEIGHT_PERCENT,
  FAT_MAINTAIN_WEIGHT_PERCENT,
  CARBS_GAIN_WEIGHT_PERCENT,
  PROTEIN_GAIN_WEIGHT_PERCENT,
  FAT_GAIN_WEIGHT_PERCENT,
  CARBS_LOSE_WEIGHT_PERCENT,
  PROTEIN_LOSE_WEIGHT_PERCENT,
  FAT_LOSE_WEIGHT_PERCENT,
  BACKGROUND_FETCH_TASK,
  DEFAULT_AVERAGE_NUTRITIONAL,
  BREAKFAST,
  LUNCH,
  DINNER,
  SNACK,
  WORKOUT,
  MEASURE_TYPE,
  FITNESS_PARAMETERS,
  getGoalTitle,
};
