import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import {
  BACKGROUND_FETCH_TASK,
  BREAKFAST,
  DINNER,
  LUNCH,
  SNACK,
} from "./constants";
import {
  calculateDatePerDay,
  generateLocalDateAndTime,
  getLocalDate,
} from "./Date";
import {
  createDailyNutrition,
  createMeal,
  createWaterIntake,
  getAllDataFormTable,
  openDatabase,
} from "../database/databaseHelper";
import {
  createDailyNutritionInstance,
  DailyNutrition,
} from "../database/entities/DailyNutrition";
import { generateRandomString } from "./Common";
import { User } from "../database/entities/User";
import {
  createWaterIntakeInstance,
  WaterIntake,
} from "../database/entities/WaterIntake";
import { Meal } from "../database/entities/Meal";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = getLocalDate();
  const dateTimeToday = generateLocalDateAndTime();
  const yesterday = calculateDatePerDay(now, -1);
  const db = openDatabase();
  const userList = getAllDataFormTable(db, User.TABLE_NAME);
  if (userList.length === 0) return;
  const dailyNutritionList = getAllDataFormTable(
    db,
    DailyNutrition.TABLE_NAME
  ).map((item) => createDailyNutritionInstance(item));

  // Kiểm tra xem có bản ghi nào của ngày hôm nay không
  const isDailyNutrition = dailyNutritionList.some(
    (dailyNutrition) => dailyNutrition.getDate() === now
  );
  console.warn(`Got background fetch call at date upper: ${dateTimeToday}`);
  console.warn(
    "background fetch upper>>>>>",
    dailyNutritionList.map((item) => item.getDate())
  );
  // Nếu đã có bản ghi của hôm nay, không tạo mới và trả về
  if (isDailyNutrition) {
    return BackgroundFetch.BackgroundFetchResult.NewData;
  }

  // Nếu chưa có bản ghi hôm nay, tạo mới từ ngày hôm qua
  const dailyNutritionId = generateRandomString();
  const yesterdayDailyNutrition = dailyNutritionList.find(
    (dailyNutrition) => dailyNutrition.getDate() === yesterday
  );
  const newDailyNutrition = createDailyNutritionInstance({
    ...yesterdayDailyNutrition,
    dailyNutritionId,
    dateDailyNutrition: now,
  });
  createDailyNutrition(db, newDailyNutrition);

  // Tạo bản ghi nước uống mới cho ngày hôm nay từ ngày hôm qua
  const waterIntakeList = getAllDataFormTable(db, WaterIntake.TABLE_NAME).map(
    (item) => createWaterIntakeInstance(item)
  );
  const waterIntakeId = generateRandomString();
  const waterPerCup = 200;
  const yesterdayWaterIntake = waterIntakeList.find(
    (item) => item.getDate() === yesterday
  );
  const newWaterIntake = createWaterIntakeInstance({
    ...yesterdayWaterIntake,
    waterIntakeId,
    waterIntakeDate: now,
    waterPerCup,
  });
  createWaterIntake(db, newWaterIntake);
  const { userId } = yesterdayDailyNutrition;
  const mealName = [BREAKFAST, LUNCH, DINNER, SNACK];
  mealName.forEach((nameMeal) => {
    const idMeal = generateRandomString();
    const meal = new Meal(idMeal, userId, nameMeal, now);
    createMeal(db, meal);
  });
  console.warn(
    `Got background fetch call at date: ${dateTimeToday}, ${newDailyNutrition}, ${newWaterIntake}`
  );
  console.warn(
    "background fetch down>>>>>",
    dailyNutritionList.map((item) => item.getDate())
  );

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export { registerBackgroundFetchAsync, unregisterBackgroundFetchAsync };
