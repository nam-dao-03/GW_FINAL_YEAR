import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Typography from "../../../../utils/Typography";
import colors from "../../../../utils/Colors";
import Spacing from "../../../../utils/Spacing";
import TextInputContainer from "../../../../components/AddNutritionFoodScreen/TextInputContainer";
import ContinueButton from "../../../../components/ContinueButton";
import useFoodContext from "../../../../hooks/useFoodContext";
import { foodActions } from "../../../../context/food";
import {
  alertNotification,
  convertToNumber,
  generateRandomString,
  isValidNumber,
} from "../../../../utils/Common";
import useAppContext from "../../../../hooks/useAppContext";
import { appActions } from "../../../../context/app";
import { Food } from "../../../../database/entities/Food";

export default function AddNutritionFoodScreen({ navigation }) {
  const [state, dispatch] = useFoodContext();
  const [_, appDispatch] = useAppContext();
  const {
    averageNutritional,
    calories,
    carbs,
    protein,
    fat,
    unit,
    nameFood,
    measurement,
    servingSize,
  } = state;
  function changeAverageNutritionalInput(value) {
    const validValue = value.trim();
    dispatch(foodActions.changeAverageNutritional(validValue));
  }
  function changeCaloriesInput(value) {
    const validValue = value.trim();
    dispatch(foodActions.changeCaloriesInput(validValue));
  }
  function changeCarbsInput(value) {
    const validValue = value.trim();
    dispatch(foodActions.changeCarbsInput(validValue));
  }

  function changeProteinInput(value) {
    const validValue = value.trim();
    dispatch(foodActions.changeProteinInput(validValue));
  }

  function changeFatInput(value) {
    const validValue = value.trim();
    dispatch(foodActions.changeFatInput(validValue));
  }
  const textInputContainerList = [
    {
      title: `Average nutritional values per (${unit})`,
      placeholder: `100${unit}`,
      value: averageNutritional,
      onChangeText: changeAverageNutritionalInput,
      style: {},
    },
    {
      title: "Calories",
      placeholder: "Required",
      value: calories,
      onChangeText: changeCaloriesInput,
      style: { marginTop: Spacing.XS },
    },
    {
      title: "Carbohydrat",
      placeholder: "Required",
      value: carbs,
      onChangeText: changeCarbsInput,
      style: { marginTop: Spacing.XS },
    },
    {
      title: "Protein",
      placeholder: "Required",
      value: protein,
      onChangeText: changeProteinInput,
      style: { marginTop: Spacing.XS },
    },
    {
      title: "Fat",
      placeholder: "Required",
      value: fat,
      onChangeText: changeFatInput,
      style: { marginTop: Spacing.XS },
    },
  ];

  function handleNavigateScreen() {
    const validationRules = [
      {
        condition:
          !averageNutritional ||
          convertToNumber(averageNutritional) < 0 ||
          convertToNumber(averageNutritional) > 1000 ||
          !isValidNumber(averageNutritional),
        title: "Invalid Average Nutritional",
        message: "Please try again with Average Nutritional",
      },
      {
        condition:
          !calories ||
          convertToNumber(calories) < 0 ||
          !isValidNumber(calories),
        title: "Invalid Calories",
        message: "Please try again with Calories",
      },
      {
        condition:
          !carbs || convertToNumber(carbs) < 0 || !isValidNumber(carbs),
        title: "Invalid Carbonhydrat",
        message: "Please try again with Carbonhydrat",
      },
      {
        condition:
          !protein || convertToNumber(protein) < 0 || !isValidNumber(protein),
        title: "Invalid Protein",
        message: "Please try again with Protein",
      },
      {
        condition: !fat || convertToNumber(fat) < 0 || !isValidNumber(fat),
        title: "Invalid Fat",
        message: "Please try again with Fat",
      },
    ];

    for (const rule of validationRules) {
      if (rule.condition) {
        alertNotification(rule.title, rule.message);
        return;
      }
    }
    const foodId = generateRandomString();
    const food = new Food(
      foodId,
      null,
      nameFood,
      null,
      convertToNumber(calories),
      convertToNumber(carbs),
      convertToNumber(fat),
      convertToNumber(protein),
      convertToNumber(averageNutritional),
      measurement,
      convertToNumber(servingSize),
      unit
    );
    appDispatch(appActions.createFood(food));
    navigation.getParent().navigate("FavoriteScreen");
  }
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.flex}>
          <Text style={styles.title}>Nutrition information</Text>
          <View style={styles.inputsContainer}>
            {textInputContainerList.map((item, index) => (
              <TextInputContainer
                key={index}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                onChangeText={item.onChangeText}
                style={item.style}
              />
            ))}
          </View>
          <ContinueButton
            extraStyle={{ marginTop: Spacing.SM }}
            onPress={handleNavigateScreen}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    fontSize: Typography.LG,
    color: colors.textColor,
    marginVertical: Spacing.MD,
    marginHorizontal: Spacing.SM,
  },
  inputsContainer: {
    padding: Spacing.MD,
    borderRadius: Spacing.MD,
    backgroundColor: colors.whiteColor,
    marginHorizontal: Spacing.SM,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
});
