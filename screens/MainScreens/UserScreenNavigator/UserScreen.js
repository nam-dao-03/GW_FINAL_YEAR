import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { FontAwesome5 as FA5, Ionicons, Foundation } from "@expo/vector-icons/";
import colors from "../../../utils/Colors";
import HeaderNavigation from "../../../components/shared/HeaderNavigation";
import Sizes from "../../../utils/Size";
import { useFocusEffect } from "@react-navigation/native";
import useAppContext from "../../../hooks/useAppContext";
import { bottomTabStyle } from "../../../utils/Common";
import { appActions } from "../../../context/app";
import KeyboardAvoidingWrapper from "../../../components/shared/KeyboardAvoidingWrapper";
import BodyMassBoard from "../../../components/IndicatorsOverviewScreen/BodyMassBoard";
import useIndicators from "../../../hooks/useIndicators";
import PressableIcon from "../../../components/shared/PressableIcon";
import Spacing from "../../../utils/Spacing";
import Typography from "../../../utils/Typography";
import WaterIntakeBoard from "../../../components/UserScreen/WaterIntakeBoard";
import BottomExtraPaddingScreen from "../../../components/shared/BottomExtraPaddingScreen";
import MeasureBoard from "../../../components/shared/MeasureBoard";
import { formatToMonthDayYear, getLocalDate } from "../../../utils/Date";
import { classifyBMI } from "../../../utils/Indicators";
export default function UserScreen({ navigation }) {
  const [appState, appDispatch] = useAppContext();
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title="User"
            iconRight={
              <Ionicons
                name="settings-sharp"
                size={Sizes.MD}
                color={colors.whiteColor}
              />
            }
            headerLeft={false}
            actionRight={() => {
              navigation.navigate("SettingScreen");
            }}
          />
        ),
      });
      bottomTabNavigation.setOptions(bottomTabStyle);
      appDispatch(appActions.setTrueShowFAB());
    }, [navigation])
  );
  const { dailyNutritionList, waterIntakeList } = appState;
  const waterIntake = waterIntakeList.find(
    (item) => item.getDate() === getLocalDate()
  );
  const dailyNutrition = dailyNutritionList.find(
    (item) => item.getDate() === getLocalDate()
  );
  const statusBMI = classifyBMI(dailyNutrition?.bmi || "1");
  function handleNavigateUpdateBMRScreen() {
    navigation.navigate("UpdateBMRScreen");
  }

  function handleNavigateToWaterIntakeScreen() {}

  function handleNavigateToWaterNotificationScreen() {
    navigation.navigate("WaterReminderSettingScreen");
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <ScrollView styles={styles.flex}>
          <Heading
            title="Body Mass Index (BMI)"
            iconRight={
              <FA5 name="edit" size={Sizes.SM * 1.2} color={colors.textColor} />
            }
            iconActionRight={handleNavigateUpdateBMRScreen}
          />
          <BodyMassBoard
            BMI={dailyNutrition?.bmi || 1}
            height={dailyNutrition?.height || 1}
            weight={dailyNutrition?.weight || 1}
            statusBMI={statusBMI}
            date={formatToMonthDayYear(new Date(getLocalDate()))}
          />
          <Heading
            title="Water Intake Board"
            iconRight={
              <Ionicons
                name="notifications-sharp"
                size={Sizes.SM * 1.2}
                color={colors.textColor}
              />
            }
            iconActionRight={handleNavigateToWaterNotificationScreen}
          />
          <WaterIntakeBoard waterIntake={waterIntake?.waterIntakeVolume || 1} />
          <Heading
            title="Weight and Height Tracker"
            iconRight={
              <Foundation
                name="indent-more"
                size={Sizes.SM * 1.2}
                color={colors.textColor}
              />
            }
            iconActionRight={() => {}}
          />
          <MeasureBoard />
          <BottomExtraPaddingScreen />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    marginHorizontal: Spacing.LG,
    marginVertical: Spacing.MD,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: Typography.MD,
  },
});

function Heading({ title, iconRight, iconActionRight }) {
  return (
    <View style={styles.header}>
      <Text style={styles.heading}>{title}</Text>
      <PressableIcon
        onPress={iconActionRight}
        style={{ paddingTop: Sizes.XXS, paddingRight: Spacing.XS, padding: 0 }}
      >
        {iconRight}
      </PressableIcon>
    </View>
  );
}
