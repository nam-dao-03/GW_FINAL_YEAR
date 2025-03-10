import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLayoutEffect } from "react";
import colors from "../utils/Colors";
import ActivityForm from "../components/BMRInfoScreen/ActivityForm";
import PersonalPhysicalForm from "../components/BMRInfoScreen/PersonalPhysicalForm";
import ContinueButton from "../components/ContinueButton";
import usePersonContext from "../hooks/usePersonContext";
import {
  alertNotification,
  convertToNumber,
  isValidNumber,
} from "../utils/Common";
import {
  DAY_PER_WEEK,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_WEIGHT,
  MAX_WEIGHT,
  MIN_AGE,
  MAX_AGE,
} from "../utils/constants";
import Spacing from "../utils/Spacing";
import Typography from "../utils/Typography";

export default function BMRInfoScreen({ navigation }) {
  // Styles for react navigation
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [state] = usePersonContext();
  const { minutes, days, gender, height, weight, age } = state;
  function handleNavigateScreen() {
    const validationRules = [
      {
        condition:
          !minutes || convertToNumber(minutes) < 0 || !isValidNumber(minutes),
        title: "Invalid Minutes",
        message: "Please try again with Minutes",
      },
      {
        condition:
          !days ||
          convertToNumber(days) > DAY_PER_WEEK ||
          convertToNumber(days) < 0 ||
          !isValidNumber(days),
        title: "Invalid days",
        message: "Please try again with days",
      },
      {
        condition: !gender,
        title: "Invalid gender",
        message: "Please try again with gender",
      },
      {
        condition:
          !height ||
          convertToNumber(height) <= MIN_HEIGHT ||
          convertToNumber(height) >= MAX_HEIGHT ||
          !isValidNumber(height),
        title: "Invalid Height",
        message: "Please try again with Height",
      },
      {
        condition:
          !weight ||
          convertToNumber(weight) <= MIN_WEIGHT ||
          convertToNumber(weight) >= MAX_WEIGHT ||
          !isValidNumber(weight),
        title: "Invalid Weight",
        message: "Please try again with Weight",
      },
      {
        condition:
          !age ||
          convertToNumber(age) <= MIN_AGE ||
          convertToNumber(age) >= MAX_AGE ||
          !isValidNumber(age),
        title: "Invalid Age",
        message: "Please try again with age",
      },
    ];

    for (const rule of validationRules) {
      if (rule.condition) {
        alertNotification(rule.title, rule.message);
        return;
      }
    }
    //navigate to SetTargetScreen
    navigation.navigate("SetTargetScreen");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.screenContainer} nestedScrollEnabled={true}>
          <View style={styles.header}>
            <Text style={styles.heading}>Basal Metabolic Rate (BMR)</Text>
          </View>
          <ActivityForm />
          <PersonalPhysicalForm />
          <ContinueButton
            onPress={handleNavigateScreen}
            extraStyle={styles.continueButton}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  header: {
    backgroundColor: colors.primaryColor,
    paddingTop: Spacing.MD,
    paddingBottom: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heading: {
    color: colors.whiteColor,
    fontSize: Typography.LG,
    fontWeight: "bold",
    textAlign: "center",
  },
  continueButton: {
    marginVertical: Spacing.LG,
  },
});
