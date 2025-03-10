import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
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
    paddingHorizontal: Spacing.XL,
    paddingVertical: Spacing.XXL,
    backgroundColor: colors.whiteColor,
    borderTopRightRadius: Spacing.XL,
    borderRadius: Spacing.XS,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
    marginHorizontal: Spacing.LG,
    alignItems: "center",
  },
  waterDescription: {
    fontSize: Typography.MD,
    color: colors.textColor,
    width: "60%",
    lineHeight: Spacing.XXL,
    flexWrap: "wrap",
  },
  waterValue: {
    color: colors.tertiaryColor,
    fontWeight: "bold",
    fontSize: Typography.XL,
  },
});
