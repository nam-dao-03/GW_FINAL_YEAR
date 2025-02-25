import { User } from "./User";
class WaterIntake {
  static TABLE_NAME = "WaterIntake";
  static ID_COLUMN = "waterIntakeId";
  static DATE_COLUMN = "dateWaterIntake";
  static CUP_DRUNK_COLUMN = "cupDrunk";
  static WATER_PER_CUP = "waterPerCup";
  static WATER_INTAKE_VOLUME_COLUMN = "waterIntakeVolume";

  static CREATE_WATER_INTAKE_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${WaterIntake.TABLE_NAME} (
    ${WaterIntake.ID_COLUMN} TEXT PRIMARY KEY,
    ${User.ID_COLUMN} TEXT,
    ${WaterIntake.DATE_COLUMN} TEXT,
    ${WaterIntake.CUP_DRUNK_COLUMN} INTEGER,
    ${WaterIntake.WATER_PER_CUP} INTEGER,
    ${WaterIntake.WATER_INTAKE_VOLUME_COLUMN} INTEGER,
    FOREIGN KEY (${User.ID_COLUMN}) REFERENCES 
    ${User.TABLE_NAME}(${User.ID_COLUMN})
    );
`;
  constructor(
    waterIntakeId,
    userId,
    dateWaterIntake,
    cupDrunk,
    waterPerCup,
    waterIntakeVolume
  ) {
    this.waterIntakeId = waterIntakeId;
    this.userId = userId;
    this.dateWaterIntake = dateWaterIntake;
    this.cupDrunk = cupDrunk;
    this.waterPerCup = waterPerCup;
    this.waterIntakeVolume = waterIntakeVolume;
  }
  // Phương thức lấy giá trị waterIntakeId
  getWaterIntakeId() {
    return this.waterIntakeId;
  }

  // Phương thức đặt giá trị waterIntakeId
  setWaterIntakeId(waterIntakeId) {
    this.waterIntakeId = waterIntakeId;
  }

  // Phương thức lấy giá trị userId
  getUserId() {
    return this.userId;
  }

  // Phương thức đặt giá trị userId
  setUserId(userId) {
    this.userId = userId;
  }

  // Phương thức lấy giá trị dateWaterIntake
  getDateWaterIntake() {
    return this.dateWaterIntake;
  }

  // Phương thức đặt giá trị dateWaterIntake
  setDateWaterIntake(dateWaterIntake) {
    this.dateWaterIntake = dateWaterIntake;
  }

  // Phương thức lấy giá trị cupDrunk
  getCupDrunk() {
    return this.cupDrunk;
  }

  // Phương thức đặt giá trị cupDrunk
  setCupDrunk(cupDrunk) {
    this.cupDrunk = cupDrunk;
  }

  getWaterPerCup() {
    return this.waterPerCup;
  }

  setWaterPerCup(waterPerCup) {
    this.waterPerCup = waterPerCup;
  }

  getWaterIntakeVolume() {
    return this.waterIntakeVolume;
  }

  setWaterIntakeVolume(waterIntakeVolume) {
    this.waterIntakeVolume = waterIntakeVolume;
  }
}

function createWaterIntakeInstance(newWaterIntake) {
  return Object.assign(new WaterIntake(), newWaterIntake);
}
export { WaterIntake, createWaterIntakeInstance };
