import { User } from "./User";

class WaterReminderNotification {
  static TABLE_NAME = "WaterReminderNotification";
  static ID_COLUMN = "waterReminderNotificationId";
  static TITLE_COLUMN = "title";
  static BODY_COLUMN = "body";
  static NOTIFICATION_TIME_COLUMN = "notificationTime";

  static CREATE_WATER_REMINDER_NOTIFICATION_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${WaterReminderNotification.TABLE_NAME} (
    ${WaterReminderNotification.ID_COLUMN} TEXT PRIMARY KEY,
    ${User.ID_COLUMN} TEXT,
    ${WaterReminderNotification.TITLE_COLUMN} TEXT,
    ${WaterReminderNotification.BODY_COLUMN} TEXT,
    ${WaterReminderNotification.NOTIFICATION_TIME_COLUMN} TEXT,
    FOREIGN KEY (${User.ID_COLUMN}) REFERENCES 
    ${User.TABLE_NAME}(${User.ID_COLUMN})
    );
  `;

  constructor(
    waterReminderNotificationId,
    userId,
    title,
    body,
    notificationTime
  ) {
    this.waterReminderNotificationId = waterReminderNotificationId;
    this.userId = userId;
    this.title = title;
    this.body = body;
    this.notificationTime = notificationTime;
  }

  // Phương thức lấy giá trị waterReminderNotificationId
  getWaterReminderNotificationId() {
    return this.waterReminderNotificationId;
  }

  // Phương thức đặt giá trị waterReminderNotificationId
  setWaterReminderNotificationId(waterReminderNotificationId) {
    this.waterReminderNotificationId = waterReminderNotificationId;
  }

  // Phương thức lấy giá trị userId
  getUserId() {
    return this.userId;
  }

  // Phương thức đặt giá trị userId
  setUserId(userId) {
    this.userId = userId;
  }

  // Phương thức lấy giá trị title
  getTitle() {
    return this.title;
  }

  // Phương thức đặt giá trị title
  setTitle(title) {
    this.title = title;
  }

  // Phương thức lấy giá trị body
  getBody() {
    return this.body;
  }

  // Phương thức đặt giá trị body
  setBody(body) {
    this.body = body;
  }

  // Phương thức lấy giá trị notificationTime
  getNotificationTime() {
    return this.notificationTime;
  }

  // Phương thức đặt giá trị notificationTime
  setNotificationTime(notificationTime) {
    this.notificationTime = notificationTime;
  }
}

function createWaterReminderNotificationInstance(newWaterReminderNotification) {
  return Object.assign(
    new WaterReminderNotification(),
    newWaterReminderNotification
  );
}

export { WaterReminderNotification, createWaterReminderNotificationInstance };
