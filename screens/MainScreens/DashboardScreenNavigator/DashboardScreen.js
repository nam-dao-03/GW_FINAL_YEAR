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
  generateRandomString,
  showConfirmationDialog,
} from "../../../utils/Common";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  calculateDatePerDay,
  extractDate,
  formatShortDate,
  formattedISODate,
  generateLocalDateAndTime,
  getLocalDate,
  getRelativeDate,
} from "../../../utils/Date";
import { appActions } from "../../../context/app";
import useAppContext from "../../../hooks/useAppContext";
import { DailyNutrition } from "../../../database/entities/DailyNutrition";
import ModalCalendar from "../../../components/ModalCalendar";
import { CupDrunk } from "../../../database/entities/CupDrunk";
import Spacing from "../../../utils/Spacing";
import Typography from "../../../utils/Typography";

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
  const [stateDashboard, dispatchDashboard] = useReducer(
    reducerDashboard,
    initialStateDashboard
  );
  const [state, dispatch] = useAppContext();
  const today = getLocalDate();
  const { dailyNutritionList, waterIntakeList, cupDrunkList } = state;
  //lấy giá trị đầu tiên của dailyNutritionList
  const defaultDailyNutrition = dailyNutritionList[0];
  const defaultWaterIntake = waterIntakeList[0];
  //nếu có thì trả về, nếu không có thì gán giá trị mặc định bên trên, tránh lỗi xảy ra khi truy cập vào
  const dailyNutrition =
    stateDashboard.selectedDailyNutrition ||
    dailyNutritionList.find((item) => item.getDate() === today) ||
    defaultDailyNutrition;
  const waterIntake =
    stateDashboard.selectedWaterIntake ||
    waterIntakeList.find((item) => item.getDate() === today) ||
    defaultWaterIntake;
  const cupDrunkListToday = cupDrunkList.filter(
    (item) => extractDate(item.getDate()) === today
  );
  const consumedWater = cupDrunkListToday.reduce(
    (consumed, cupDrunk) => consumed + cupDrunk.waterPerCup,
    0
  );
  // console.log("cupDrunkListToday", cupDrunkListToday);
  // console.log("cupDrunkList", cupDrunkList);
  useEffect(() => {
    function createNewestDailyNutrition() {
      //Nếu là giá trị mặc định thì date sẽ là đối tượng của ngày ban đầu tạo, sẽ khác với hôm mới truy cập và chạy vào
      if (dailyNutrition.getDate() === today) return;
      const id = generateRandomString();
      const newDailyNutrition = {
        ...defaultDailyNutrition,
        dailyNutritionId: id,
        consumedCalories: 0,
        consumedCarbs: 0,
        consumedProtein: 0,
        consumedFat: 0,
        dateDailyNutrition: today,
      };
      // Tạo lại instance của DailyNutrition từ dữ liệu lấy từ database
      const instanceDailyNutrition = Object.assign(
        new DailyNutrition(),
        newDailyNutrition
      );
      dispatch(appActions.createDailyNutrition(instanceDailyNutrition));
    }
    function createNewestWaterIntake() {
      if (waterIntake.getDate() === today) return;
      const id = generateRandomString();
      const newWaterIntake = {
        ...defaultWaterIntake,
        waterIntakeId: id,
        dateWaterIntake: today,
      };
      dispatch(appActions.createWaterIntake(newWaterIntake));
    }
    createNewestDailyNutrition();
    createNewestWaterIntake();
  }, [dailyNutritionList, waterIntakeList, dispatch]);

  const handleSelectedDate = useCallback(
    (selectedDate) => {
      const date = formattedISODate(selectedDate);
      const selectedDailyNutrition = dailyNutritionList.find(
        (item) => item.getDate() === date
      );
      if (selectedDailyNutrition) {
        dispatchDashboard({
          type: SET_SELECTED_DAILY_NUTRITION,
          payload: selectedDailyNutrition,
        });
      } else {
        alertNotification("No data", `No data for ${formatShortDate(date)}`);
      }
    },
    [dailyNutritionList]
  );
  const handleLeftBtnCalendar = useCallback(() => {
    const previousDay = calculateDatePerDay(
      dailyNutrition.dateDailyNutrition,
      -1
    );
    const previousDailyNutrition = dailyNutritionList.find(
      (item) => item.getDate() === previousDay
    );
    if (previousDailyNutrition) {
      dispatchDashboard({
        type: SET_SELECTED_DAILY_NUTRITION,
        payload: previousDailyNutrition,
      });
    } else {
      alertNotification(
        "No data",
        `No data for ${formatShortDate(previousDay)}`
      );
    }
  }, [dailyNutritionList]);
  const handleRightBtnCalendar = useCallback(() => {
    const nextDay = calculateDatePerDay(dailyNutrition.dateDailyNutrition, 1);
    const nextDailyNutrition = dailyNutritionList.find(
      (item) => item.getDate() === nextDay
    );
    if (nextDailyNutrition) {
      dispatchDashboard({
        type: SET_SELECTED_DAILY_NUTRITION,
        payload: nextDailyNutrition,
      });
    } else {
      alertNotification("No data", `No data for ${formatShortDate(nextDay)}`);
    }
  }, [dailyNutritionList]);
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
      const localDateAndTime = generateLocalDateAndTime();
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

  // console.log(waterIntake);

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
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>You've drunk water</Text>
            <Pressable
              style={({ pressed }) => (pressed ? [{ opacity: 0.5 }] : [])}
              onPress={handleNavigateToWaterTrackerScreen}
            >
              <Text style={styles.waterLabel}>
                <Text>{consumedWater}</Text> /{" "}
                <Text>{waterIntake.waterIntakeVolume} ml</Text>
              </Text>
            </Pressable>
          </View>
          <StatusWaterContainer
            onCupClick={handleCupClick}
            waterIntakeVolume={waterIntake.waterIntakeVolume}
            waterPerCupDefault={waterIntake.waterPerCup}
            cupDrunkListToday={cupDrunkListToday}
          />
        </View>
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
