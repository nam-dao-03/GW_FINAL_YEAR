import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, ScrollView, View } from "react-native";
import HeaderNavigation from "../../components/shared/HeaderNavigation";
import Typography from "../../utils/Typography";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import TextInputContainer from "../../components/shared/TextInputContainer";
import ContinueButton from "../../components/shared/ContinueButton";
import {
  alertNotification,
  convertToNumber,
  generateRandomString,
  isValidNumber,
} from "../../utils/Common";
import { Workout } from "../../database/entities/Workout";
import useAppContext from "../../hooks/useAppContext";
import { getLocalDate } from "../../utils/Date";
import { appActions } from "../../context/app";
import { useToast } from "react-native-toast-notifications";
import KeyboardAvoidingWrapper from "../../components/shared/KeyboardAvoidingWrapper";

export default function CreateWorkoutScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => <HeaderNavigation title="Create Workout" />,
      });
    }, [])
  );
  const toast = useToast();
  const [appState, appDispatch] = useAppContext();
  const { dailyNutritionList } = appState;
  const dailyNutritionToday = dailyNutritionList.find(
    (item) => item.getDate() === getLocalDate()
  );
  const { userId } = dailyNutritionToday || {};
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDuration, setExerciseDuration] = useState("");
  const [exerciseCalories, setExerciseCalories] = useState("");
  const textInputContainerList = [
    {
      title: "Exercise name",
      placeholder: "Name",
      value: exerciseName,
      maxLength: 99,
      onChangeText: (value) => setExerciseName(value),
      style: {},
    },
    {
      title: "Duration",
      placeholder: "Minutes",
      value: exerciseDuration,
      maxLength: 99,
      onChangeText: (value) => setExerciseDuration(value),
      style: { marginTop: Spacing.XS },
    },
    {
      title: "Calories",
      placeholder: "Calories",
      value: exerciseCalories,
      maxLength: 99,
      onChangeText: (value) => setExerciseCalories(value),
      style: { marginTop: Spacing.XS },
    },
  ];
  function handlerCreateWorkout() {
    const validationRules = [
      {
        condition: !exerciseName,
        title: "Invalid Exercise Name",
        message: "Please try again with Exercise Name",
      },
      {
        condition:
          !exerciseDuration ||
          convertToNumber(exerciseDuration) < 0 ||
          convertToNumber(exerciseDuration) > 999 ||
          !isValidNumber(exerciseDuration),
        title: "Invalid Duration",
        message: "Please try again with Duration",
      },
      {
        condition:
          !exerciseCalories ||
          convertToNumber(exerciseCalories) < 0 ||
          !isValidNumber(exerciseCalories),
        title: "Invalid Calories",
        message: "Please try again with Calories",
      },
    ];

    for (const rule of validationRules) {
      if (rule.condition) {
        alertNotification(rule.title, rule.message);
        return;
      }
    }
    const workoutId = generateRandomString();
    const workoutDate = null;
    const isCreatedByUser = 1;
    const newWorkout = new Workout(
      workoutId,
      userId,
      workoutDate,
      exerciseName,
      convertToNumber(exerciseDuration),
      convertToNumber(exerciseCalories),
      isCreatedByUser
    );
    appDispatch(appActions.createWorkout(newWorkout));
    toast.show("Create Workout successful", { type: "success" });
    navigation.goBack();
  }
  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.flex}>
          <Text style={styles.title}>Workout information</Text>
          <View style={styles.inputsContainer}>
            {textInputContainerList.map((item, index) => (
              <TextInputContainer
                key={index}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                maxLength={item.maxLength}
                onChangeText={item.onChangeText}
                style={item.style}
              />
            ))}
          </View>
          <ContinueButton
            extraStyle={{ marginTop: Spacing.SM }}
            onPress={handlerCreateWorkout}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    fontSize: Typography.LG,
    color: colors.textColor,
    marginVertical: Spacing.MD,
    marginHorizontal: Spacing.SM,
  },
  inputsContainer: {
    padding: Spacing.MD,
    borderRadius: Spacing.MD,
    backgroundColor: colors.whiteColor,
    marginHorizontal: Spacing.SM,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
});
