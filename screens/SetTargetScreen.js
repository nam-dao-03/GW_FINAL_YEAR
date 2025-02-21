import { useCallback, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import colors from "../utils/Colors";
import Target from "../components/SetTargetScreen/Target";
import ContinueButton from "../components/ContinueButton";
import usePersonContext from "../hooks/usePersonContext";
import { personActions } from "../context/person";
import {
  GAIN_MORE_WEIGHT,
  GAIN_WEIGHT,
  LOSE_MORE_WEIGHT,
  LOSE_WEIGHT,
  MAINTAIN_WEIGHT,
  MAX_WEIGHT,
  MIN_WEIGHT,
} from "../utils/constants";
import {
  alertNotification,
  convertToNumber,
  isValidNumber,
} from "../utils/Common";
import { useFocusEffect } from "@react-navigation/native";

export default function SetTargetScreen({ navigation }) {
  const [state, dispatch] = usePersonContext();
  useFocusEffect(
    useCallback(() => {
      personActions.changeTargetInput("", dispatch);
      personActions.changeTargetWeightInput("", dispatch);
    }, [dispatch])
  );
  const changeTargetInput = useCallback(
    (value) => {
      personActions.changeTargetInput(value, dispatch);
    },
    [dispatch]
  );

  const changeTargetWeightInput = useCallback(
    (value) => {
      personActions.changeTargetWeightInput(value, dispatch);
    },
    [dispatch]
  );
  const { targetWeight, target, weight } = state;
  const target_list = useMemo(
    () => [
      {
        heading: "Lose more weight",
        description: (
          <Text>
            Manage Your Weight the Smart Way: Shed{" "}
            <Text style={styles.strongText}>0.5 kg</Text> Every Week with
            Balanced Eating!
          </Text>
        ),
        selected: target === LOSE_MORE_WEIGHT,
        status: LOSE_MORE_WEIGHT,
        onPress: changeTargetInput,
      },
      {
        heading: "Lose weight",
        description: (
          <Text>
            Achieve Steady Progress: Lose{" "}
            <Text style={styles.strongText}>0.25 kg</Text> per Week by Making
            Smarter Food Choices!
          </Text>
        ),
        selected: target === LOSE_WEIGHT,
        status: LOSE_WEIGHT,
        onPress: changeTargetInput,
      },
      {
        heading: "Maintain weight",
        description:
          "Elevate Your Well-Being: Optimize Your Health with Nutritious and Mindful Eating!",
        selected: target === MAINTAIN_WEIGHT,
        status: MAINTAIN_WEIGHT,
        onPress: changeTargetInput,
      },
      {
        heading: "Gain weight",
        description: (
          <Text>
            Healthy Gains: Add <Text style={styles.strongText}>0.25 kg</Text>{" "}
            per Week with a Clean and Nourishing Diet!
          </Text>
        ),
        selected: target === GAIN_WEIGHT,
        status: GAIN_WEIGHT,
        onPress: changeTargetInput,
      },
      {
        heading: "Gain more weight",
        description: (
          <Text>
            Build Strength and Weight: Gain{" "}
            <Text style={styles.strongText}>0.5 kg</Text> per Week by Fueling
            Your Body Right!
          </Text>
        ),
        selected: target === GAIN_MORE_WEIGHT,
        status: GAIN_MORE_WEIGHT,
        onPress: changeTargetInput,
      },
    ],
    [target, changeTargetInput]
  );

  //Navigate to IndicatorsOverviewScreen
  function handleNavigateScreen() {
    const validationRules = [
      {
        condition: target !== MAINTAIN_WEIGHT && !targetWeight,
        message: "Don't leave Target weight input field empty.",
      },
      {
        condition: !isValidNumber(targetWeight),
        message: "Try again with other number.",
      },
      {
        condition:
          (target === LOSE_MORE_WEIGHT || target === LOSE_WEIGHT) &&
          convertToNumber(weight) < convertToNumber(targetWeight),
        message: `Target weight must be less than the current weight (${weight}kg).`,
      },
      {
        condition:
          (target === GAIN_MORE_WEIGHT || target === GAIN_WEIGHT) &&
          convertToNumber(weight) > convertToNumber(targetWeight),
        message: `Target weight must be greater than the current weight (${weight}kg).`,
      },
      {
        condition: convertToNumber(targetWeight) > MAX_WEIGHT,
        message: "The weight is to high.",
      },
      {
        condition: convertToNumber(targetWeight) < MIN_WEIGHT,
        message: "The weight is to low",
      },
    ];

    for (const rule of validationRules) {
      if (rule.condition) {
        alertNotification("Invalid value", rule.message);
        return;
      }
    }

    navigation.navigate("IndicatorsOverviewScreen");
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.screenContainer}>
        <ScrollView style={styles.screenContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.screenHeading}>What is your Target ?</Text>

            {target_list.map((item, index) => (
              <Target
                key={index}
                status={item.status}
                heading={item.heading}
                description={item.description}
                selected={item.selected}
                onPress={item.onPress}
              />
            ))}
            {target && target !== MAINTAIN_WEIGHT ? (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Target weight"
                maxLength={4}
                value={targetWeight}
                onChangeText={changeTargetWeightInput}
              />
            ) : (
              <></>
            )}
            {target ? <ContinueButton onPress={handleNavigateScreen} /> : <></>}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  innerContainer: {
    flex: 1,
    gap: 20,
    marginBottom: 40,
  },
  screenHeading: {
    marginTop: 20,
    marginHorizontal: "auto",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryColor,
  },
  strongText: {
    color: colors.secondaryColor,
    fontWeight: "bold",
  },
  input: {
    fontSize: 20,
    width: "50%",
    height: 50,
    borderColor: colors.textColor,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginHorizontal: "auto",
  },
});
