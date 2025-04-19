import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import colors from "../../utils/Colors";
import PressableIcon from "../shared/PressableIcon";
import Spacing from "../../utils/Spacing";
import { removeSeconds } from "../../utils/Date";
export default function WaterNotification({
  id,
  onChangeNotificationTime,
  waterPerCup = 100,
  notificationTime = "20:00",
}) {
  return (
    <View style={styles.container}>
      <PressableIcon
        onPress={() => onChangeNotificationTime(id)}
        style={styles.cup}
      >
        <MCIcons name="cup" size={Sizes.XXL} color={colors.waterColor} />
        <Text style={styles.volumeWaterPerCup}>{waterPerCup} ml</Text>
        <Text style={styles.notificationPerCup}>
          {removeSeconds(notificationTime)}
        </Text>
      </PressableIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  cup: {
    alignItems: "center",
    justifyContent: "center",
    height: Sizes.HUGE,
  },
  volumeWaterPerCup: {
    fontSize: Typography.XS,
    color: colors.descriptionTextColor,
  },
  notificationPerCup: {
    fontSize: Typography.XS,
    color: colors.textColor,
    marginTop: Spacing.XXS,
    textAlign: "center",
    borderRadius: Spacing.XS,
    backgroundColor: colors.lightBlue,
    paddingHorizontal: Spacing.XS,
    paddingVertical: Spacing.XXS,
  },
});
