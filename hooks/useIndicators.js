import usePersonContext from "./usePersonContext";
import { formattedDate } from "../utils/Date";
import {
  calculateWaterIntake,
  calculatorBMI,
  calculatorBMR,
  calculatorTDEE,
  classifyBMI,
  getTDEEFactor,
} from "../utils/Indicators";
export default function useIndicators() {
  const [state] = usePersonContext();
  const { age, days, minutes, gender, height, weight, target } = state;
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
  const waterIntake = calculateWaterIntake(Number(weight), Number(minutes));
  const date = formattedDate(new Date());

  return { BMI, TDEE, height, weight, waterIntake, date, target, statusBMI };
}
