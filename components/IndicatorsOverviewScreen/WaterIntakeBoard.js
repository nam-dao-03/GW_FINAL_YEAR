import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
export default function WaterIntakeBoard({ waterIntake }) {
  return (
    <View style={styles.waterContainer}>
      <Text style={styles.waterDescription}>
        Your daily water intake requirement
      </Text>
      <Text style={styles.waterValue}>{waterIntake} ml</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  waterContainer: {
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
  waterDescription: {
    fontSize: 20,
    color: colors.textColor,
    width: "40%",
    lineHeight: 30,
    flexWrap: "wrap",
  },
  waterValue: {
    color: colors.tertiaryColor,
    fontWeight: "bold",
    fontSize: 28,
  },
});
