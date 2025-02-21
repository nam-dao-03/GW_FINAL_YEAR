import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
export default function CaloriesBoard({ TDEE, target, targetDay }) {
  return (
    <View style={styles.caloriesBoard}>
      <View style={styles.caloriesTextContainer}>
        <Text style={styles.calories}>{TDEE}</Text>
        <Text style={styles.caloriesDesc}>Kcal/Day</Text>
      </View>
      {target === "Maintain weight" ? (
        <Text style={styles.targetDay}>To maintain your healthy weight.</Text>
      ) : (
        <Text style={styles.targetDay}>
          You will reach your goal in{" "}
          <Text style={styles.strongTargetDay}>{targetDay}</Text> days.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  caloriesBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 40,
    backgroundColor: colors.whiteColor,
    borderTopRightRadius: 30,
    borderRadius: 5,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: 20,
    alignItems: "center",
  },
  caloriesTextContainer: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
  calories: {
    fontSize: 30,
    color: colors.tertiaryColor,
  },
  caloriesDesc: {
    fontSize: 16,
    color: colors.tertiaryColor,
  },
  targetDay: {
    fontSize: 18,
    width: "60%",
    flexWrap: "wrap",
    lineHeight: 30,
    color: colors.textColor,
  },
  strongTargetDay: {
    color: colors.secondaryColor,
    fontWeight: "bold",
    fontSize: 20,
  },
});
