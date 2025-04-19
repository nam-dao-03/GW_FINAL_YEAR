import { StyleSheet, Text, View } from "react-native";
import colors from "../../utils/Colors";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import PressableIcon from "../shared/PressableIcon";
import Sizes from "../../utils/Size";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import { useMemo } from "react";
import { calTotalCupsArr } from "../../utils/Common";
export default function StatusWaterContainer({
  onCupClick,
  waterIntakeVolume,
  waterPerCupDefault,
  cupDrunkListToday,
}) {
  const sortedCupDrunkListToday = useMemo(
    () =>
      [...cupDrunkListToday].sort(
        (a, b) => new Date(a.cupDrunkDate) - new Date(b.cupDrunkDate)
      ),
    [cupDrunkListToday]
  );
  const cupDrunkNum = sortedCupDrunkListToday.length;
  const totalCupsArr = calTotalCupsArr(
    waterIntakeVolume,
    waterPerCupDefault,
    sortedCupDrunkListToday
  );

  // Xử lý sự kiện khi click vào cốc
  function handleCupClick(cupDrunk, isDrunk) {
    onCupClick(cupDrunk, isDrunk);
  }

  return (
    <View style={styles.statusWaterContainer}>
      {totalCupsArr.map((_, index) => {
        const isDrunk = index < cupDrunkNum;
        const cupDrunk = sortedCupDrunkListToday[index];
        const disabled = index > cupDrunkNum;

        // Xác định icon cốc dựa vào trạng thái
        const cupIcon = isDrunk
          ? {
              name: "cup",
              color: colors.waterColor,
              volume: `${cupDrunk.waterPerCup} ml`,
            }
          : disabled
          ? { name: "cup-outline", color: "#A9A9A9" }
          : { name: "cup-water", color: "#B0C4DE" };

        return (
          <PressableIcon
            key={index}
            onPress={() => handleCupClick(cupDrunk, isDrunk)}
            disabled={disabled}
            style={styles.cup}
          >
            <MCIcons
              name={cupIcon.name}
              size={Sizes.XL}
              color={cupIcon.color}
            />
            <Text style={styles.volumeWaterPerCup}>{cupIcon.volume}</Text>
          </PressableIcon>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  statusWaterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.XS,
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
  cup: {
    alignItems: "center",
    justifyContent: "center",
    height: Sizes.XXXL,
  },
  volumeWaterPerCup: {
    fontSize: Typography.XS,
  },
});
