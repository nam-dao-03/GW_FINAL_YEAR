import usePersonContext from "./usePersonContext";
import { formatShortDate, getLocalDate } from "../utils/Date";
import {
  calculateAdditionalCalories,
  calculateWaterIntake,
  calculatorBMI,
  calculatorBMR,
  calculatorTDEE,
  classifyBMI,
  getTDEEFactor,
  targetDay,
} from "../utils/Indicators";
import {
  GAIN_MORE_WEIGHT,
  GAIN_WEIGHT,
  LOSE_MORE_WEIGHT,
  LOSE_WEIGHT,
  MAINTAIN_WEIGHT,
} from "../utils/constants";
export default function useIndicators() {
  const [state, dispatch] = usePersonContext();
  const { age, days, minutes, gender, height, weight, target, targetWeight } =
    state;
  const BMI = calculatorBMI(Number(weight), Number(height));
  const statusBMI = classifyBMI(BMI);
  const BMR = calculatorBMR({
    weight,
    height,
    gender,
    age,
  });
  const TDEEFactor = getTDEEFactor(Number(minutes), Number(days));
  const TDEE = calculatorTDEE(BMR, TDEEFactor);
  const localDate = getLocalDate();
  const formattedShortDate = formatShortDate(localDate);
  const additionKilogramMap = {
    [LOSE_MORE_WEIGHT]: -0.5,
    [LOSE_WEIGHT]: -0.25,
    [MAINTAIN_WEIGHT]: 0,
    [GAIN_WEIGHT]: 0.25,
    [GAIN_MORE_WEIGHT]: 0.5,
  };
  const additionCaloriesNeed = calculateAdditionalCalories(
    additionKilogramMap[target]
  );
  const numberOfDay = targetDay(
    targetWeight,
    weight,
    additionKilogramMap[target]
  );
  const waterIntakeVolume = calculateWaterIntake(
    Number(weight),
    Number(minutes)
  );

  return {
    age,
    gender,
    BMI,
    TDEE,
    height,
    weight,
    waterIntakeVolume,
    formattedShortDate,
    localDate,
    target,
    statusBMI,
    targetWeight,
    additionCaloriesNeed,
    numberOfDay,
  };
}
