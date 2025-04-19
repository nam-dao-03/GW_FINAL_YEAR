import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import HeaderNavigation from "../components/shared/HeaderNavigation";
import useAppContext from "../hooks/useAppContext";
import Spacing from "../utils/Spacing";
import colors from "../utils/Colors";
import Typography from "../utils/Typography";
import SelectedFoodItem from "../components/DetailDishScreen/SelectedFoodItem";
import NutritionFactsPie from "../components/shared/NutritionFactsPie";
import { formatFloatNumber } from "../utils/Indicators";
import DailyNutritionBreakdown from "../components/shared/DailyNutritionBreakdown";
import BottomExtraPaddingScreen from "../components/shared/BottomExtraPaddingScreen";
import { getLocalDate } from "../utils/Date";
import {
  FontAwesome6 as FA6,
  MaterialCommunityIcons as MCI,
} from "@expo/vector-icons/";
import Sizes from "../utils/Size";
import { BREAKFAST, DEFAULT_AVERAGE_NUTRITIONAL } from "../utils/constants";
import { convertToNumber } from "../utils/Common";
import MoreDetailDishModal from "../components/shared/MoreDetailDishModal";
import CustomButton from "../components/shared/CustomButton";
import useDishActions from "../hooks/useDishActions";
import { appActions } from "../context/app";
import AddDishToMealModal from "../components/shared/AddDishToMealModal";
const iconHeaderRight = (
  <MCI
    name="dots-horizontal"
    style={{ marginTop: Spacing.XXS }}
    size={Sizes.MD}
    color={colors.whiteColor}
  />
);
export default function DetailDishScreen({ navigation, route }) {
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  const [isModalMoreVisible, setIsModalMoreVisible] = useState(false);
  const [isAddDishToMealModalVisible, setIsAddDishToMealModalVisible] =
    useState(false);
  useFocusEffect(
    useCallback(() => {
      // bottomTabNavigation.setOptions({
      //   tabBarStyle: { display: "none" },
      // });
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title={dish.getName()}
            iconRight={iconHeaderRight}
            actionRight={toggleMoreModal}
          />
        ),
      });
      appDispatch(appActions.setFalseShowFAB());
    }, [navigation])
  );
  const { dishId, sourceScreen, mealName } = route.params;
  const [appState, appDispatch] = useAppContext();
  const { dishList, dishFoodList, foodList, dailyNutritionList } = appState;

  const { titleButton, handleNavigateDetailFoodScreen, isDisableEdit } =
    useDishActions(sourceScreen);
  function handleOpenAddFoodToMealModal() {
    setIsAddDishToMealModalVisible(true);
  }

  function toggleMoreModal() {
    setIsModalMoreVisible((prev) => !prev);
  }

  const dailyNutrition = dailyNutritionList.find(
    (item) => item.getDate() === getLocalDate()
  );
  const dish = dishList.find((dish) => dish.dishId === dishId);
  const foodMap = new Map();
  dishFoodList.forEach((dishFood) => {
    if (dishFood.dishId === dishId) {
      const food = foodList.find((food) => food.foodId === dishFood.foodId);
      if (food) {
        if (foodMap.has(food.foodId)) {
          foodMap.get(food.foodId).quantity += 1;
        } else {
          foodMap.set(food.foodId, { quantity: 1, food });
        }
      }
    }
  });
  const foodListInDish = Array.from(foodMap.values());
  const calculatedNutritionObj = useMemo(() => {
    const nutrition = foodListInDish.reduce(
      (acc, { quantity, food }) => {
        const scaleFactor = convertToNumber(
          food.servingSize / DEFAULT_AVERAGE_NUTRITIONAL
        );
        acc.calories += (food.calories || 0) * quantity * scaleFactor;
        acc.protein += (food.protein || 0) * quantity * scaleFactor;
        acc.fat += (food.fat || 0) * quantity * scaleFactor;
        acc.carbs += (food.carbs || 0) * quantity * scaleFactor;
        return acc;
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );
    Object.keys(nutrition).forEach((key) => {
      nutrition[key] = formatFloatNumber(nutrition[key]);
    });
    return nutrition;
  }, [foodListInDish]);
  const nutritionTarget = useMemo(() => {
    return dailyNutrition
      ? {
          targetCalories: dailyNutrition.targetCalories,
          targetCarbs: dailyNutrition.targetCarbs,
          targetProtein: dailyNutrition.targetProtein,
          targetFat: dailyNutrition.targetFat,
        }
      : { targetCalories: 0, targetCarbs: 0, targetProtein: 0, targetFat: 0 };
  }, [dailyNutrition]);

  function handleNavigateUpdateScreen() {
    navigation.navigate("UpdateDishScreen", {
      dishId,
    });
  }

  const headerComponent = useMemo(() => {
    return (
      <View style={styles.flex}>
        <Text style={styles.title}>Dish Information</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{dish.getName()}</Text>
        </View>
        <Text style={styles.title}>Dish Ingredients</Text>
      </View>
    );
  }, []);
  const footerComponent = useMemo(() => {
    return (
      <View style={styles.flex}>
        <Text style={styles.title}>Nutritional Ingredients</Text>
        <NutritionFactsPie
          calculatedNutritionObj={calculatedNutritionObj}
          style={{ marginTop: Spacing.MD, marginHorizontal: 0 }}
        />
        <Text style={styles.title}>Daily Target</Text>
        <DailyNutritionBreakdown
          calculatedNutritionObj={calculatedNutritionObj}
          nutritionTarget={nutritionTarget}
          style={{ marginTop: Spacing.MD, marginHorizontal: 0 }}
        />
        <BottomExtraPaddingScreen />
      </View>
    );
  }, []);

  function renderFoodItem({ item }) {
    return (
      <SelectedFoodItem
        food={item.food}
        quantity={item.quantity}
        onNavigateDetailScreen={handleNavigateDetailFoodScreen}
      />
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <MoreDetailDishModal
        isModalVisible={isModalMoreVisible}
        setModalVisible={setIsModalMoreVisible}
        onNavigateEditScreen={handleNavigateUpdateScreen}
        dish={dish}
        isDisableEdit={isDisableEdit}
      />
      <FlatList
        data={foodListInDish}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderFoodItem}
        style={styles.flatList}
        initialScrollIndex={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Spacing.XL,
        }}
        ListHeaderComponentStyle={{ zIndex: 10 }}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
      />
      {titleButton && (
        <CustomButton
          style={styles.button}
          onPress={handleOpenAddFoodToMealModal}
        >
          {titleButton}
        </CustomButton>
      )}
      <AddDishToMealModal
        isVisible={isAddDishToMealModalVisible}
        dish={dish}
        mealName={mealName}
        onBackdropPress={setIsAddDishToMealModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flatList: {
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
  },
  title: {
    marginTop: Spacing.MD,
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
  name: {
    fontSize: Typography.SM,
    color: colors.textColor,
  },
  nameContainer: {
    paddingHorizontal: Spacing.SM,
    paddingVertical: Spacing.XS,
    borderRadius: Spacing.SM,
    backgroundColor: colors.whiteColor,
    marginTop: Spacing.XS,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  button: {
    position: "absolute",
    bottom: Spacing.MD,
    left: "50%",
    transform: [{ translateX: "-50%" }],
  },
});
