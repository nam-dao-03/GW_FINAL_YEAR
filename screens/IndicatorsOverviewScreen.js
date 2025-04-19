import { ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../utils/Colors";
import Heading from "../components/IndicatorsOverviewScreen/Heading";
import ContinueButton from "../components/shared/ContinueButton";
import CaloriesBoard from "../components/IndicatorsOverviewScreen/CaloriesBoard";
import BodyMassBoard from "../components/IndicatorsOverviewScreen/BodyMassBoard";
import WaterIntakeBoard from "../components/IndicatorsOverviewScreen/WaterIntakeBoard";
import useIndicators from "../hooks/useIndicators";
import {
  BREAKFAST,
  DINNER,
  GAIN_MORE_WEIGHT,
  GAIN_WEIGHT,
  LOSE_MORE_WEIGHT,
  LOSE_WEIGHT,
  LUNCH,
  MAINTAIN_WEIGHT,
  SNACK,
} from "../utils/constants";
import { User } from "../database/entities/User";
import { DailyNutrition } from "../database/entities/DailyNutrition";
import { calculateMacronutrientNeeded } from "../utils/Nutrition";
import { alertNotification, generateRandomString } from "../utils/Common";
import useAppContext from "../hooks/useAppContext";
import { appActions } from "../context/app";
import {
  dailyNutritionListFakeData,
  foodList,
  foodListDefault,
} from "../utils/FakeData";
import { WaterIntake } from "../database/entities/WaterIntake";
import Spacing from "../utils/Spacing";
import { Meal } from "../database/entities/Meal";
import { vietnameseIngredientsByRegion, workoutExercise } from "../data/Data";
import { removeSeconds } from "../utils/Date";
import {
  calculateNotifications,
  scheduleDailyNotification,
} from "../utils/Notification";
export default function IndicatorsOverviewScreen({ navigation }) {
  const [state, dispatch] = useAppContext();
  const {
    age,
    gender,
    BMI,
    TDEE,
    statusBMI,
    target,
    targetWeight,
    height,
    weight,
    waterIntakeVolume,
    localDate,
    formattedShortDate,
    additionCaloriesNeed,
    numberOfDay,
    minExerPerDay,
    dayExerPerWeek,
  } = useIndicators();
  const headingCaloriesMap = {
    [LOSE_MORE_WEIGHT]: `Caloric Needs for Losing Weight (TDEE - ${Math.abs(
      additionCaloriesNeed
    )})`,
    [LOSE_WEIGHT]: `Caloric Needs for Losing Weight (TDEE - ${Math.abs(
      additionCaloriesNeed
    )})`,
    [MAINTAIN_WEIGHT]: "Caloric Needs for Weight Maintenance (TDEE)",
    [GAIN_WEIGHT]: `Caloric Needs for Weight Gain (TDEE + ${Math.abs(
      additionCaloriesNeed
    )})`,
    [GAIN_MORE_WEIGHT]: `Caloric Needs for Weight Gain (TDEE + ${Math.abs(
      additionCaloriesNeed
    )})`,
  };
  async function workWithDB() {
    const userId = generateRandomString();
    const bedTime = "23:00:00";
    const wakeUpTime = "07:00:00";
    const waterReminderInterval = 60;
    const isActiveWaterNotification = 1;
    const user = new User(
      userId,
      "",
      "",
      "",
      age,
      gender,
      target,
      String(targetWeight),
      bedTime,
      wakeUpTime,
      waterReminderInterval,
      isActiveWaterNotification,
      minExerPerDay,
      dayExerPerWeek
    );
    dispatch(appActions.createUser(user));
    const dailyNutritionId = generateRandomString();
    const targetCalories = TDEE + additionCaloriesNeed;
    const {
      carbs: targetCarbs,
      protein: targetProtein,
      fat: targetFat,
    } = calculateMacronutrientNeeded(targetCalories, target);
    const dailyNutrition = new DailyNutrition(
      dailyNutritionId,
      userId,
      weight,
      height,
      BMI,
      targetCalories,
      targetCarbs,
      targetProtein,
      targetFat,
      localDate
    );
    dispatch(appActions.createDailyNutrition(dailyNutrition));
    const waterIntakeId = generateRandomString();
    const waterPerCup = 200;
    const waterIntake = new WaterIntake(
      waterIntakeId,
      userId,
      localDate,
      waterPerCup,
      waterIntakeVolume
    );
    dispatch(appActions.createWaterIntake(waterIntake));
    vietnameseIngredientsByRegion.forEach((item) => {
      dispatch(appActions.createFood(item));
    });
    const mealName = [BREAKFAST, LUNCH, DINNER, SNACK];
    mealName.forEach((nameMeal) => {
      const idMeal = generateRandomString();
      const meal = new Meal(idMeal, userId, nameMeal, localDate);
      dispatch(appActions.createMeal(meal));
    });
    workoutExercise.forEach((item) => {
      const newWorkout = {
        ...item,
        userId,
      };
      dispatch(appActions.createWorkout(newWorkout));
    });
    //Working with Notification
    const notificationCount = calculateNotifications(
      bedTime,
      wakeUpTime,
      waterReminderInterval
    );
    const times = [];
    const [wakeHour, wakeMinute] = wakeUpTime.split(":").map(Number);
    const now = new Date();
    let start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      wakeHour,
      wakeMinute,
      0
    );
    start = new Date(start.getTime() + 10 * 60000); // cộng thêm 10 phút
    let current = start;

    for (let i = 0; i < notificationCount; i++) {
      const notificationTime = current.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const waterReminderNotification = {
        waterReminderNotificationId: generateRandomString(),
        userId,
        title: "💧 Drinking Water",
        body: `Don't forget to drink some water, buddy! 🌿 (${removeSeconds(
          notificationTime
        )})`,
        notificationTime,
      };
      times.push(waterReminderNotification);
      current = new Date(current.getTime() + waterReminderInterval * 60000);
    }
    dispatch(appActions.createWaterReminderNotificationList(times));
    //Nạp thông báo vào máy
    await scheduleDailyNotification(times);
  }

  // function workWithDBFakeData() {
  //   if (state.userList.length > 0) {
  //     alertNotification("none", "data đã tồn tại");
  //     return;
  //   }
  //   const user = new User("1234", "", "", "", "age", "gender", "target");
  //   dispatch(appActions.createUser(user));
  //   dailyNutritionListFakeData.forEach((item) =>
  //     dispatch(appActions.createDailyNutrition(item))
  //   );
  //   alertNotification("done", "add data success");
  // }

  function handleNavigateScreen() {
    workWithDB();
    navigation.navigate("MainScreens");
  }
  return (
    <ScrollView style={styles.screenContainer}>
      <Heading>{headingCaloriesMap[target]}</Heading>
      <CaloriesBoard
        TDEE={TDEE}
        additionCaloriesNeed={additionCaloriesNeed}
        targetDay={numberOfDay}
      />

      <Heading>Body Mass Index (BMI)</Heading>
      <BodyMassBoard
        BMI={BMI}
        height={height}
        weight={weight}
        statusBMI={statusBMI}
        date={formattedShortDate}
      />

      <Heading>How much water should you drink?</Heading>
      <WaterIntakeBoard waterIntake={waterIntakeVolume} />

      <ContinueButton
        onPress={handleNavigateScreen}
        extraStyle={styles.continueButton}
      />

      {/* <ContinueButton
        onPress={workWithDBFakeData}
        extraStyle={[styles.continueButton, { backgroundColor: "black" }]}
      /> */}
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  continueButton: {
    marginVertical: Spacing.LG,
  },
});
