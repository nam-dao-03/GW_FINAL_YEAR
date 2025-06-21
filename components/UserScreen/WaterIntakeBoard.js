import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import { FontAwesome6 as FA6, Ionicons } from "@expo/vector-icons";
import Sizes from "../../utils/Size";
import * as Progress from "react-native-progress";
import PressableIcon from "../shared/PressableIcon";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import { useToast } from "react-native-toast-notifications";
import {
  extractTime,
  generateLocalDateAndTime,
  getLocalDate,
  getLocalTime,
} from "../../utils/Date";
import { generateRandomString } from "../../utils/Common";
export default function WaterIntakeBoard({ waterIntake }) {
  const [appState, appDispatch] = useAppContext();
  const { userList, waterIntakeList, cupDrunkList, selectedDay } = appState;
  const waterIntakeToday = waterIntakeList.find(
    (item) => item.getDate() === selectedDay
  );
  const cupDrunkListToday = cupDrunkList.filter(
    (item) => item.getWaterIntakeId() === waterIntakeToday.getWaterIntakeId()
  );
  const consumedWater = cupDrunkListToday.reduce(
    (consumed, cupDrunk) => consumed + cupDrunk.getWaterPerCup(),
    0
  );
  const progressWater = Number(
    (consumedWater / waterIntakeToday.waterIntakeVolume).toFixed(3)
  );
  const lastCupDrunk = cupDrunkListToday[cupDrunkListToday.length - 1];
  function handleUpdateWaterIntake(type) {
    if (type === "decrease") {
      if (!lastCupDrunk) return;
      appDispatch(appActions.deleteCupDrunkById(lastCupDrunk.getCupDrunkId()));
    } else if (type === "increase") {
      const cupDrunkId = generateRandomString();
      const cupDrunkDate = `${selectedDay} ${getLocalTime()}`;
      const cupDrunk = {
        cupDrunkId,
        waterIntakeId: waterIntakeToday.getWaterIntakeId(),
        cupDrunkDate,
        waterPerCup: waterIntakeToday.getWaterPerCup(),
      };
      appDispatch(appActions.createCupDrunk(cupDrunk));
    }
  }

  const user = userList[0];
  const isActiveWaterNotification = user.isActiveWaterNotification;
  const toast = useToast();
  function handleToggleWaterReminderNotification() {
    if (isActiveWaterNotification) {
      const updatedUser = {
        ...user,
        isActiveWaterNotification: 0,
      };
      appDispatch(appActions.updateUser(updatedUser));
      toast.show("Turn off notification", { type: "success" });
    } else {
      const updatedUser = {
        ...user,
        isActiveWaterNotification: 1,
      };
      appDispatch(appActions.updateUser(updatedUser));
      toast.show("Turn on notification", { type: "success" });
    }
  }

  return (
    <View style={styles.waterContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.waterValue}>{waterIntake} ml</Text>
        <Text style={styles.waterDescription}>Your daily water intake</Text>
        <View style={styles.divider}></View>
        <View style={styles.lastTimeDrunkContainer}>
          <FA6 name="clock" size={Sizes.SM} color={colors.textColor} />
          <Text style={styles.lastTimeText}>
            Last Time:{" "}
            {lastCupDrunk ? extractTime(lastCupDrunk.cupDrunkDate) : "..."}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [
                  { opacity: 0.5 },
                  styles.notificationContainer,
                  {
                    backgroundColor: isActiveWaterNotification
                      ? colors.secondaryColor
                      : colors.primaryColor,
                  },
                ]
              : [
                  styles.notificationContainer,
                  {
                    backgroundColor: isActiveWaterNotification
                      ? colors.secondaryColor
                      : colors.primaryColor,
                  },
                ]
          }
          onPress={handleToggleWaterReminderNotification}
        >
          <Ionicons
            name={
              isActiveWaterNotification ? "notifications-off" : "notifications"
            }
            size={Sizes.SM}
            color={colors.whiteColor}
          />
          <Text style={styles.notificationText}>
            {isActiveWaterNotification ? "Turn off" : "Turn on"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.rightContainer}>
        <Progress.Bar
          progress={progressWater} // 50%
          width={Sizes.MASSIVE * 1.5}
          height={Sizes.XL}
          color={colors.waterColor}
          unfilledColor="#ecf0f1"
          borderWidth={1}
          borderColor={colors.waterColor}
          borderRadius={Sizes.MD}
        />
        <View style={styles.progressAction}>
          <PressableIcon
            style={styles.pressableIcon}
            onPress={() => handleUpdateWaterIntake("decrease")}
          >
            <Ionicons name="remove" size={Sizes.MD} color="black" />
          </PressableIcon>
          <PressableIcon
            style={styles.pressableIcon}
            onPress={() => handleUpdateWaterIntake("increase")}
          >
            <Ionicons name="add" size={Sizes.MD} color="black" />
          </PressableIcon>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.XL,
    paddingVertical: Spacing.XL,
    backgroundColor: colors.whiteColor,
    borderTopRightRadius: Spacing.XL,
    borderRadius: Spacing.XS,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
    marginHorizontal: Spacing.LG,
    alignItems: "center",
    gap: Spacing.SM,
  },
  leftContainer: {
    // borderWidth: 1,
    flexDirection: "column",
    width: "50%",
  },
  rightContainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    gap: Spacing.XL,
  },
  waterDescription: {
    fontSize: Typography.REGULAR,
    color: colors.descriptionTextColor,
    flexWrap: "wrap",
  },
  waterValue: {
    color: colors.tertiaryColor,
    fontWeight: "bold",
    fontSize: Typography.LG,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.shadowColor,
    marginVertical: Spacing.XS,
  },
  lastTimeDrunkContainer: {
    marginTop: Spacing.XXS,
    flexDirection: "row",
    alignItems: "center",
  },
  lastTimeText: {
    fontSize: Typography.SM,
    color: colors.textColor,
    marginLeft: Spacing.XS,
  },
  notificationContainer: {
    marginTop: Spacing.SM,
    flexDirection: "row",
    alignItems: "center",

    width: "65%",
    justifyContent: "center",
    paddingVertical: Spacing.XXS,
    borderRadius: Spacing.MD,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  notificationText: {
    fontSize: Typography.SM,
    color: colors.whiteColor,
    marginLeft: Spacing.XS,
  },
  progressAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  pressableIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.XXS * 2,
    borderRadius: "50%",
  },
});
