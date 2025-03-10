import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { BACKGROUND_FETCH_TASK } from "./constants";
import {
  calculateDatePerDay,
  generateLocalDateAndTime,
  getLocalDate,
} from "./Date";
import {
  createDailyNutrition,
  getAllDataFormTable,
  openDatabase,
} from "../database/databaseHelper";
import {
  createDailyNutritionInstance,
  DailyNutrition,
} from "../database/entities/DailyNutrition";
import { generateRandomString } from "./Common";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = getLocalDate();
  const dateTimeToday = generateLocalDateAndTime();
  const yesterday = calculateDatePerDay(now, -1);
  const db = openDatabase();
  const dailyNutritionList = getAllDataFormTable(
    db,
    DailyNutrition.TABLE_NAME
  ).map((item) => createDailyNutritionInstance(item));
  // Kiểm tra xem có bản ghi nào của ngày hôm nay không
  const isDailyNutrition = dailyNutritionList.some(
    (dailyNutrition) => dailyNutrition.getDate() === now
  );
  console.log(`Got background fetch call at date: ${dateTimeToday}`);
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
    consumedCalories: 0,
    consumedCarbs: 0,
    consumedFat: 0,
    consumedProtein: 0,
  });
  createDailyNutrition(db, newDailyNutrition);
  console.log(
    `Got background fetch call at date: ${dateTimeToday}, ${newDailyNutrition}`
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
