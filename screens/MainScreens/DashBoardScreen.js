import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import colors from "../../utils/Colors";
import Calendar from "../../components/DashBoardScreen/Calendar";
import ProgressBoard from "../../components/DashBoardScreen/ProgressBoard";
import StatusWaterContainer from "../../components/DashBoardScreen/StatusWaterContainer";
import { alertNotification, generateRandomString } from "../../utils/Common";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  calculateDatePerDay,
  formatShortDate,
  formattedISODate,
  getRelativeDate,
  localDate,
} from "../../utils/Date";
import { appActions } from "../../context/app";
import useAppContext from "../../hooks/useAppContext";
import { DailyNutrition } from "../../database/entities/DailyNutrition";
import Loading from "../../components/Loading";
import ModalCalendar from "../../components/ModalCalendar";
import { createWaterIntakeInstance } from "../../database/entities/WaterIntake";
import { calculateWaterVolumeConsumed } from "../../utils/Indicators";

const SET_IS_LOADING_FALSE = "set_is_loading_false";
const SET_IS_LOADING_TRUE = "set_is_loading_true";
const SET_MODAL_VISIBLE_TRUE = "set_modal_visible_true";
const SET_MODAL_VISIBLE_FALSE = "set_modal_visible_false";
const SET_DAILY_NUTRITION = "set_daily_nutrition";
const SET_WATER_INTAKE = "set_water_intake";
function reducerDashboard(state, action) {
  switch (action.type) {
    case SET_IS_LOADING_FALSE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SET_IS_LOADING_TRUE: {
      return {
        ...state,
        isLoading: true,
      };
    }
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
    case SET_DAILY_NUTRITION: {
      return {
        ...state,
        dailyNutrition: action.payload,
      };
    }
    case SET_WATER_INTAKE: {
      return {
        ...state,
        waterIntake: { ...action.payload },
      };
    }
    default: {
      return state;
    }
  }
}

const initialStateDashboard = {
  dailyNutrition: {
    dateDailyNutrition: localDate,
    targetCalories: 1,
    targetCarbs: 1,
    targetProtein: 1,
    targetFat: 1,
    consumedCalories: 1,
    consumedCarbs: 1,
    consumedProtein: 1,
    consumedFat: 1,
  },
  waterIntake: {
    waterPerCup: 200,
    cupDrunk: 1,
    waterIntakeVolume: 1,
  },
  isLoading: true,
  modalVisible: false,
};

