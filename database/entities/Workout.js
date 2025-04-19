import { User } from "./User";
class Workout {
  static TABLE_NAME = "Workout";
  static ID_COLUMN = "workoutId";
  static DATE_COLUMN = "workoutDate";
  static EXERCISE_NAME_COLUMN = "exerciseName";
  static DURATION_COLUMN = "duration";
  static CALORIES_COLUMN = "calories";
  static IS_CREATED_BY_USER_COLUMN = "isCreatedByUser";
  static CREATE_WORKOUT_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS ${Workout.TABLE_NAME} (
  ${Workout.ID_COLUMN} TEXT PRIMARY KEY,
  ${User.ID_COLUMN} TEXT,
  ${Workout.DATE_COLUMN} TEXT,
  ${Workout.EXERCISE_NAME_COLUMN} TEXT,
  ${Workout.DURATION_COLUMN} INTEGER,
  ${Workout.CALORIES_COLUMN} REAL,
  ${Workout.IS_CREATED_BY_USER_COLUMN} REAL,
  FOREIGN KEY (${User.ID_COLUMN}) REFERENCES ${User.TABLE_NAME}(${User.ID_COLUMN})
  );
`;
  constructor(
    workoutId,
    userId,
    workoutDate,
    exerciseName,
    duration,
    calories,
    isCreatedByUser
  ) {
    this.workoutId = workoutId;
    this.userId = userId;
    this.workoutDate = workoutDate;
    this.exerciseName = exerciseName;
    this.duration = duration;
    this.calories = calories;
    this.isCreatedByUser = isCreatedByUser;
  }
  // Phương thức để lấy workoutId
  getWorkoutId() {
    return this.workoutId;
  }

  // Phương thức để thay đổi workoutId
  setWorkoutId(workoutId) {
    this.workoutId = workoutId;
  }

  // Phương thức để lấy userId
  getUserId() {
    return this.userId;
  }

  // Phương thức để thay đổi userId
  setUserId(userId) {
    this.userId = userId;
  }

  // Phương thức để lấy date
  getDate() {
    return this.workoutDate;
  }

  // Phương thức để thay đổi date
  setDate(workoutDate) {
    this.workoutDate = workoutDate;
  }

  // Phương thức để lấy exerciseName
  getExerciseName() {
    return this.exerciseName;
  }

  // Phương thức để thay đổi exerciseName
  setExerciseName(exerciseName) {
    this.exerciseName = exerciseName;
  }

  // Phương thức để lấy duration
  getDuration() {
    return this.duration;
  }

  // Phương thức để thay đổi duration
  setDuration(duration) {
    this.duration = duration;
  }

  // Phương thức để lấy calories
  getCalories() {
    return this.calories;
  }

  // Phương thức để thay đổi calories
  setCalories(calories) {
    this.calories = calories;
  }

  getIsCreatedByUser() {
    return this.isCreatedByUser;
  }

  setIsCreatedByUser(isCreatedByUser) {
    this.isCreatedByUser = isCreatedByUser;
  }
}

function createWorkoutInstance(workout) {
  return Object.assign(new Workout(), workout);
}

export { Workout, createWorkoutInstance };
