import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
import { formatShortDate } from "../../utils/Date";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
export default function Calendar({
  date,
  onPressBtnLeft,
  onPressBtnRight,
  onPressCalender,
}) {
  return (
    <View style={styles.calenderContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.iconDirection, { opacity: 0.5 }]
            : [styles.iconDirection]
        }
        onPress={onPressBtnLeft}
      >
        <Ionicons
          name="chevron-back"
          size={Typography.LG}
          color={colors.whiteColor}
        />
      </Pressable>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.calendarInner, { opacity: 0.5 }]
            : [styles.calendarInner]
        }
        onPress={onPressCalender}
      >
        <View style={styles.iconDirection}>
          <Ionicons
            name="calendar"
            size={Typography.MD}
            color={colors.whiteColor}
          />
        </View>
        <Text style={styles.calenderValue}>{formatShortDate(date)}</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.iconDirection, { opacity: 0.5 }]
            : [styles.iconDirection]
        }
        onPress={onPressBtnRight}
      >
        <Ionicons
          name="chevron-forward"
          size={Typography.LG}
          color={colors.whiteColor}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  calenderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calendarInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.SM,
    marginHorizontal: Spacing.SM,
  },
  iconDirection: {
    padding: Sizes.XXS,
  },
  calenderValue: {
    fontSize: Typography.SM,
    color: colors.whiteColor,
  },
});