export default function DashBoardScreen({ navigation }) {
  const [stateDashboard, dispatchDashboard] = useReducer(
    reducerDashboard,
    initialStateDashboard
  );
  const [state, dispatch] = useAppContext();
  const { dailyNutritionList, waterIntakeList } = state;
  useEffect(() => {
    const today = localDate;
    function fetchDailyNutrition() {
      //Kiểm tra xem đối tượng này có phải là đối tượng chứa ngày hôm nay không
      const newestDailyNutrition = dailyNutritionList.find(
        (item) => item.getDate() === today
      );
      //nếu có thì set cho hôm nay, nếu không có thì tạo đối tượng mới chứa ngày hôm nay
      if (newestDailyNutrition) {
        dispatchDashboard({
          type: SET_DAILY_NUTRITION,
          payload: newestDailyNutrition,
        });
        return;
      }
      const lastDailyNutrition =
        dailyNutritionList[dailyNutritionList.length - 1];
      const id = generateRandomString();
      const newDailyNutrition = {
        ...lastDailyNutrition,
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
      dispatchDashboard({
        type: SET_DAILY_NUTRITION,
        payload: instanceDailyNutrition,
      });
    }

    function fetchWaterIntake() {
      const newestWaterIntake = waterIntakeList.find(
        (item) => item.getDateWaterIntake() === today
      );
      if (newestWaterIntake) {
        dispatchDashboard({
          type: SET_WATER_INTAKE,
          payload: { ...newestWaterIntake },
        });
        return;
      }
      const lastWaterIntake = waterIntakeList[waterIntakeList.length - 1];
      const id = generateRandomString();
      const newWaterIntake = {
        ...lastWaterIntake,
        waterIntakeId: id,
        cupDrunk: 0,
        dateWaterIntake: today,
      };
      const instanceWaterIntake = createWaterIntakeInstance(newWaterIntake);
      dispatch(appActions.createWaterIntake(instanceWaterIntake));
      dispatchDashboard({
        type: SET_WATER_INTAKE,
        payload: instanceWaterIntake,
      });
    }
    fetchDailyNutrition();
    fetchWaterIntake();
    dispatchDashboard({ type: SET_IS_LOADING_FALSE });
  }, [dailyNutritionList, waterIntakeList, dispatch]);
  const {
    dateDailyNutrition,
    targetCalories,
    targetCarbs,
    targetProtein,
    targetFat,
    consumedCalories,
    consumedCarbs,
    consumedProtein,
    consumedFat,
  } = stateDashboard.dailyNutrition;

  const { waterPerCup, cupDrunk, waterIntakeVolume } =
    stateDashboard.waterIntake;

  const handleLeftBtnCalendar = useCallback(() => {
    const previousDay = calculateDatePerDay(dateDailyNutrition, -1);
    const previousDailyNutrition = dailyNutritionList.find(
      (item) => item.getDate() === previousDay
    );
    if (previousDailyNutrition) {
      dispatchDashboard({
        type: SET_DAILY_NUTRITION,
        payload: previousDailyNutrition,
      });
    } else {
      alertNotification(
        "No data",
        `No data for ${formatShortDate(previousDay)}`
      );
    }
  }, [stateDashboard.dailyNutrition, dailyNutritionList]);

  const handleRightBtnCalendar = useCallback(() => {
    const nextDay = calculateDatePerDay(dateDailyNutrition, 1);
    const nextDailyNutrition = dailyNutritionList.find(
      (item) => item.getDate() === nextDay
    );
    if (nextDailyNutrition) {
      dispatchDashboard({
        type: SET_DAILY_NUTRITION,
        payload: nextDailyNutrition,
      });
    } else {
      alertNotification("No data", `No data for ${formatShortDate(nextDay)}`);
    }
  }, [stateDashboard.dailyNutrition, dailyNutritionList]);

  function handleOpenCalendar() {
    dispatchDashboard({ type: SET_MODAL_VISIBLE_TRUE });
  }
  function handleCloseCalendar() {
    dispatchDashboard({ type: SET_MODAL_VISIBLE_FALSE });
  }
  const handleSelectedDate = useCallback(
    (selectedDate) => {
      const date = formattedISODate(selectedDate);
      const selectedDailyNutrition = dailyNutritionList.find(
        (item) => item.getDate() === date
      );
      if (selectedDailyNutrition) {
        dispatchDashboard({
          type: SET_DAILY_NUTRITION,
          payload: selectedDailyNutrition,
        });
      } else {
        alertNotification("No data", `No data for ${formatShortDate(date)}`);
      }
    },
    [dailyNutritionList]
  );
  function handleCupClick(index) {
    const waterIntake = {
      ...stateDashboard.waterIntake,
      cupDrunk:
        stateDashboard.waterIntake.cupDrunk === index ? index - 1 : index,
    };
    dispatchDashboard({
      type: SET_WATER_INTAKE,
      payload: waterIntake,
    });
    dispatch(appActions.updateWaterIntake(waterIntake));
  }
  console.log(stateDashboard.waterIntake);
  const dailyNutritionProps = {
    targetCalories,
    targetCarbs,
    targetProtein,
    targetFat,
    consumedCalories,
    consumedCarbs,
    consumedProtein,
    consumedFat,
  };

  // làm phần uống nước, đã lấy được dữ liệu của WaterIntake, ngày tháng đã chuẩn chỉ, mai làm phần bấm vào cốc nước nó thay đổi trạng thái của cốc nước, và có thể kiếm cái icon cốc nước nào đẹp hơn, và làm phần trang cho phần chi tiết nước
  return (
    <SafeAreaView style={styles.screenContainer}>
      {stateDashboard.isLoading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.screenContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.day}>
                {getRelativeDate(dateDailyNutrition)}
              </Text>
              <Calendar
                date={dateDailyNutrition}
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
            <ProgressBoard {...dailyNutritionProps} />
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Ban da uong bao nhieu nuoc</Text>
              <Pressable
                style={({ pressed }) => (pressed ? [{ opacity: 0.5 }] : [])}
              >
                <Text style={styles.waterLabel}>
                  <Text>
                    {calculateWaterVolumeConsumed(waterPerCup, cupDrunk)}
                  </Text>{" "}
                  / <Text>{waterIntakeVolume} ml</Text>
                </Text>
              </Pressable>
            </View>
            <StatusWaterContainer
              {...stateDashboard.waterIntake}
              onCupClick={handleCupClick}
            />
          </View>
        </ScrollView>
      )}
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
    padding: 16,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    fontSize: 24,
    color: colors.whiteColor,
    fontWeight: "bold",
  },
  bodyContainer: {
    backgroundColor: colors.backgroundColorScreen,
    padding: 16,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    color: colors.textColor,
  },
  waterLabel: {
    fontSize: 16,
    color: colors.waterColor,
    borderBottomColor: colors.waterColor,
    borderBottomWidth: 1,
  },
});
