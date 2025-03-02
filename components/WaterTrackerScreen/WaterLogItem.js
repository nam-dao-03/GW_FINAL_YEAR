import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons as MCIIcon } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../../utils/Colors";
import PressableIcon from "../PressableIcon";
import { extractDate, extractTime, getRelativeDate } from "../../utils/Date";
export default function WaterLogItem({ cupDrunk, onDeleteCupDrunkItem }) {
  const cupDrunkDate = extractDate(cupDrunk.getDate() || "2025-01-01 00:00:00");
  const cupDrunkTime = extractTime(cupDrunk.getDate() || "2025-01-01 00:00:00");
  const relativeDate = getRelativeDate(cupDrunkDate);
  return (
    <View style={styles.container}>
      <MCIIcon name="cup" size={30} color={colors.waterColor} />
      <Text style={styles.waterVolumeText}>
        {cupDrunk.getWaterPerCup() || 0} ml
      </Text>
      <Text style={styles.timeText}>
        {relativeDate} {cupDrunkTime}
      </Text>
      <PressableIcon
        style={styles.closeBtn}
        onPress={() =>
          onDeleteCupDrunkItem(cupDrunk.getCupDrunkId() || "12345678")
        }
      >
        <>
          <AntDesign name="close" size={20} color={colors.secondaryTextColor} />
        </>
      </PressableIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  waterVolumeText: {
    fontSize: 16,
    color: colors.textColor,
    marginLeft: 10,
  },
  timeText: {
    fontSize: 16,
    color: colors.textColor,
    marginLeft: "auto",
  },
  closeBtn: {
    borderRadius: "50%",
    backgroundColor: colors.shadowColor,
    marginLeft: "12",
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
