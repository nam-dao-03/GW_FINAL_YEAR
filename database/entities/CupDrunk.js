import { WaterIntake } from "./WaterIntake";

class CupDrunk {
  // Các hằng số cột trong cơ sở dữ liệu
  static TABLE_NAME = "CupDrunk";
  static ID_COLUMN = "cupDrunkId";
  static WATER_PER_CUP_COLUMN = "waterPerCup";
  static DATE_COLUMN = "cupDrunkDate";

  // Câu lệnh tạo bảng trong SQLite
  static CREATE_CUP_DRUNK_TABLE_QUERY = `
    CREATE TABLE IF NOT EXISTS ${CupDrunk.TABLE_NAME} (
      ${CupDrunk.ID_COLUMN} TEXT PRIMARY KEY,
      ${WaterIntake.ID_COLUMN} TEXT,
      ${CupDrunk.WATER_PER_CUP_COLUMN} INTEGER,
      ${CupDrunk.DATE_COLUMN} TEXT,
      FOREIGN KEY (${WaterIntake.ID_COLUMN}) REFERENCES 
      ${WaterIntake.TABLE_NAME}(${WaterIntake.ID_COLUMN})
    );
  `;

  // Constructor
  constructor(cupDrunkId, waterIntakeId, waterPerCup, cupDrunkDate) {
    this.cupDrunkId = cupDrunkId;
    this.waterIntakeId = waterIntakeId;
    this.waterPerCup = waterPerCup;
    this.cupDrunkDate = cupDrunkDate;
  }

  // Getter và Setter cho cupDrunkId
  getCupDrunkId() {
    return this.cupDrunkId;
  }

  setCupDrunkId(cupDrunkId) {
    this.cupDrunkId = cupDrunkId;
  }

  // Getter và Setter cho waterIntakeId
  getWaterIntakeId() {
    return this.waterIntakeId;
  }

  setWaterIntakeId(waterIntakeId) {
    this.waterIntakeId = waterIntakeId;
  }

  // Getter và Setter cho waterPerCup
  getWaterPerCup() {
    return this.waterPerCup;
  }

  setWaterPerCup(waterPerCup) {
    this.waterPerCup = waterPerCup;
  }

  // Getter và Setter cho cupDrunkDate
  getDate() {
    return this.cupDrunkDate;
  }

  setDate(cupDrunkDate) {
    this.cupDrunkDate = cupDrunkDate;
  }
}

function createCupDrunkInstance(cupDrunk) {
  return Object.assign(new CupDrunk(), cupDrunk);
}

export { CupDrunk, createCupDrunkInstance };
