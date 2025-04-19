import { SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import AddNameFoodContainer from "../../../../components/AddNewFoodScreen/AddNameFoodContainer";
import Heading from "../../../../components/AddNewFoodScreen/Heading";
import AddServingSizeContainer from "../../../../components/AddNewFoodScreen/AddServingSizeContainer";
import ContinueButton from "../../../../components/shared/ContinueButton";
import useFoodContext from "../../../../hooks/useFoodContext";
import {
  alertNotification,
  convertToNumber,
  isValidNumber,
} from "../../../../utils/Common";
import { useEffect } from "react";
import { foodActions } from "../../../../context/food";
import KeyboardAvoidingWrapper from "../../../../components/shared/KeyboardAvoidingWrapper";

export default function UpdateFoodScreen({ navigation, route }) {
  const { food, sourceScreen } = route.params;
  const [state, dispatch] = useFoodContext();
  useEffect(() => {
    if (!food) return;
    const foodState = {
      ...food,
      averageNutritional: String(food.averageNutritional),
      calories: String(food.calories),
      protein: String(food.protein),
      carbs: String(food.carbs),
      fat: String(food.fat),
      servingSize: String(food.servingSize),
    };
    dispatch(foodActions.setFoodState(foodState));
  }, [food, dispatch]);
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
    navigation.navigate("UpdateNutritionFoodScreen", {
      food,
      sourceScreen,
    });
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.flex}>
          <Heading>Basic information</Heading>
          <AddNameFoodContainer />
          <Heading>Serving Size</Heading>
          <AddServingSizeContainer />
          <ContinueButton onPress={handleNavigateScreen} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
