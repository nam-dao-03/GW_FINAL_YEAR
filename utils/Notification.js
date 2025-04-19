import * as Notifications from "expo-notifications";
import { getHour, getMinute } from "./Date";
const scheduleDailyNotification = async (notificationList) => {
  await Notifications.cancelAllScheduledNotificationsAsync(); // Hủy tất cả thông báo đã lên lịch trước đó
  notificationList.forEach(async (item) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: item.title,
        body: item.body,
        sound: "happy_bells_notification.wav",
      },
      trigger: {
        hour: getHour(item.notificationTime),
        minute: getMinute(item.notificationTime),
        repeats: true,
        type: "daily",
      },
    });
  });
  console.log("Đã lên lịch thông báo hàng ngày");
};

const getAllScheduledNotifications = async () => {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  return scheduled;
};

const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log("Đã hủy tất cả thông báo đã lên lịch");
};

function calculateNotifications(bedTime, wakeUpTime, interval) {
  function timeStringToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const bedTimeMinutes = timeStringToMinutes(bedTime);
  const wakeUpTimeMinutes = timeStringToMinutes(wakeUpTime);

  // Nếu bedTime nhỏ hơn wakeUpTime, tức là qua ngày hôm sau
  let totalMinutes;
  if (bedTimeMinutes <= wakeUpTimeMinutes) {
    totalMinutes = 24 * 60 - wakeUpTimeMinutes + bedTimeMinutes;
  } else {
    totalMinutes = bedTimeMinutes - wakeUpTimeMinutes;
  }

  // Tính số lần thông báo
  const notificationsCount = Math.floor(totalMinutes / interval);

  return notificationsCount;
}

export {
  scheduleDailyNotification,
  cancelAllNotifications,
  calculateNotifications,
  getAllScheduledNotifications,
};
