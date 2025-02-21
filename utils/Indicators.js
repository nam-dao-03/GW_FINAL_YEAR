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
  return Math.floor(BMR * TDEEFactor);
}

function calculateWaterIntake(weight, exerciseMinutes) {
  // Tính lượng nước bổ sung từ thời gian tập luyện
  const additionalWater = (exerciseMinutes / 30) * 12; // Đơn vị: oz

  // Tính tổng lượng nước cần thiết theo công thức
  const totalWaterIntake = (weight + additionalWater) * 0.03 * 1000; // Đổi từ oz sang lít sang ml

  return Math.floor(totalWaterIntake);
}

export {
  calculatorBMI,
  classifyBMI,
  calculatorBMR,
  getTDEEFactor,
  calculatorTDEE,
  calculateWaterIntake,
};
