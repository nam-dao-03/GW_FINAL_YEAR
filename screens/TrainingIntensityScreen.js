import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import colors from "../utils/Colors";
import usePersonContext from "../hooks/usePersonContext";
import { useCallback, useMemo } from "react";
import {
  HIGH_INTENSITY,
  LOW_INTENSITY,
  MODERATE_INTENSITY,
  VERY_HIGH_INTENSITY,
  VERY_LOW_INTENSITY,
} from "../utils/constants";

export default function TrainingIntensityScreen() {
  const [state, dispatch] = usePersonContext();
  const changeTrainingIntensityInput = useCallback(
    (value) => changeTrainingIntensityInput(value, dispatch),
    [dispatch]
  );
  const { trainingIntensity } = state;

  const training_intensity_list = useMemo(() => [
    {
      heading: "Very low",
      description:
        "Mostly sitting still, very little movement. Spends most of the day doing sedentary activities such as office work, studying, or watching TV.",
      selected: trainingIntensity === VERY_LOW_INTENSITY,
      status: VERY_LOW_INTENSITY,
      onPress: changeTrainingIntensityInput,
    },
    {
      heading: "Low",
      description:
        "Light physical activity throughout the day, exercises lightly or irregularly.",
      selected: trainingIntensity === LOW_INTENSITY,
      status: LOW_INTENSITY,
      onPress: changeTrainingIntensityInput,
    },
    {
      heading: "Moderate",
      description:
        "Regular physical activity and moderate exercise. Daily work involves movement or physical activity.",
      selected: trainingIntensity === MODERATE_INTENSITY,
      status: MODERATE_INTENSITY,
      onPress: changeTrainingIntensityInput,
    },
    {
      heading: "High",
      description:
        "Engages in intense and regular physical activity. Follows a strict sports or exercise regimen or has a physically demanding job.",
      selected: trainingIntensity === HIGH_INTENSITY,
      status: HIGH_INTENSITY,
      onPress: changeTrainingIntensityInput,
    },
    {
      heading: "Very high",
      description:
        "Very high intensity of physical activity, including both intense training and a physically demanding job.",
      selected: trainingIntensity === VERY_HIGH_INTENSITY,
      status: VERY_HIGH_INTENSITY,
      onPress: changeTrainingIntensityInput,
    },
  ]);

  return (
    <SafeAreaView styles={styles.screenContainer}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.screenHeading}>
            What is the intensity level of your workout?
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  innerContainer: {
    flex: 1,
    gap: 20,
    marginBottom: 40,
  },
  screenHeading: {
    marginTop: 20,
    marginHorizontal: "auto",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryColor,
  },
});
