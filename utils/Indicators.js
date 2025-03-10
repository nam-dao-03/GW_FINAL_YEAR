import { CALORIES_PER_KILOGRAM, DAY_PER_WEEK } from "./constants";
function calculatorBMI(weight, height) {
  const BMI = weight / (height / 100) ** 2;
  return BMI.toFixed(2);
}

function classifyBMI(BMI) {
  let statusWeight = "";
  if (BMI < 18.5) {
    statusWeight = "Underweight";
  }
  if (BMI >= 18.5 && BMI <= 24.9) {
    statusWeight = "Normal";
  }
  if (BMI >= 25 && BMI <= 29.9) {
    statusWeight = "Overweight";
  }
  if (BMI >= 30) {
    statusWeight = "Obesity";
  }
  return statusWeight;
}

function calculatorBMR(person) {
  const { weight, height, age, gender } = person;
  if (gender === "male") {
    const BMR =
      88.362 +
      13.397 * Number(weight) +
      4.799 * Number(height) -
      5.677 * Number(age);
    return BMR;
  } else if (gender === "female") {
    const BMR =
      447.593 +
      9.247 * Number(weight) +
      3.098 * Number(height) -
      4.33 * Number(age);
    return BMR;
  }
}

function getTDEEFactor(minutesPerDay, daysPerWeek) {
  if (daysPerWeek <= 1) {
    return 1.2; // Ít vận động
  } else if (daysPerWeek <= 3) {
    if (minutesPerDay < 30) {
      return 1.2; // Ít vận động
    } else if (minutesPerDay <= 60) {
      return 1.375; // Tập nhẹ
    } else {
      return 1.375; // Tập nhẹ
    }
  } else if (daysPerWeek <= 5) {
    if (minutesPerDay < 30) {
      return 1.375; // Tập nhẹ
    } else if (minutesPerDay <= 60) {
      return 1.55; // Tập vừa
    } else {
      return 1.55; // Tập vừa
    }
  } else if (daysPerWeek <= 7) {
    if (minutesPerDay < 30) {
      return 1.55; // Tập vừa
    } else if (minutesPerDay <= 60) {
      return 1.725; // Tập nặng
    } else {
      return 1.9; // Tập rất nặng
    }
  } else {
    console.warn("Số ngày mỗi tuần không hợp lệ.");
    return null;
  }
}

function calculatorTDEE(BMR, TDEEFactor) {
  return Math.ceil(BMR * TDEEFactor);
}

function calculateWaterIntake(weight, exerciseMinutes) {
  // Tính lượng nước bổ sung từ thời gian tập luyện
  const additionalWater = (exerciseMinutes / 30) * 12; // Đơn vị: oz

  // Tính tổng lượng nước cần thiết theo công thức
  const totalWaterIntake = (weight + additionalWater) * 0.03 * 1000; // Đổi từ oz sang lít sang ml

  return Math.floor(totalWaterIntake);
}

function calculateAdditionalCalories(kgToGainPerDay) {
  const calories = (CALORIES_PER_KILOGRAM * kgToGainPerDay) / DAY_PER_WEEK;
  return calories;
}

function targetDay(targetWeight, weight, weightPerWeek) {
  const weightPerDay = weightPerWeek / DAY_PER_WEEK;
  const numberOfDay = Math.ceil((targetWeight - weight) / weightPerDay);
  return Math.abs(numberOfDay);
}

function calculateProgress(progress, target) {
  return Number((progress / target || 1).toFixed(3));
}

function calculateWaterVolumeConsumed(waterPerCup, cupDrunk) {
  return waterPerCup * cupDrunk;
}

function calculatePercentage(value, values) {
  const total = values.reduce((acc, num) => acc + num, 0);
  if (total === 0) return `${value} (0%)`; // Tránh chia cho 0
  const percentage = ((value / total) * 100).toFixed(1); // Làm tròn 1 số thập phân
  return `${percentage}%`;
}

function calculateNutrition(nutritionObj, quantityUnit) {
  const quantity = Number(quantityUnit.quantity);
  if (quantity === 0) {
    return {
      ...nutritionObj,
    };
  }

  if (nutritionObj.measurement === quantityUnit.chooseUnit) {
    const newNutritionObj = {
      ...nutritionObj,
      calories: formatFloatNumber(
        quantity *
          ((nutritionObj.calories / nutritionObj.averageNutritional) *
            nutritionObj.servingSize)
      ),
      carbs: formatFloatNumber(
        quantity *
          ((nutritionObj.carbs / nutritionObj.averageNutritional) *
            nutritionObj.servingSize)
      ),
      protein: formatFloatNumber(
        quantity *
          ((nutritionObj.protein / nutritionObj.averageNutritional) *
            nutritionObj.servingSize)
      ),
      fat: formatFloatNumber(
        quantity *
          ((nutritionObj.fat / nutritionObj.averageNutritional) *
            nutritionObj.servingSize)
      ),
    };
    return newNutritionObj;
  } else if (nutritionObj.unit === quantityUnit.chooseUnit) {
    const newNutritionObj = {
      ...nutritionObj,
      calories: formatFloatNumber(
        (quantity / nutritionObj.averageNutritional) * nutritionObj.calories
      ),
      carbs: formatFloatNumber(
        (quantity / nutritionObj.averageNutritional) * nutritionObj.carbs
      ),
      protein: formatFloatNumber(
        (quantity / nutritionObj.averageNutritional) * nutritionObj.protein
      ),
      fat: formatFloatNumber(
        (quantity / nutritionObj.averageNutritional) * nutritionObj.fat
      ),
    };

    return newNutritionObj;
  }
}
function formatFloatNumber(num) {
  if (Number.isInteger(num)) {
    return num;
  }

  const decimalPlaces = num.toString().split(".")[1]?.length || 0;

  if (decimalPlaces === 1) {
    return parseFloat(num.toFixed(1));
  } else if (decimalPlaces > 3) {
    return parseFloat(num.toFixed(3));
  }

  return num;
}
export {
  calculatorBMI,
  classifyBMI,
  calculatorBMR,
  getTDEEFactor,
  calculatorTDEE,
  calculateWaterIntake,
  calculateAdditionalCalories,
  targetDay,
  calculateProgress,
  calculateWaterVolumeConsumed,
  calculatePercentage,
  calculateNutrition,
  formatFloatNumber,
};
