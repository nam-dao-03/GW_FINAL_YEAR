import { StyleSheet, View, Text } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../../utils/Colors";
import PressableIcon from "../PressableIcon";
import { MaterialCommunityIcons as MCIIcon } from "@expo/vector-icons";
import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import {
  generateRandomString,
  showConfirmationDialog,
} from "../../utils/Common";
import { generateLocalDateAndTime } from "../../utils/Date";
const volumeOptions = ["", 100, 200, 300, 400, 500, ""];
export default function ProgressBoard({ consumedWater = 1, waterIntake }) {
  const [_, dispatch] = useAppContext();
  const indexDefaultWaterPerCup = volumeOptions.findIndex(
    (item) => item === waterIntake.waterPerCup
  );
  const defaultVolumeWater = {
    left: indexDefaultWaterPerCup - 1,
    middle: indexDefaultWaterPerCup,
    right: indexDefaultWaterPerCup + 1,
  };
  const [volumeWater, setVolumeWater] = useState(defaultVolumeWater);
  const TYPE = {
    LEFT: "left",
    MIDDLE: "middle",
    RIGHT: "right",
  };
  const progressWater = Number(
    (consumedWater / waterIntake.waterIntakeVolume).toFixed(3)
  );
  function handleChangeVolumeWater(type) {
    switch (type) {
      case TYPE.LEFT: {
        if (volumeWater.left === 0) return;

        setVolumeWater((prevState) => ({
          left: prevState.left - 1,
          middle: prevState.middle - 1,
          right: prevState.right - 1,
        }));
        return;
      }
      case TYPE.MIDDLE: {
        function createNewCupDrunk() {
          const newWaterIntake = {
            ...waterIntake,
            waterPerCup: volumeOptions[volumeWater.middle],
          };
          dispatch(appActions.updateWaterIntake(newWaterIntake));
          const cupDrunkId = generateRandomString();
          const cupDrunkDate = generateLocalDateAndTime();
          const cupDrunk = {
            cupDrunkId,
            waterIntakeId: waterIntake.getWaterIntakeId(),
            waterPerCup: volumeOptions[volumeWater.middle],
            cupDrunkDate,
          };
          dispatch(appActions.createCupDrunk(cupDrunk));
        }

        if (consumedWater >= waterIntake.waterIntakeVolume) {
          showConfirmationDialog(
            "Fully hydrated",
            "Do you want to continue?",
            createNewCupDrunk,
            () => {} // Trường hợp nhấn "No", không cần làm gì thêm
          );
        } else {
          createNewCupDrunk();
        }

        return;
      }
      case TYPE.RIGHT: {
        if (volumeWater.right === volumeOptions.length - 1) return;
        setVolumeWater((prevState) => ({
          left: prevState.left + 1,
          middle: prevState.middle + 1,
          right: prevState.right + 1,
        }));
        return;
      }
      default: {
        return;
      }
    }
  }
  return (
    <View style={styles.progressBoard}>
      <View style={styles.waterTracker}>
        <Progress.Circle
          size={300}
          color={colors.usedProgressColor}
          unfilledColor={colors.remainingProgressColor}
          borderWidth={0}
          progress={progressWater}
          thickness={6}
        />
        <View style={styles.waterTrackerInf}>
          <Text style={styles.waterTrackerTitle}>Target Today</Text>
          <Text style={styles.progressInf}>
            {consumedWater}/{waterIntake.waterIntakeVolume}{" "}
            <Text style={{ fontSize: 20 }}>ml</Text>
          </Text>
        </View>
      </View>
      <View style={styles.changeVolumeWater}>
        <PressableIcon
          style={styles.changeVolumeBtn}
          onPress={() => handleChangeVolumeWater(TYPE.LEFT)}
        >
          <Text style={styles.textVolume}>
            {volumeOptions[volumeWater.left]}{" "}
            {!volumeOptions[volumeWater.left] ? "" : "ml"}
          </Text>
        </PressableIcon>
        <PressableIcon
          style={styles.addWater}
          onPress={() => handleChangeVolumeWater(TYPE.MIDDLE)}
        >
          <MCIIcon name="cup" size={24} color={colors.waterColor} />
          <Text style={[styles.textVolume, { color: colors.primaryColor }]}>
            +{volumeOptions[volumeWater.middle]} ml
          </Text>
        </PressableIcon>
        <PressableIcon
          style={styles.changeVolumeBtn}
          onPress={() => handleChangeVolumeWater(TYPE.RIGHT)}
        >
          <Text style={styles.textVolume}>
            {volumeOptions[volumeWater.right]}{" "}
            {!volumeOptions[volumeWater.right] ? "" : "ml"}
          </Text>
        </PressableIcon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBoard: {
    marginTop: -10,
    padding: 20,
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  waterTracker: {
    position: "relative",
  },
  waterTrackerInf: {
    textAlign: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  waterTrackerTitle: {
    textAlign: "center",
    fontSize: 16,
    color: colors.usedProgressColor,
    fontWeight: "bold",
    marginTop: 50,
  },
  progressInf: {
    fontSize: 36,
    color: colors.whiteColor,
    textAlign: "center",
    marginTop: 30,
  },
  changeVolumeWater: {
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  addWater: {
    backgroundColor: colors.whiteColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "40%",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textVolume: {
    fontSize: 16,
    color: colors.whiteColor,
  },
  changeVolumeBtn: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },
});
