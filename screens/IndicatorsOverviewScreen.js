import { ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../utils/Colors";
import Heading from "../components/IndicatorsOverviewScreen/Heading";
import ContinueButton from "../components/ContinueButton";
import CaloriesBoard from "../components/IndicatorsOverviewScreen/CaloriesBoard";
import BodyMassBoard from "../components/IndicatorsOverviewScreen/BodyMassBoard";
import WaterIntakeBoard from "../components/IndicatorsOverviewScreen/WaterIntakeBoard";
import useIndicators from "../hooks/useIndicators";
import {
  GAIN_MORE_WEIGHT,
  GAIN_WEIGHT,
  LOSE_MORE_WEIGHT,
  LOSE_WEIGHT,
  MAINTAIN_WEIGHT,
} from "../utils/constants";
import { User } from "../database/entities/User";
import { DailyNutrition } from "../database/entities/DailyNutrition";
import { calculateMacronutrientNeeded } from "../utils/Nutrition";
import { alertNotification, generateRandomString } from "../utils/Common";
import useAppContext from "../hooks/useAppContext";
import { appActions } from "../context/app";
import { dailyNutritionListFakeData } from "../utils/FakeData";
import { WaterIntake } from "../database/entities/WaterIntake";
export default function IndicatorsOverviewScreen({ navigation }) {
  const [state, dispatch] = useAppContext();
  const {
    age,
    gender,
    BMI,
    TDEE,
    statusBMI,
    target,
    height,
    weight,
    waterIntakeVolume,
    localDate,
    formattedShortDate,
    additionCaloriesNeed,
    numberOfDay,
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
  function workWithDB() {
    const userId = generateRandomString();
    const user = new User(userId, "", "", "", age, gender, target);
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
      0,
      0,
      0,
      0,
      localDate
    );
    dispatch(appActions.createDailyNutrition(dailyNutrition));
    const waterIntakeId = generateRandomString();
    const waterPerCup = 200;
    const cupDrunk = 0;
    const waterIntake = new WaterIntake(
      waterIntakeId,
      userId,
      localDate,
      cupDrunk,
      waterPerCup,
      waterIntakeVolume
    );
    dispatch(appActions.createWaterIntake(waterIntake));
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
    marginVertical: 20,
  },
});
