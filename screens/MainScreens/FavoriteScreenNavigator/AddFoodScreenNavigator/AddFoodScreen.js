import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AddNameFoodContainer from "../../../../components/AddNewFoodScreen/AddNameFoodContainer";
import Heading from "../../../../components/AddNewFoodScreen/Heading";
import AddServingSizeContainer from "../../../../components/AddNewFoodScreen/AddServingSizeContainer";
import ContinueButton from "../../../../components/ContinueButton";
import useFoodContext from "../../../../hooks/useFoodContext";
import {
  alertNotification,
  convertToNumber,
  isValidNumber,
} from "../../../../utils/Common";

export default function AddFoodScreen({ navigation }) {
  const [state, dispatch] = useFoodContext();
  const { nameFood, servingSize, measurement } = state;
  function handleNavigateScreen() {
    const validationRules = [
      {
        condition: !nameFood,
        title: "Invalid Name",
        message: "Please try again with Name Food",
      },
      {
        condition: !measurement,
        title: "Invalid Name of the serving",
        message: "Please try again with Name of the serving",
      },
      {
        condition:
          !servingSize ||
          convertToNumber(servingSize) < 0 ||
          !isValidNumber(servingSize),
        title: "Invalid serving size",
        message: "Please try again with serving size",
      },
    ];

    for (const rule of validationRules) {
      if (rule.condition) {
        alertNotification(rule.title, rule.message);
        return;
      }
    }

    navigation.navigate("AddNutritionFoodScreen");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.flex}>
          <Heading>Basic information</Heading>
          <AddNameFoodContainer />
          <Heading>Serving Size</Heading>
          <AddServingSizeContainer />
          <ContinueButton onPress={handleNavigateScreen} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
