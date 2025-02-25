import { User } from "./User";
class Workout {
  static TABLE_NAME = "Workout";
  static ID_COLUMN = "workoutId";
  static DATE_COLUMN = "dateWorkout";
  static EXERCISE_NAME_COLUMN = "exerciseName";
  static DURATION_COLUMN = "duration";
  static CALORIES_COLUMN = "calories";
  static CREATE_WORKOUT_TABLE_QUERY = `
  CREATE TABLE IF NOT EXISTS ${Workout.TABLE_NAME} (
  ${Workout.ID_COLUMN} TEXT PRIMARY KEY,
  ${User.ID_COLUMN} TEXT,
  ${Workout.DATE_COLUMN} TEXT,
  ${Workout.EXERCISE_NAME_COLUMN} TEXT,
  ${Workout.DURATION_COLUMN} INTEGER,
  ${Workout.CALORIES_COLUMN} REAL,
  FOREIGN KEY (${User.ID_COLUMN}) REFERENCES ${User.TABLE_NAME}(${User.ID_COLUMN})
  );
`;
  constructor(
    workoutId,
    userId,
    dateWorkout,
    exerciseName,
    duration,
    calories
  ) {
    this.workoutId = workoutId;
    this.userId = userId;
    this.dateWorkout = dateWorkout;
    this.exerciseName = exerciseName;
    this.duration = duration;
    this.calories = calories;
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
  getDateWorkout() {
    return this.dateWorkout;
  }

  // Phương thức để thay đổi date
  setDate(dateWorkout) {
    this.dateWorkout = dateWorkout;
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
}

export { Workout };
