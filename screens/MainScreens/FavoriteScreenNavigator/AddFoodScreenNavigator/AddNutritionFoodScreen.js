import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import Typography from "../../../../utils/Typography";
import colors from "../../../../utils/Colors";
import Spacing from "../../../../utils/Spacing";
import TextInputContainer from "../../../../components/shared/TextInputContainer";
import ContinueButton from "../../../../components/shared/ContinueButton";
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
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import { DEFAULT_AVERAGE_NUTRITIONAL } from "../../../../utils/constants";
import KeyboardAvoidingWrapper from "../../../../components/shared/KeyboardAvoidingWrapper";
import { useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import HeaderNavigation from "../../../../components/shared/HeaderNavigation";
import Sizes from "../../../../utils/Size";
export default function AddNutritionFoodScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title="Add new Food"
            iconRight={
              <Ionicons name="scan" size={Sizes.MD} color={colors.whiteColor} />
            }
            actionRight={handleNavigateToImagePickerScreen}
          />
        ),
      });
    }, [])
  );
  const toast = useToast();
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

  function handleNavigateToImagePickerScreen() {
    navigation.navigate("NutritionFoodImagePickerScreen");
  }

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

  function handleCreateFood() {
    const validationRules = [
      {
        condition:
          !averageNutritional ||
          convertToNumber(averageNutritional) < 100 ||
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
    const scaleFactor = Math.floor(
      convertToNumber(averageNutritional) / DEFAULT_AVERAGE_NUTRITIONAL
    );
    const food = new Food(
      generateRandomString(), // foodId
      nameFood,
      null, // barcode
      convertToNumber(calories / scaleFactor),
      convertToNumber(carbs / scaleFactor),
      convertToNumber(fat / scaleFactor),
      convertToNumber(protein / scaleFactor),
      DEFAULT_AVERAGE_NUTRITIONAL,
      measurement,
      convertToNumber(servingSize),
      unit,
      1, // isFavorite,
      1 // isCreatedByUser
    );
    appDispatch(appActions.createFood(food));
    toast.show("Create Food successful", { type: "success" });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "FavoriteScreen" }],
      })
    );
  }
  return (
    <KeyboardAvoidingWrapper>
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
            onPress={handleCreateFood}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
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
