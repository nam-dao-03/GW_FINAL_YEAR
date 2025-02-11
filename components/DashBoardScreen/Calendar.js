import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
export default function Calendar() {
  return (
    <View style={styles.calenderContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.iconDirection, { opacity: 0.5 }]
            : [styles.iconDirection]
        }
      >
        <Ionicons name="chevron-back" size={24} color={colors.whiteColor} />
      </Pressable>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.calendarInner, { opacity: 0.5 }]
            : [styles.calendarInner]
        }
      >
        <View style={styles.iconDirection}>
          <Ionicons name="calendar" size={20} color={colors.whiteColor} />
        </View>
        <Text style={styles.calenderValue}>9 thang 2</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.iconDirection, { opacity: 0.5 }]
            : [styles.iconDirection]
        }
      >
        <Ionicons name="chevron-forward" size={24} color={colors.whiteColor} />
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
    gap: 10,
    marginHorizontal: 20,
  },
  iconDirection: {
    padding: 2,
  },
  calenderValue: {
    fontSize: 16,
    color: colors.whiteColor,
  },
});
