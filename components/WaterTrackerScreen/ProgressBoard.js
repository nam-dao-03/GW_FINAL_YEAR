import { StyleSheet, View, Text } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../../utils/Colors";
import PressableIcon from "../shared/PressableIcon";
import { MaterialCommunityIcons as MCIIcon } from "@expo/vector-icons";
import { useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import {
  generateRandomString,
  showConfirmationDialog,
} from "../../utils/Common";
import { generateLocalDateAndTime } from "../../utils/Date";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import Spacing from "../../utils/Spacing";
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
          size={Sizes.MASSIVE * 3}
          color={colors.usedProgressColor}
          unfilledColor={colors.remainingProgressColor}
          borderWidth={0}
          progress={progressWater}
          thickness={Sizes.TINY * 4}
        />
        <View style={styles.waterTrackerInf}>
          <Text style={styles.waterTrackerTitle}>Target Today</Text>
          <Text style={styles.progressInf}>
            {consumedWater}/{waterIntake.waterIntakeVolume}{" "}
            <Text style={{ fontSize: Typography.MD }}>ml</Text>
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
          <MCIIcon name="cup" size={Typography.LG} color={colors.waterColor} />
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
    marginTop: -Spacing.SM,
    padding: Spacing.XL,
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
    fontSize: Typography.SM,
    color: colors.usedProgressColor,
    fontWeight: "bold",
    marginTop: Spacing.BIG_50,
  },
  progressInf: {
    fontSize: Typography.XS * 3,
    color: colors.whiteColor,
    textAlign: "center",
    marginTop: Spacing.XL,
  },
  changeVolumeWater: {
    marginTop: Spacing.SM,
    padding: Spacing.XL,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.XL,
  },
  addWater: {
    backgroundColor: colors.whiteColor,
    paddingVertical: Spacing.XS,
    paddingHorizontal: Spacing.MD,
    width: "40%",
    borderRadius: Spacing.XL,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.XS,
    justifyContent: "center",
  },
  textVolume: {
    fontSize: Typography.SM,
    color: colors.whiteColor,
  },
  changeVolumeBtn: {
    paddingVertical: Spacing.XS,
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },
});
