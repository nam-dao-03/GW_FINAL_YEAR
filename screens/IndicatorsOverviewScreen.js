import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../utils/Colors";
import Heading from "../components/IndicatorsOverviewScreen/Heading";
import ContinueButton from "../components/ContinueButton";
import CaloriesBoard from "../components/IndicatorsOverviewScreen/CaloriesBoard";
import BodyMassBoard from "../components/IndicatorsOverviewScreen/BodyMassBoard";
import WaterIntakeBoard from "../components/IndicatorsOverviewScreen/WaterIntakeBoard";
import useIndicators from "../hooks/useIndicators";
export default function IndicatorsOverviewScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Indicators Overview",
      headerStyle: {
        backgroundColor: colors.primaryColor,
      },
      headerBackTitle: "Back",
      headerTintColor: colors.whiteColor,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
    });
  }, []);

  const { BMI, TDEE, statusBMI, target, height, weight, waterIntake, date } =
    useIndicators();
  console.log(useIndicators());
  function handleNavigateScreen() {
    navigation.navigate("MainScreens");
  }

  return (
    <ScrollView style={styles.screenContainer}>
      <Heading>Calories needed to keep your weight stable (TDEE)</Heading>
      <CaloriesBoard TDEE={TDEE} target={target} targetDay={52} />

      <Heading>Body Mass Index (BMI)</Heading>
      <BodyMassBoard
        BMI={BMI}
        height={height}
        weight={weight}
        statusBMI={statusBMI}
        date={date}
      />

      <Heading>How much water should you drink?</Heading>
      <WaterIntakeBoard waterIntake={waterIntake} />

      <ContinueButton
        onPress={handleNavigateScreen}
        extraStyle={styles.continueButton}
      />
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
