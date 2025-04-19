class User {
  static TABLE_NAME = "User";
  static ID_COLUMN = "userId";
  static NAME_COLUMN = "name";
  static EMAIL_COLUMN = "email";
  static PASSWORD_COLUMN = "password";
  static AGE_COLUMN = "age";
  static GENDER_COLUMN = "gender";
  static TARGET_COLUMN = "target";
  static TARGET_WEIGHT_COLUMN = "targetWeight";
  static BED_TIME_COLUMN = "bedTime";
  static WAKE_UP_TIME_COLUMN = "wakeUpTime";
  static WATER_REMINDER_INTERVAL_COLUMN = "waterReminderInterval";
  static IS_ACTIVE_WATER_NOTIFICATION_COLUMN = "isActiveWaterNotification";
  static MIN_EXER_PER_DAY_COLUMN = "minExerPerDay";
  static DAY_EXER_PER_WEEK_COLUMN = "dayExerPerWeek";

  static CREATE_USER_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${User.TABLE_NAME} (
      ${User.ID_COLUMN} TEXT PRIMARY KEY,
      ${User.EMAIL_COLUMN} TEXT,
      ${User.NAME_COLUMN} TEXT,
      ${User.PASSWORD_COLUMN} TEXT,
      ${User.AGE_COLUMN} INTEGER,
      ${User.GENDER_COLUMN} TEXT,
      ${User.TARGET_COLUMN} TEXT,
      ${User.TARGET_WEIGHT_COLUMN} TEXT,
      ${User.BED_TIME_COLUMN} TEXT,
      ${User.WAKE_UP_TIME_COLUMN} TEXT,
      ${User.WATER_REMINDER_INTERVAL_COLUMN} INTEGER,
      ${User.IS_ACTIVE_WATER_NOTIFICATION_COLUMN} INTEGER,
      ${User.MIN_EXER_PER_DAY_COLUMN} INTEGER,
      ${User.DAY_EXER_PER_WEEK_COLUMN} INTEGER
    );
  `;

  constructor(
    userId,
    name,
    email,
    password,
    age,
    gender,
    target,
    targetWeight,
    bedTime,
    wakeUpTime,
    waterReminderInterval,
    isActiveWaterNotification,
    minExerPerDay,
    dayExerPerWeek
  ) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
    this.gender = gender;
    this.target = target;
    this.targetWeight = targetWeight;
    this.bedTime = bedTime;
    this.wakeUpTime = wakeUpTime;
    this.waterReminderInterval = waterReminderInterval;
    this.isActiveWaterNotification = isActiveWaterNotification;
    this.minExerPerDay = minExerPerDay;
    this.dayExerPerWeek = dayExerPerWeek;
  }

  getUserId() {
    return this.userId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }

  getGender() {
    return this.gender;
  }

  setGender(gender) {
    this.gender = gender;
  }

  getTarget() {
    return this.target;
  }

  setTarget(target) {
    this.target = target;
  }

  getTargetWeight() {
    return this.targetWeight;
  }

  setTargetWeight(targetWeight) {
    this.targetWeight = targetWeight;
  }

  getAge() {
    return this.age;
  }

  setAge(age) {
    this.age = age;
  }

  getBedTime() {
    return this.bedTime;
  }

  setBedTime(bedTime) {
    this.bedTime = bedTime;
  }

  getWakeUpTime() {
    return this.wakeUpTime;
  }

  setWakeUpTime(wakeUpTime) {
    this.wakeUpTime = wakeUpTime;
  }

  getWaterReminderInterval() {
    return this.waterReminderInterval;
  }

  setWaterReminderInterval(waterReminderInterval) {
    this.waterReminderInterval = waterReminderInterval;
  }

  getIsActiveWaterNotification() {
    return this.isActiveWaterNotification;
  }

  setIsActiveWaterNotification(isActiveWaterNotification) {
    this.isActiveWaterNotification = isActiveWaterNotification;
  }

  getMinExerPerDay() {
    return this.minExerPerDay;
  }

  setMinExerPerDay(minExerPerDay) {
    this.minExerPerDay = minExerPerDay;
  }

  getDayExerPerWeek() {
    return this.dayExerPerWeek;
  }

  setDayExerPerWeek(dayExerPerWeek) {
    this.dayExerPerWeek = dayExerPerWeek;
  }
}

function createUserInstance(user) {
  return Object.assign(new User(), user);
}

export { User, createUserInstance };
