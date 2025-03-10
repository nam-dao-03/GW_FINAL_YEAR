import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import NutritionFactsPie from "../../../../components/NutritionFactsPie";
import useAppContext from "../../../../hooks/useAppContext";
import DailyNutritionBreakdown from "../../../../components/DailyNutritionBreakdown";
import Spacing from "../../../../utils/Spacing";
import { getLocalDate } from "../../../../utils/Date";
import CustomButton from "../../../../components/CustomButton";
import Typography from "../../../../utils/Typography";
import colors from "../../../../utils/Colors";
import QuantityDisplay from "../../../../components/DetailFoodScreen/QuantityDisplay";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome6 as FA6 } from "@expo/vector-icons/";
import PressableIcon from "../../../../components/PressableIcon";
import Sizes from "../../../../utils/Size";
import { calculateNutrition } from "../../../../utils/Indicators";

export default function DetailFoodScreen({ navigation, route }) {
  const [state, dispatch] = useAppContext();
  const { foodList, dailyNutritionList } = state;
  const { foodId } = route.params;
  const food = foodList.find((item) => item.getFoodId() === foodId);
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: food.nameFood,
        headerRight: () => (
          <PressableIcon
            style={{ paddingTop: Spacing.MD }}
            onPress={handleNavigateScreen}
          >
            <FA6 name="pencil" size={Sizes.MD} color={colors.whiteColor} />
          </PressableIcon>
        ),
      });
    }, [navigation])
  );
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
  function handleNavigateScreen() {
    navigation.navigate("UpdateFoodScreen", { food });
  }
  const calculatedNutritionObj = calculateNutrition(nutritionObj, quantityUnit);
  return (
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
          nutritionObj={nutritionObj}
          quantityUnit={quantityUnit}
          calculatedNutritionObj={calculatedNutritionObj}
          style={{ marginTop: Spacing.MD }}
          nutritionTarget={nutritionTarget}
        />
        <CustomButton style={styles.button}>Add to journal</CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    marginHorizontal: Spacing.SM,
    marginTop: Spacing.MD,
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
  button: {
    marginVertical: Spacing.SM,
  },
});
