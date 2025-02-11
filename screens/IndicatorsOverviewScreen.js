import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../utils/Colors";
import Heading from "../components/IndicatorsOverviewScreen/Heading";
import ContinueButton from "../components/ContinueButton";

export default function IndicatorsOverviewScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Indicators Overview",
      headerStyle: {
        backgroundColor: colors.primaryColor,
      },
      headerBackTitle: "Back",
      headerTintColor: colors.whiteColor,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
    });
  }, []);

  function handleNavigateScreen() {
    navigation.navigate("MainScreens");
  }

  return (
    <ScrollView style={styles.screenContainer}>
      {/* caloriesBoard */}
      <Heading>nang luong nap vao</Heading>
      <View style={styles.caloriesBoard}>
        <View style={styles.caloriesTextContainer}>
          <Text style={styles.calories}>2999</Text>
          <Text style={styles.caloriesDesc}>Kcal/Day</Text>
        </View>
        <Text style={styles.targetDay}>
          You will reach your goal in{" "}
          <Text style={styles.strongTargetDay}>60</Text> days.
        </Text>
      </View>
      <Heading>Body Mass Index (BMI)</Heading>
      <View style={styles.bodyMassBoard}>
        <View style={styles.bodyMassTop}>
          <View style={styles.BMIContainer}>
            <Text style={styles.BMILabel}>BMI</Text>
            <Text style={styles.BMIValue}>15.4</Text>
          </View>
          <Text style={styles.date}>14 May 2024</Text>
        </View>
        <View style={styles.separation}></View>
        <View style={styles.bodyMassBottom}>
          <View style={styles.heightContainer}>
            <Text style={styles.heightValue}>180 cm</Text>
            <Text style={styles.heightLabel}>Height</Text>
          </View>
          <View style={styles.weightContainer}>
            <Text style={styles.weightValue}>50 kg</Text>
            <Text style={styles.weightStatus}>Thieu can</Text>
          </View>
        </View>
      </View>
      <Heading>How much water should you drink?</Heading>
      <View style={styles.waterContainer}>
        <Text style={styles.waterDescription}>
          Your daily water intake requirement
        </Text>
        <Text style={styles.waterValue}>1950.0 ml</Text>
      </View>

      <ContinueButton
        onPress={handleNavigateScreen}
        extraStyle={styles.continueButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
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
  continueButton: {
    marginVertical: 20,
  },
});
