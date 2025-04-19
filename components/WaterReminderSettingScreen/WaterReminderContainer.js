import { StyleSheet, View } from "react-native";
import WaterNotification from "./WaterNotification";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import { useToast } from "react-native-toast-notifications";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import { alertNotification, generateRandomString } from "../../utils/Common";
import {
  formatTimeToLocalVN,
  getLocalDate,
  removeSeconds,
} from "../../utils/Date";

export default function WaterReminderContainer({
  bedTime,
  wakeUpTime,
  setIsDirty,
  notificationList,
  setNotificationList,
  setIsUpdateUniqueTime,
}) {
  const toast = useToast();
  const [appState, appDispatch] = useAppContext();
  const { waterIntakeList } = appState;
  const waterIntakeToday = waterIntakeList.find(
    (item) => item.getDate() === getLocalDate()
  );
  function handleChangeNotificationTime(id) {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "time",
      is24Hour: true,
      display: "clock",
      onChange: onChange,
    });
    function onChange(event, selectedTime) {
      if (event.type === "dismissed") return;
      if (
        !isTimeOutsideSleepRange(
          bedTime,
          wakeUpTime,
          formatTimeToLocalVN(selectedTime)
        )
      ) {
        alertNotification(
          "Time is inside of sleep range",
          "Please choose a time within your outside sleep range."
        );
        return;
      }
      const updatedNotificationList = notificationList.map((item) => {
        if (item.waterReminderNotificationId === id) {
          return {
            ...item,
            body: `Don't forget to drink some water, buddy! 🌿 (${removeSeconds(
              formatTimeToLocalVN(selectedTime)
            )})`,
            notificationTime: formatTimeToLocalVN(selectedTime),
          };
        }
        return item;
      });
      setNotificationList(updatedNotificationList);
      setIsDirty(true);
      setIsUpdateUniqueTime(true);
      toast.show(`Change Success!`, { type: "success" });
    }
  }

  return (
    <View style={styles.waterReminderContainer}>
      {notificationList.map((item) => (
        <WaterNotification
          key={item.waterReminderNotificationId}
          id={item.waterReminderNotificationId}
          notificationTime={item?.notificationTime}
          onChangeNotificationTime={handleChangeNotificationTime}
          waterPerCup={waterIntakeToday?.waterPerCup}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  waterReminderContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: Spacing.LG,
    rowGap: Spacing.XXL,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#fff",
    marginTop: Spacing.LG,
    borderRadius: Spacing.LG,
    padding: Spacing.LG,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
});

function isTimeOutsideSleepRange(bedTime, wakeUpTime, checkTime) {
  const toSeconds = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const bedTimeSec = toSeconds(bedTime);
  const wakeUpTimeSec = toSeconds(wakeUpTime);
  const checkTimeSec = toSeconds(checkTime);

  // Trường hợp khoảng thời gian qua nửa đêm (ví dụ: bedTime = 22:00, wakeUpTime = 06:00)
  if (bedTimeSec > wakeUpTimeSec) {
    return checkTimeSec < bedTimeSec && checkTimeSec >= wakeUpTimeSec;
  }

  // Trường hợp khoảng thời gian trong cùng 1 ngày
  return checkTimeSec < bedTimeSec || checkTimeSec >= wakeUpTimeSec;
}
