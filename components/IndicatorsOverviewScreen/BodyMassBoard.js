import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
export default function BodyMassBoard({
  BMI,
  height,
  weight,
  statusBMI,
  date,
}) {
  return (
    <View style={styles.bodyMassBoard}>
      <View style={styles.bodyMassTop}>
        <View style={styles.BMIContainer}>
          <Text style={styles.BMILabel}>BMI</Text>
          <Text style={styles.BMIValue}>{BMI}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.separation}></View>
      <View style={styles.bodyMassBottom}>
        <View style={styles.heightContainer}>
          <Text style={styles.heightValue}>{height} cm</Text>
          <Text style={styles.heightLabel}>Height</Text>
        </View>
        <View style={styles.weightContainer}>
          <Text style={styles.weightValue}>{weight} kg</Text>
          <Text style={styles.weightStatus}>{statusBMI}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyMassBoard: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    marginHorizontal: 20,
    backgroundColor: colors.whiteColor,
    borderTopRightRadius: 30,
    borderRadius: 5,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  bodyMassTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  BMIContainer: {
    flexDirection: "column",
    gap: 15,
    alignItems: "center",
  },
  BMILabel: {
    fontSize: 24,
    color: colors.textColor,
  },
  BMIValue: {
    fontSize: 28,
    color: colors.tertiaryColor,
    fontWeight: "bold",
  },
  date: {
    fontSize: 20,
    color: colors.textColor,
  },
  separation: {
    flex: 1,
    width: "100%",
    height: 1,
    backgroundColor: colors.shadowColor,
    marginVertical: 20,
  },
  bodyMassBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  heightContainer: {
    gap: 10,
    alignItems: "center",
  },
  heightValue: {
    fontSize: 20,
    color: colors.textColor,
  },
  heightLabel: {
    fontSize: 20,
    color: colors.secondaryTextColor,
  },
  weightStatus: {
    fontSize: 20,
    color: colors.secondaryTextColor,
  },
  weightValue: {
    fontSize: 20,
    color: colors.textColor,
  },
  weightContainer: {
    marginRight: 30,
    gap: 10,
    alignItems: "center",
  },
});
