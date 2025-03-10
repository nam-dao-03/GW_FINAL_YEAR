import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons as MCIIcon } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "../../utils/Colors";
import PressableIcon from "../PressableIcon";
import { extractDate, extractTime, getRelativeDate } from "../../utils/Date";
import Typography from "../../utils/Typography";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
export default function WaterLogItem({ cupDrunk, onDeleteCupDrunkItem }) {
  const cupDrunkDate = extractDate(cupDrunk.getDate() || "2025-01-01 00:00:00");
  const cupDrunkTime = extractTime(cupDrunk.getDate() || "2025-01-01 00:00:00");
  const relativeDate = getRelativeDate(cupDrunkDate);
  return (
    <View style={styles.container}>
      <MCIIcon name="cup" size={Sizes.LG} color={colors.waterColor} />
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
          <AntDesign
            name="close"
            size={Typography.MD}
            color={colors.secondaryTextColor}
          />
        </>
      </PressableIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.SM,
    flexDirection: "row",
    paddingHorizontal: Spacing.LG,
    paddingVertical: Spacing.SM,
    borderRadius: Spacing.XL,
    alignItems: "center",
    marginHorizontal: Spacing.LG,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Sizes.TINY * 4 },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
  },
  waterVolumeText: {
    fontSize: Typography.SM,
    color: colors.textColor,
    marginLeft: Spacing.SM,
  },
  timeText: {
    fontSize: Typography.SM,
    color: colors.textColor,
    marginLeft: "auto",
  },
  closeBtn: {
    borderRadius: "50%",
    backgroundColor: colors.shadowColor,
    marginLeft: Spacing.SM,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Sizes.TINY * 4 },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
  },
});
