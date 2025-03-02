import { StyleSheet, Text, View } from "react-native";
import colors from "../../utils/Colors";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import PressableIcon from "../PressableIcon";

export default function StatusWaterContainer({
  onCupClick,
  waterIntakeVolume,
  waterPerCupDefault,
  cupDrunkListToday,
}) {
  const cupDrunkNum = cupDrunkListToday.length;

  // Lượng nước còn lại cần uống
  const waterIntakeRemaining =
    waterIntakeVolume -
    cupDrunkListToday.reduce(
      (consumed, cupDrunk) => consumed + cupDrunk.getWaterPerCup(),
      0
    );

  // Số cốc còn lại cần uống
  const cupsNumRemaining = Math.max(
    Math.ceil(waterIntakeRemaining / waterPerCupDefault),
    0
  );

  // Tạo mảng tổng số cốc hiển thị
  const totalCupsArr = Array(cupDrunkNum + cupsNumRemaining).fill(null);

  // Xử lý sự kiện khi click vào cốc
  function handleCupClick(cupDrunk, isDrunk) {
    onCupClick(cupDrunk, isDrunk);
  }

  return (
    <View style={styles.statusWaterContainer}>
      {totalCupsArr.map((_, index) => {
        const isDrunk = index < cupDrunkNum;
        const cupDrunk = cupDrunkListToday[index];
        const disabled = index > cupDrunkNum;

        // Xác định icon cốc dựa vào trạng thái
        const cupIcon = isDrunk
          ? {
              name: "cup",
              color: colors.waterColor,
              volume: `${cupDrunkListToday[index].waterPerCup} ml`,
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
            <MCIcons name={cupIcon.name} size={40} color={cupIcon.color} />
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
    gap: 6,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  cup: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  volumeWaterPerCup: {
    fontSize: 12,
  },
});
