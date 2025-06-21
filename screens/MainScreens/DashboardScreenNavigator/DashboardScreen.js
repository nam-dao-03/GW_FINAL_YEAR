import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import colors from "../../../utils/Colors";
import Calendar from "../../../components/DashboardScreen/Calendar";
import ProgressBoard from "../../../components/DashboardScreen/ProgressBoard";
import StatusWaterContainer from "../../../components/DashboardScreen/StatusWaterContainer";
import {
  alertNotification,
  bottomTabStyle,
  calTotalCupsArr,
  generateRandomString,
  showConfirmationDialog,
} from "../../../utils/Common";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  calculateDatePerDay,
  extractDate,
  formatDateToLocalVN,
  formatShortDate,
  formattedISODate,
  generateLocalDateAndTime,
  getLocalDate,
  getLocalTime,
  getRelativeDate,
} from "../../../utils/Date";
import { appActions } from "../../../context/app";
import useAppContext from "../../../hooks/useAppContext";
import { DailyNutrition } from "../../../database/entities/DailyNutrition";
import ModalCalendar from "../../../components/shared/ModalCalendar";
import { CupDrunk } from "../../../database/entities/CupDrunk";
import Spacing from "../../../utils/Spacing";
import Typography from "../../../utils/Typography";
import { useFocusEffect } from "@react-navigation/native";
import HeadingContainer from "../../../components/DashboardScreen/HeadingContainer";
import MealsContainer from "../../../components/DashboardScreen/MealsContainer";
import BottomExtraPaddingScreen from "../../../components/shared/BottomExtraPaddingScreen";
import WorkoutContainer from "../../../components/DashboardScreen/WorkoutContainer";
import ModalAddWorkout from "../../../components/WorkoutListScreen/ModalAddWorkout";
import {
  cancelAllNotifications,
  checkScheduledNotifications,
  getAllScheduledNotifications,
  scheduleDailyNotification,
} from "../../../utils/Notification";
import { useToast } from "react-native-toast-notifications";
import MeasureBoard from "../../../components/shared/MeasureBoard";
import { MAINTAIN_WEIGHT } from "../../../utils/constants";
const SET_MODAL_VISIBLE_TRUE = "set_modal_visible_true";
const SET_MODAL_VISIBLE_FALSE = "set_modal_visible_false";
const SET_SELECTED_DAILY_NUTRITION = "set_selected_daily_nutrition";
const SET_SELECTED_WATER_INTAKE = "set_selected_water_intake";
function reducerDashboard(state, action) {
  switch (action.type) {
    case SET_MODAL_VISIBLE_FALSE: {
      return {
        ...state,
        modalVisible: false,
      };
    }
    case SET_MODAL_VISIBLE_TRUE: {
      return {
        ...state,
        modalVisible: true,
      };
    }
    case SET_SELECTED_DAILY_NUTRITION: {
      return {
        ...state,
        selectedDailyNutrition: action.payload,
      };
    }
    case SET_SELECTED_WATER_INTAKE: {
      return {
        ...state,
        selectedWaterIntake: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const initialStateDashboard = {
  modalVisible: false,
  selectedDailyNutrition: null,
  selectedWaterIntake: null,
};
export default function DashboardScreen({ navigation }) {
  const [state, dispatch] = useAppContext();
  const [isModalAddWorkout, setIsModalAddWorkout] = useState(false);
  const [workout, setWorkout] = useState({});
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      bottomTabNavigation.setOptions(bottomTabStyle);
      dispatch(appActions.setTrueShowFAB());
    }, [navigation])
  );
  const [stateDashboard, dispatchDashboard] = useReducer(
    reducerDashboard,
    initialStateDashboard
  );
  const {
    dailyNutritionList,
    waterIntakeList,
    cupDrunkList,
    waterReminderNotificationList,
    userList,
    selectedDay,
  } = state;
  const user = userList[0];
  //lấy giá trị đầu tiên của dailyNutritionList
  const defaultDailyNutrition = dailyNutritionList[0];
  const defaultWaterIntake = waterIntakeList[0];
  //nếu có thì trả về, nếu không có thì gán giá trị mặc định bên trên, tránh lỗi xảy ra khi truy cập vào
  const dailyNutrition =
    stateDashboard.selectedDailyNutrition ||
    dailyNutritionList.find((item) => item.getDate() === selectedDay) ||
    defaultDailyNutrition;
  useEffect(() => {
    const dailyNutrition = dailyNutritionList.find(
      (item) => item.getDate() === selectedDay
    );
    dispatchDashboard({
      type: SET_SELECTED_DAILY_NUTRITION,
      payload: dailyNutrition,
    });
  }, [dailyNutritionList]);
  const waterIntake =
    stateDashboard.selectedWaterIntake ||
    waterIntakeList.find((item) => item.getDate() === selectedDay) ||
    defaultWaterIntake;
  const cupDrunkListToday = useMemo(() => {
    return cupDrunkList.filter(
      (item) => extractDate(item.getDate()) === state.selectedDay
    );
  }, [cupDrunkList, dailyNutrition.dateDailyNutrition]);

  const consumedWater = useMemo(() => {
    return cupDrunkListToday.reduce(
      (consumed, cupDrunk) => consumed + cupDrunk.waterPerCup,
      0
    );
  }, [cupDrunkListToday]);
  const toast = useToast();
  useEffect(() => {
    (async () => {
      if (!user.isActiveWaterNotification) {
        await cancelAllNotifications();
        return;
      }
      if (consumedWater >= waterIntake.waterIntakeVolume) return;
      const notificationList = await getAllScheduledNotifications();
      if (notificationList.length > 0) return;
      await scheduleDailyNotification(waterReminderNotificationList);
    })();
  }, [user.isActiveWaterNotification]);
  useEffect(() => {
    (async () => {
      if (consumedWater >= waterIntake.waterIntakeVolume) {
        toast.show("You've drunk enough water for today!", {
          type: "success",
        });
        //Hủy tất cả các thông báo trước đó
        await cancelAllNotifications();
      }
    })();
  }, [consumedWater, waterIntake.waterIntakeVolume]);
  const handleSelectedDate = (selectedDate) => {
    const date = formattedISODate(selectedDate);
    const selectedDailyNutrition = dailyNutritionList.find(
      (item) => item.getDate() === date
    );
    const selectedWaterIntake = waterIntakeList.find(
      (item) => item.getDate() === date
    );
    if (selectedDailyNutrition) {
      dispatchDashboard({
        type: SET_SELECTED_DAILY_NUTRITION,
        payload: selectedDailyNutrition,
      });
      dispatchDashboard({
        type: SET_SELECTED_WATER_INTAKE,
        payload: selectedWaterIntake,
      });
      dispatch(appActions.setSelectedDay(date));
    } else {
      alertNotification("No data", `No data for ${formatShortDate(date)}`);
    }
  };
  const handleLeftBtnCalendar = () => {
    const previousDay = calculateDatePerDay(
      dailyNutrition.dateDailyNutrition,
      -1
    );
    const previousDailyNutrition = dailyNutritionList.find(
      (item) => item.getDate() === previousDay
    );
    const previousWaterIntake = waterIntakeList.find(
      (item) => item.getDate() === previousDay
    );
    if (previousDailyNutrition) {
      dispatchDashboard({
        type: SET_SELECTED_DAILY_NUTRITION,
        payload: previousDailyNutrition,
      });
      dispatchDashboard({
        type: SET_SELECTED_WATER_INTAKE,
        payload: previousWaterIntake,
      });
      dispatch(appActions.setSelectedDay(previousDay));
    } else {
      alertNotification(
        "No data",
        `No data for ${formatShortDate(previousDay)}`
      );
    }
  };

  const handleRightBtnCalendar = () => {
    const nextDay = calculateDatePerDay(dailyNutrition.dateDailyNutrition, 1);
    const nextDailyNutrition = dailyNutritionList.find(
      (item) => item.getDate() === nextDay
    );
    const nextWaterIntake = waterIntakeList.find(
      (item) => item.getDate() === nextDay
    );
    if (nextDailyNutrition) {
      dispatchDashboard({
        type: SET_SELECTED_DAILY_NUTRITION,
        payload: nextDailyNutrition,
      });
      dispatchDashboard({
        type: SET_SELECTED_WATER_INTAKE,
        payload: nextWaterIntake,
      });
      dispatch(appActions.setSelectedDay(nextDay));
    } else {
      alertNotification("No data", `No data for ${formatShortDate(nextDay)}`);
    }
  };
  function handleOpenCalendar() {
    dispatchDashboard({ type: SET_MODAL_VISIBLE_TRUE });
  }
  function handleCloseCalendar() {
    dispatchDashboard({ type: SET_MODAL_VISIBLE_FALSE });
  }
  function handleCupClick(cupDrunk, isDrunk) {
    if (isDrunk) {
      function onConfirm() {
        dispatch(appActions.deleteCupDrunkById(cupDrunk.getCupDrunkId()));
      }
      showConfirmationDialog(
        "Delete Item?",
        "Do you want to continue?",
        onConfirm
      );
    } else {
      const localDateAndTime = formatDateToLocalVN(
        new Date(`${selectedDay} ${getLocalTime()}`)
      );
      const cupDrunkId = generateRandomString();
      const cupDrunk = new CupDrunk(
        cupDrunkId,
        waterIntake.getWaterIntakeId(),
        waterIntake.getWaterPerCup(),
        localDateAndTime
      );
      dispatch(appActions.createCupDrunk(cupDrunk));
    }
  }
  function handleNavigateToWaterTrackerScreen() {
    navigation.navigate("WaterTrackerScreen");
  }

  function handlePressWorkoutItem(workout) {
    setWorkout(workout);
    setIsModalAddWorkout(true);
  }

  function handleNavigateToSettingWeightScreen() {
    bottomTabNavigation.navigate("UserScreenNavigator", {
      screen: "UpdateBMRScreen",
    });
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.day}>
              {getRelativeDate(dailyNutrition.dateDailyNutrition)}
            </Text>
            <Calendar
              date={dailyNutrition.dateDailyNutrition}
              onPressBtnLeft={handleLeftBtnCalendar}
              onPressBtnRight={handleRightBtnCalendar}
              onPressCalender={handleOpenCalendar}
            />
          </View>
          <ModalCalendar
            modalVisible={stateDashboard.modalVisible}
            onCloseCalendar={handleCloseCalendar}
            onSelectDate={handleSelectedDate}
          />
          <ProgressBoard dailyNutrition={dailyNutrition} />
        </View>
        <View style={styles.bodyContainer}>
          <HeadingContainer
            title="You've drunk water"
            onPress={handleNavigateToWaterTrackerScreen}
            consumedValue={consumedWater}
            targetValue={` /${waterIntake.waterIntakeVolume} ml`}
          />
          <StatusWaterContainer
            onCupClick={handleCupClick}
            waterIntakeVolume={waterIntake.waterIntakeVolume}
            waterPerCupDefault={waterIntake.waterPerCup}
            cupDrunkListToday={cupDrunkListToday}
          />
          <MealsContainer dailyNutrition={dailyNutrition} />
          <WorkoutContainer onPressWorkoutItem={handlePressWorkoutItem} />
          <ModalAddWorkout
            isVisible={isModalAddWorkout}
            onBackdropPress={setIsModalAddWorkout}
            workout={workout}
            isEdit={true}
          />
          <HeadingContainer
            title="Target weight"
            onPress={handleNavigateToSettingWeightScreen}
            consumedValue={dailyNutrition?.weight || 0}
            targetValue={
              user?.target === MAINTAIN_WEIGHT
                ? " kg"
                : ` /${user?.targetWeight || 0} kg`
            }
            style={{ marginVertical: Spacing.MD }}
          />
          <MeasureBoard style={{ marginHorizontal: 0 }} />
        </View>

        <BottomExtraPaddingScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  headerContainer: {
    backgroundColor: colors.primaryColor,
    padding: Spacing.MD,
    paddingBottom: Spacing.XXL,
    borderBottomLeftRadius: Spacing.XL,
    borderBottomRightRadius: Spacing.XL,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    width: "45%",
    fontSize: Typography.LG,
    color: colors.whiteColor,
    fontWeight: "bold",
  },
  bodyContainer: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.MD,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: Typography.MD,
    color: colors.textColor,
    width: "70%",
  },
  waterLabel: {
    fontSize: Typography.SM,
    color: colors.waterColor,
    borderBottomColor: colors.waterColor,
    borderBottomWidth: 1,
  },
});
