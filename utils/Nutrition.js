import {
  CALORIES_PER_GRAM_CARB,
  CALORIES_PER_GRAM_FAT,
  CALORIES_PER_GRAM_PROTEIN,
  CARBS_GAIN_WEIGHT_PERCENT,
  CARBS_LOSE_WEIGHT_PERCENT,
  CARBS_MAINTAIN_WEIGHT_PERCENT,
  FAT_GAIN_WEIGHT_PERCENT,
  FAT_LOSE_WEIGHT_PERCENT,
  FAT_MAINTAIN_WEIGHT_PERCENT,
  GAIN_MORE_WEIGHT,
  GAIN_WEIGHT,
  LOSE_MORE_WEIGHT,
  LOSE_WEIGHT,
  MAINTAIN_WEIGHT,
  PROTEIN_GAIN_WEIGHT_PERCENT,
  PROTEIN_LOSE_WEIGHT_PERCENT,
  PROTEIN_MAINTAIN_WEIGHT_PERCENT,
} from "./constants";

function calculateMacronutrientNeeded(calories, target) {
  let carbsPercent, proteinPercent, fatPercent;

  switch (target) {
    case MAINTAIN_WEIGHT:
      carbsPercent = CARBS_MAINTAIN_WEIGHT_PERCENT;
      proteinPercent = PROTEIN_MAINTAIN_WEIGHT_PERCENT;
      fatPercent = FAT_MAINTAIN_WEIGHT_PERCENT;
      break;

    case GAIN_WEIGHT:
    case GAIN_MORE_WEIGHT:
      carbsPercent = CARBS_GAIN_WEIGHT_PERCENT;
      proteinPercent = PROTEIN_GAIN_WEIGHT_PERCENT;
      fatPercent = FAT_GAIN_WEIGHT_PERCENT;
      break;

    case LOSE_WEIGHT:
    case LOSE_MORE_WEIGHT:
      carbsPercent = CARBS_LOSE_WEIGHT_PERCENT;
      proteinPercent = PROTEIN_LOSE_WEIGHT_PERCENT;
      fatPercent = FAT_LOSE_WEIGHT_PERCENT;
      break;

    default:
      console.warn(
        "Target không hợp lệ. Sử dụng giá trị mặc định cho duy trì cân nặng."
      );
      carbsPercent = CARBS_MAINTAIN_WEIGHT_PERCENT;
      proteinPercent = PROTEIN_MAINTAIN_WEIGHT_PERCENT;
      fatPercent = FAT_MAINTAIN_WEIGHT_PERCENT;
      break;
  }

  const carbs = (calories * carbsPercent) / CALORIES_PER_GRAM_CARB;
  const protein = (calories * proteinPercent) / CALORIES_PER_GRAM_PROTEIN;
  const fat = (calories * fatPercent) / CALORIES_PER_GRAM_FAT;

  return {
    carbs: Math.ceil(carbs),
    protein: Math.ceil(protein),
    fat: Math.ceil(fat),
  };
}

export { calculateMacronutrientNeeded };
