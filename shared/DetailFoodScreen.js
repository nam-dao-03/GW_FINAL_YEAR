import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import NutritionFactsPie from "../components/shared/NutritionFactsPie";
import useAppContext from "../hooks/useAppContext";
import DailyNutritionBreakdown from "../components/shared/DailyNutritionBreakdown";
import Spacing from "../utils/Spacing";
import { getLocalDate } from "../utils/Date";
import CustomButton from "../components/shared/CustomButton";
import Typography from "../utils/Typography";
import colors from "../utils/Colors";
import QuantityDisplay from "../components/DetailFoodScreen/QuantityDisplay";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons as MCI } from "@expo/vector-icons/";
import Sizes from "../utils/Size";
import { calculateNutrition } from "../utils/Indicators";
import HeaderNavigation from "../components/shared/HeaderNavigation";
import BottomExtraPaddingScreen from "../components/shared/BottomExtraPaddingScreen";
import MoreDetailFoodModal from "../components/shared/MoreDetailFoodModal";
import useFoodActions from "../hooks/useFoodActions";
import AddFoodToMealModal from "../components/shared/AddFoodToMealModal";
import { appActions } from "../context/app";
import KeyboardAvoidingWrapper from "../components/shared/KeyboardAvoidingWrapper";
const iconHeaderRight = (
  <MCI
    name="dots-horizontal"
    style={{ marginTop: Spacing.XXS }}
    size={Sizes.MD}
    color={colors.whiteColor}
  />
);

export default function DetailFoodScreen({ navigation, route }) {
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  const [isMoreModalVisible, setIsMoreModalVisible] = useState(false);
  const [isAddFoodToMealModalVisible, setIsAddFoodToMealModalVisible] =
    useState(false);
  const [appState, appDispatch] = useAppContext();
  const { foodList, dailyNutritionList } = appState;
  const { foodId, sourceScreen, mealName, isDisableEditFoodFromDish } =
    route.params;
  const food = foodList.find((item) => item.getFoodId() === foodId);
  useFocusEffect(
    useCallback(() => {
      // bottomTabNavigation.setOptions({
      //   tabBarStyle: { display: "none" },
      // });
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title={food.nameFood}
            iconRight={iconHeaderRight}
            actionRight={toggleMoreModal}
          />
        ),
      });
      appDispatch(appActions.setFalseShowFAB());
    }, [navigation, route])
  );
  const { isDisableEdit, titleButton } = useFoodActions(sourceScreen) || {};

  function handleOpenAddFoodToMealModal() {
    setIsAddFoodToMealModalVisible(true);
  }

  function toggleMoreModal() {
    setIsMoreModalVisible((prev) => !prev);
  }
  const dailyNutrition = dailyNutritionList.find(
    (item) => item.getDate() === getLocalDate()
  );

  const [quantityUnit, setQuantityUnit] = useState({
    quantity: "1",
    chooseUnit: food.measurement,
  });

  function handleChangeQuantityUnit(quantityUnit) {
    setQuantityUnit(quantityUnit);
  }

  const nutritionObj = {
    calories: food.calories,
    carbs: food.carbs,
    protein: food.protein,
    fat: food.fat,
    measurement: food.measurement,
    averageNutritional: food.averageNutritional,
    unit: food.unit,
    servingSize: food.servingSize,
  };

  const nutritionTarget = {
    targetCalories: dailyNutrition.targetCalories,
    targetCarbs: dailyNutrition.targetCarbs,
    targetProtein: dailyNutrition.targetProtein,
    targetFat: dailyNutrition.targetFat,
  };

  const quantityDisplayProps = {
    measurement: food.measurement,
    unit: food.unit,
    servingSize: food.servingSize,
  };

  const calculatedNutritionObj = calculateNutrition(nutritionObj, quantityUnit);
  return (
    <>
      <MoreDetailFoodModal
        isModalVisible={isMoreModalVisible}
        setModalVisible={setIsMoreModalVisible}
        onNavigateEditScreen={() => {}}
        food={food}
        isDisableEdit={isDisableEdit || isDisableEditFoodFromDish}
      />
      <KeyboardAvoidingWrapper>
        <SafeAreaView style={styles.flex}>
          <ScrollView style={styles.flex}>
            <Text style={styles.title}>Nutrition Facts</Text>
            <QuantityDisplay
              {...quantityDisplayProps}
              quantityUnit={quantityUnit}
              onChangeQuantityUnit={handleChangeQuantityUnit}
            />
            <NutritionFactsPie
              calculatedNutritionObj={calculatedNutritionObj}
              style={{ marginTop: Spacing.MD }}
            />
            <Text style={styles.title}>Daily Target</Text>
            <DailyNutritionBreakdown
              calculatedNutritionObj={calculatedNutritionObj}
              style={{ marginTop: Spacing.MD }}
              nutritionTarget={nutritionTarget}
            />
            <BottomExtraPaddingScreen />
          </ScrollView>
          {titleButton && (
            <CustomButton
              style={styles.button}
              onPress={handleOpenAddFoodToMealModal}
            >
              {titleButton}
            </CustomButton>
          )}
        </SafeAreaView>
      </KeyboardAvoidingWrapper>
      <AddFoodToMealModal
        isVisible={isAddFoodToMealModalVisible}
        food={food}
        mealName={mealName}
        onBackdropPress={setIsAddFoodToMealModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    position: "relative",
  },
  title: {
    marginHorizontal: Spacing.SM,
    marginTop: Spacing.MD,
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
  button: {
    position: "absolute",
    bottom: Spacing.MD,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
});
