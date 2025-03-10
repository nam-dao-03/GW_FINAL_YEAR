import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
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
    paddingHorizontal: Spacing.XL,
    paddingVertical: Spacing.XXL,
    marginHorizontal: Spacing.LG,
    backgroundColor: colors.whiteColor,
    borderTopRightRadius: Spacing.XL,
    borderRadius: Spacing.XS,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
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
    gap: Spacing.MD,
    alignItems: "center",
  },
  BMILabel: {
    fontSize: Typography.LG,
    color: colors.textColor,
  },
  BMIValue: {
    fontSize: Typography.XL,
    color: colors.tertiaryColor,
    fontWeight: "bold",
  },
  date: {
    fontSize: Typography.MD,
    color: colors.textColor,
  },
  separation: {
    flex: 1,
    width: "100%",
    height: 1,
    backgroundColor: colors.shadowColor,
    marginVertical: Spacing.LG,
  },
  bodyMassBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
  },
  heightContainer: {
    gap: Spacing.SM,
    alignItems: "center",
  },
  heightValue: {
    fontSize: Typography.MD,
    color: colors.textColor,
  },
  heightLabel: {
    fontSize: Typography.MD,
    color: colors.secondaryTextColor,
  },
  weightStatus: {
    fontSize: Typography.MD,
    color: colors.secondaryTextColor,
  },
  weightValue: {
    fontSize: Typography.MD,
    color: colors.textColor,
  },
  weightContainer: {
    marginRight: Spacing.XL,
    gap: 10,
    alignItems: "center",
  },
});
