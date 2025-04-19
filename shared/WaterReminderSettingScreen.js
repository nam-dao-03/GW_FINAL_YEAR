import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from "react-native";
import colors from "../utils/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import HeaderNavigation from "../components/shared/HeaderNavigation";
import Spacing from "../utils/Spacing";
import Typography from "../utils/Typography";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { formatTimeToLocalVN, removeSeconds } from "../utils/Date";
import { useToast } from "react-native-toast-notifications";
import {
  alertNotification,
  convertToNumber,
  generateRandomString,
  isValidNumber,
} from "../utils/Common";
import Sizes from "../utils/Size";
import useAppContext from "../hooks/useAppContext";
import { appActions } from "../context/app";
import ContinueButton from "../components/shared/ContinueButton";
import WaterReminderContainer from "../components/WaterReminderSettingScreen/WaterReminderContainer";
import BottomExtraPaddingScreen from "../components/shared/BottomExtraPaddingScreen";
import {
  calculateNotifications,
  checkScheduledNotifications,
  scheduleDailyNotification,
} from "../utils/Notification";
import KeyboardAvoidingWrapper from "../components/shared/KeyboardAvoidingWrapper";
const DEFAULT_WATER_REMINDER_INTERVAL = 60; // 60 minutes
export default function WaterReminderSettingScreen({ navigation, route }) {
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      bottomTabNavigation.setOptions({
        tabBarStyle: { display: "none" },
      });
      navigation.setOptions({
        header: () => <HeaderNavigation title="Water Reminder" />,
      });
      appDispatch(appActions.setFalseShowFAB());
    }, [navigation, route])
  );
  const [appState, appDispatch] = useAppContext();
  const { userList, waterReminderNotificationList } = appState;
  const user = userList[0];
  const [isActiveUpdateReminderTime, setIsActiveUpdateReminderTime] =
    useState(false);
  const [notificationList, setNotificationList] = useState([]);

  const [reminderTime, setReminderTime] = useState("");
  const preReminderTime = useRef(reminderTime);
  const [bedTime, setBedTime] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [isUpdateUniqueTime, setIsUpdateUniqueTime] = useState(false);
  const inputUpdateReminderTimeRef = useRef(null);
  useEffect(() => {
    if (user) {
      setBedTime(user.bedTime);
      setWakeUpTime(user.wakeUpTime);
      setReminderTime(String(user.waterReminderInterval));
      preReminderTime.current = String(user.waterReminderInterval);
    }
  }, [user]);
  useEffect(() => {
    if (!isDirty) {
      setNotificationList(waterReminderNotificationList);
      return;
    }
    if (isUpdateUniqueTime) {
      return;
    }
    const notificationCount = calculateNotifications(
      bedTime,
      wakeUpTime,
      Number(reminderTime) || DEFAULT_WATER_REMINDER_INTERVAL
    );
    const times = [];
    const [wakeHour, wakeMinute] = wakeUpTime.split(":").map(Number);
    const now = new Date();
    let start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      wakeHour,
      wakeMinute,
      0
    );
    start = new Date(start.getTime() + 10 * 60000); // cộng thêm 10 phút
    let current = start;

    for (let i = 0; i < notificationCount; i++) {
      const notificationTime = current.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const waterReminderNotification = {
        waterReminderNotificationId: generateRandomString(),
        userId: user.userId,
        title: "💧 Drinking Water",
        body: `Don't forget to drink some water, buddy! 🌿 (${removeSeconds(
          notificationTime
        )})`,
        notificationTime,
      };
      times.push(waterReminderNotification);
      const intervalTime =
        Number(reminderTime) || DEFAULT_WATER_REMINDER_INTERVAL;
      current = new Date(current.getTime() + intervalTime * 60000);
    }
    setNotificationList(times);
  }, [bedTime, wakeUpTime, reminderTime, user, isDirty]);

  console.log("notificationList", notificationList);

  const toast = useToast();
  function handleChangeTime(type) {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "time",
      is24Hour: true,
      display: "clock",
      onChange: onChange,
    });
    function onChange(event, selectedTime) {
      if (event.type === "dismissed") return;
      if (type === "bed") {
        setBedTime(formatTimeToLocalVN(selectedTime));
        setIsDirty(true);
      } else if (type === "wakeUp") {
        setWakeUpTime(formatTimeToLocalVN(selectedTime));
        setIsDirty(true);
      }
    }
  }

  function handleChangeReminderTime(value) {
    setReminderTime(value);
    setIsDirty(true);
  }
  function handleActiveReminderTime() {
    if (!reminderTime || !isValidNumber(reminderTime)) {
      // Nếu không nhập gì
      setReminderTime(String(user.waterReminderInterval));
      setIsDirty(false);
    } else if (reminderTime !== preReminderTime.current) {
      // Nếu nhập và khác giá trị ban đầu
      setIsDirty(true);
    } else if (reminderTime === preReminderTime.current) {
      // Nếu giống giá trị ban đầu
      setIsDirty(false);
    }
    setIsActiveUpdateReminderTime(!isActiveUpdateReminderTime);
  }
  function handleSubmitEditingUpdateReminderTime() {
    if (!reminderTime.trim()) {
      if (!reminderTime || !isValidNumber(reminderTime)) {
        // Nếu không nhập gì
        alertNotification(
          "Invalid Input",
          "Please enter a valid number for reminder time."
        );
        setReminderTime(String(user.waterReminderInterval));
        setIsDirty(false);
      } else if (reminderTime !== preReminderTime.current) {
        // Nếu nhập và khác giá trị ban đầu
        setIsDirty(true);
      } else if (reminderTime === preReminderTime.current) {
        // Nếu giống giá trị ban đầu
        setIsDirty(false);
      }
      setIsDirty(false);
      setIsUpdateUniqueTime(false);
      return;
    }
    if (preReminderTime.current !== reminderTime) {
      appDispatch(appActions.deleteWaterReminderNotificationList());
      setIsDirty(true);
    }
    setIsActiveUpdateReminderTime(false);
  }

  async function handleSubmitChangeTime() {
    if ((!bedTime.trim() && !wakeUpTime.trim()) || !reminderTime.trim()) {
      alertNotification(
        "Invalid Input",
        "Please enter a valid value for bed time, wake up time, or reminder time."
      );
      return;
    }
    setIsDirty(false);
    setIsActiveUpdateReminderTime(false);
    const updatedUser = {
      ...user,
      bedTime: bedTime,
      wakeUpTime: wakeUpTime,
      waterReminderInterval: convertToNumber(reminderTime),
    };
    appDispatch(appActions.updateUser(updatedUser));
    appDispatch(appActions.deleteWaterReminderNotificationList());
    appDispatch(
      appActions.createWaterReminderNotificationList(notificationList)
    );
    if (user.isActiveWaterNotification) {
      await scheduleDailyNotification(notificationList);
    }
    toast.show(`Updated time!`, { type: "success" });
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.screenContainer}>
          <View style={styles.sleepScheduleContainer}>
            <Text style={styles.titleText}>Sleep schedule</Text>
            <View style={styles.timeSchedule}>
              <PressableTime
                time={removeSeconds(bedTime)}
                onPress={() => handleChangeTime("bed")}
              />
              <Text>-</Text>
              <PressableTime
                time={removeSeconds(wakeUpTime)}
                onPress={() => handleChangeTime("wakeUp")}
              />
            </View>
          </View>
          <View style={styles.reminderIntervalContainer}>
            <Text style={styles.titleText}>Reminder interval</Text>
            {!isActiveUpdateReminderTime ? (
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                onPress={handleActiveReminderTime}
              >
                <Text style={styles.reminderTime}>
                  {reminderTime || DEFAULT_WATER_REMINDER_INTERVAL} minutes
                </Text>
              </Pressable>
            ) : (
              <TextInput
                style={styles.textInputReminderTime}
                ref={inputUpdateReminderTimeRef}
                maxLength={3}
                keyboardType="number-pad"
                value={reminderTime}
                onChangeText={handleChangeReminderTime}
                placeholder={String(DEFAULT_WATER_REMINDER_INTERVAL)}
                onBlur={handleActiveReminderTime}
                onLayout={() => {
                  inputUpdateReminderTimeRef.current?.focus();
                }}
                onSubmitEditing={handleSubmitEditingUpdateReminderTime}
              />
            )}
          </View>
          <WaterReminderContainer
            bedTime={bedTime}
            wakeUpTime={wakeUpTime}
            isDirty={isDirty}
            setIsDirty={setIsDirty}
            notificationList={notificationList}
            setNotificationList={setNotificationList}
            setIsUpdateUniqueTime={setIsUpdateUniqueTime}
          />
          <BottomExtraPaddingScreen />
        </ScrollView>
        {isDirty && (
          <ContinueButton
            extraStyle={styles.submitButton}
            onPress={handleSubmitChangeTime}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
    position: "relative",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
  },
  sleepScheduleContainer: {
    marginTop: Spacing.SM,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: Typography.MD,
  },
  timeSchedule: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.XXS,
  },
  pressableTime: {
    fontSize: Typography.SM,
    borderBottomColor: colors.primaryColor,
    color: colors.primaryColor,
    borderBottomWidth: 1,
  },
  reminderIntervalContainer: {
    marginTop: Spacing.SM,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reminderTime: {
    fontSize: Typography.SM,
    borderBottomColor: colors.primaryColor,
    color: colors.descriptionTextColor,
  },
  textInputReminderTime: {
    fontSize: Typography.SM,
    color: colors.textColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.textColor,
    width: Sizes.XXL,
    paddingHorizontal: Spacing.XXS,
  },

  submitButton: {
    position: "absolute",
    bottom: Spacing.SM,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
});

function PressableTime({ time, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      onPress={onPress}
    >
      <Text style={styles.pressableTime}>{time}</Text>
    </Pressable>
  );
}
