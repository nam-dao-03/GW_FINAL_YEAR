import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderNavigation from "../../../components/shared/HeaderNavigation";
import useAppContext from "../../../hooks/useAppContext";
import { appActions } from "../../../context/app";
import { getLocalDate } from "../../../utils/Date";
import KeyboardAvoidingWrapper from "../../../components/shared/KeyboardAvoidingWrapper";
import colors from "../../../utils/Colors";
import Spacing from "../../../utils/Spacing";
import Typography from "../../../utils/Typography";
import {
  FITNESS_PARAMETERS,
  getGoalTitle,
  MAINTAIN_WEIGHT,
} from "../../../utils/constants";
import BottomExtraPaddingScreen from "../../../components/shared/BottomExtraPaddingScreen";
import ModalUpdateBMRMeasure from "../../../components/shared/ModalUpdateBMRMeasure";
export default function UpdateBMRScreen({ navigation }) {
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      bottomTabNavigation.setOptions({
        tabBarStyle: { display: "none" },
      });
      navigation.setOptions({
        header: () => <HeaderNavigation title="Update BMR" />,
      });
      appDispatch(appActions.setFalseShowFAB());
    }, [navigation])
  );
  const [appState, appDispatch] = useAppContext();
  const { userList, dailyNutritionList, waterIntakeList } = appState;
  const [isModalUpdateBMRMeasure, setIsModalUpdateBMRMeasure] = useState(false);
  const [keyboardType, setKeyboardType] = useState("number-pad");
  const [fitnessParameter, setFitnessParameter] = useState("");
  const [defaultValue, setDefaultValue] = useState();
  const user = userList[0];
  const dailyNutrition = dailyNutritionList.find(
    (item) => item.getDate() === getLocalDate()
  );
  const waterIntake = waterIntakeList.find(
    (item) => item.getDate() === getLocalDate()
  );

  const measureItemList = useMemo(
    () => [
      {
        title: "Kcal/Day",
        value: `${dailyNutrition.targetCalories || 1} kcal`,
        onPress: () => {},
      },
      {
        title: "Height",
        value: `${dailyNutrition.height || 1} cm`,

        onPress: () => {
          handleOpenModalBMRMeasure(
            FITNESS_PARAMETERS.HEIGHT,
            Number(dailyNutrition.height || 1)
          );
          setKeyboardType("number-pad");
        },
      },
      {
        title: "Weight",
        value: `${dailyNutrition.weight || 1} kg`,
        onPress: () => {
          handleOpenModalBMRMeasure(
            FITNESS_PARAMETERS.WEIGHT,
            Number(dailyNutrition.weight || 1)
          );
          setKeyboardType("default");
        },
      },
      {
        title: "Age",
        value: `${user.age || 1} years`,
        onPress: () => {
          handleOpenModalBMRMeasure(
            FITNESS_PARAMETERS.AGE,
            Number(user.age || 1)
          );
          setKeyboardType("number-pad");
        },
      },
      {
        title: "Gender",
        value: `${user.gender === "male" ? "Male" : "Female"}`,
        onPress: () =>
          handleOpenModalBMRMeasure(FITNESS_PARAMETERS.GENDER, user.gender),
      },
      {
        title: "Minutes Exercise Per Day",
        value: `${user.minExerPerDay || 1} mins`,
        onPress: () => {
          handleOpenModalBMRMeasure(
            FITNESS_PARAMETERS.MINS_EXER_PER_DAY,
            Number(user.minExerPerDay || 1)
          );
          setKeyboardType("number-pad");
        },
      },
      {
        title: "Day Exercise Per Week",
        value: `${user.dayExerPerWeek || 1} days`,
        onPress: () => {
          handleOpenModalBMRMeasure(
            FITNESS_PARAMETERS.DAY_EXER_PER_WEEK,
            Number(user.dayExerPerWeek || 1)
          );
          setKeyboardType("number-pad");
        },
      },
    ],
    [dailyNutrition, user]
  );

  function handleOpenModalBMRMeasure(fitnessParameter, defaultValue) {
    setDefaultValue(defaultValue);
    setFitnessParameter(fitnessParameter);
    setIsModalUpdateBMRMeasure(true);
    setKeyboardType("default");
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.screen}>
          <MeasureItem
            title="Target"
            value={getGoalTitle(user.target)}
            onPress={() =>
              handleOpenModalBMRMeasure(FITNESS_PARAMETERS.TARGET, user.target)
            }
          />
          {user.target !== MAINTAIN_WEIGHT && (
            <MeasureItem
              title="Target Weight"
              value={`${user.targetWeight} kg`}
              onPress={() =>
                handleOpenModalBMRMeasure(
                  FITNESS_PARAMETERS.TARGET_WEIGHT,
                  Number(user.targetWeight || 0)
                )
              }
            />
          )}
          <MeasureItem
            title={"Water Intake Volume"}
            value={`${waterIntake.waterIntakeVolume} ml`}
            onPress={() => {}}
          />
          {measureItemList.map((item, index) => (
            <MeasureItem
              key={index}
              title={item.title}
              value={item.value}
              onPress={item.onPress}
            />
          ))}
          <BottomExtraPaddingScreen />
        </ScrollView>
        <ModalUpdateBMRMeasure
          isVisible={isModalUpdateBMRMeasure}
          onBackdropPress={setIsModalUpdateBMRMeasure}
          fitnessParameter={fitnessParameter}
          defaultValue={defaultValue}
          defaultObj={{ user, dailyNutrition, waterIntake }}
          keyboardType={keyboardType}
        />
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  measureItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.LG,
    paddingVertical: Spacing.MD,
    backgroundColor: colors.whiteColor,
    marginHorizontal: Spacing.MD,
    borderRadius: Spacing.MD,
    marginTop: Spacing.MD,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  measureItemTitle: {
    color: colors.textColor,
    fontSize: Typography.MD,
  },
  measureItemValue: {
    color: colors.descriptionTextColor,
    fontSize: Typography.MD,
  },
});

function MeasureItem({ title, value, onPress }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [{ opacity: 0.7 }, styles.measureItem] : [styles.measureItem]
      }
      onPress={onPress}
    >
      <Text style={styles.measureItemTitle}>{title}</Text>
      <Text style={styles.measureItemValue}>{value}</Text>
    </Pressable>
  );
}
