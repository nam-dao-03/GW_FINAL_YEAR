import { Pressable, StyleSheet, Text, View } from "react-native";
import { generateRandomString } from "../../utils/Common";
import { BREAKFAST, DINNER, LUNCH, SNACK } from "../../utils/constants";
import { useToast } from "react-native-toast-notifications";
import { appActions } from "../../context/app";
import Modal from "react-native-modal";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import useAppContext from "../../hooks/useAppContext";
import { getLocalDate } from "../../utils/Date";
import CustomButton from "./CustomButton";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import { useState } from "react";
import { MealDish } from "../../database/entities/MealDish";
export default function AddDishToMealModal({
  isVisible,
  onBackdropPress,
  dish,
  mealName,
}) {
  const [appState, appDispatch] = useAppContext();
  const { mealList } = appState;
  const mealListToday = mealList.filter(
    (meal) => meal.getDate() === getLocalDate()
  );
  const toast = useToast();
  const [dropdown, setDropdown] = useState({
    meal: "",
    quantity: 1,
  });
  function changeDropdownMeal(meal) {
    setDropdown((prev) => ({ ...prev, meal }));
  }

  function changeDropdownQuantityOptions(quantity) {
    setDropdown((prev) => ({ ...prev, quantity }));
  }

  function handleAddFoodToMeal(dish) {
    const { nameDish, dishId } = dish;
    const mealTitle = dropdown.meal || mealName || BREAKFAST; // vì state ban đầu là "" nên nếu trường hợp người dùng chưa chọn meal thì sẽ mặc định là breakfast
    const mealObj = mealListToday.find((meal) => meal.getName() === mealTitle);
    const { mealId, nameMeal } = mealObj;
    for (let i = 0; i < dropdown.quantity; i++) {
      const mealDishId = generateRandomString();
      const mealDish = new MealDish(mealDishId, mealId, dishId);
      appDispatch(appActions.createMealDish(mealDish));
    }
    onBackdropPress(false); // tắt modal
    toast.show(`Added ${nameDish} to ${nameMeal}!`, { type: "success" });
  }

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={true} // Tăng hiệu suất animation
      hideModalContentWhileAnimating={true} // Ẩn nội dung khi animation
      backdropTransitionOutTiming={0}
      avoidKeyboard={true}
      onBackdropPress={() => onBackdropPress(false)}
      style={styles.modalStyle}
    >
      <View style={styles.modalContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.itemLeft}>
            <Text style={styles.favoriteHeading}>{dish?.nameDish || ""}</Text>
            <Text style={styles.favoriteDescription}>
              1 serving size - {dish?.calories || ""} kcal
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.pressableIcon, { opacity: 0.5 }]
                  : [styles.pressableIcon]
              }
              onPress={() => onBackdropPress(false)}
            >
              <Ionicons name="close-outline" size={Sizes.MD} color="black" />
            </Pressable>
          </View>
        </View>
        <DropdownActions
          defaultValueMeal={mealName}
          defaultQuantity={1}
          onChangeMeal={changeDropdownMeal}
          onChangeQuantityOptions={changeDropdownQuantityOptions}
        />
        <CustomButton
          style={{ marginTop: Spacing.MD }}
          onPress={() => handleAddFoodToMeal(dish)}
        >
          Add to Meal
        </CustomButton>
      </View>
    </Modal>
  );
}

const dataMeal = [
  { label: BREAKFAST, value: BREAKFAST },
  { label: LUNCH, value: LUNCH },
  { label: DINNER, value: DINNER },
  { label: SNACK, value: SNACK },
];

const numberOptions = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1}`,
  value: i + 1,
}));

function DropdownActions({
  defaultValueMeal = BREAKFAST,
  defaultQuantity = numberOptions[0].value,
  onChangeMeal,
  onChangeQuantityOptions,
}) {
  const [valueMeal, setValueMeal] = useState(defaultValueMeal);
  const [valueFoodDish, setValueFoodDish] = useState(defaultQuantity);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.whiteColor }]}
        selectedTextStyle={styles.selectedTextStyle}
        data={dataMeal}
        maxHeight={Sizes.MASSIVE}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        value={valueMeal}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValueMeal(item.value);
          onChangeMeal(item.value);
          setIsFocus(false);
        }}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.itemContainerStyle}
        renderRightIcon={() => (
          <MaterialIcons
            name="arrow-drop-down"
            size={Sizes.LG} // Thay đổi kích thước icon ở đây
            color={colors.blackColor}
          />
        )}
      />
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.whiteColor }]}
        selectedTextStyle={styles.selectedTextStyle}
        data={numberOptions}
        maxHeight={Sizes.MASSIVE}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        value={valueFoodDish}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValueFoodDish(item.value);
          onChangeQuantityOptions(item.value);
          setIsFocus(false);
        }}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.itemContainerStyle}
        renderRightIcon={() => (
          <MaterialIcons
            name="arrow-drop-down"
            size={Sizes.LG} // Thay đổi kích thước icon ở đây
            color={colors.blackColor}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  //modal
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: colors.whiteColor,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.SM,
    height: Sizes.MASSIVE * 3,
  },
  itemContainer: {
    marginVertical: Spacing.XS,
    paddingVertical: Spacing.MD,
    paddingHorizontal: Spacing.LG,
    borderRadius: Spacing.SM,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  itemLeft: {
    width: "60%",
    gap: 5,
  },
  favoriteHeading: {
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
  favoriteDescription: {
    fontSize: Typography.SM,
    color: colors.descriptionTextColor,
  },
  pressableIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.XXS * 2,
    borderRadius: "50%",
  },
  //dropdown
  container: {
    paddingVertical: Spacing.MD,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.SM,
  },
  dropdown: {
    flex: 1,
    height: Sizes.XL,
    borderColor: colors.whiteColor,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.whiteColor,
    elevation: 5,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  selectedTextStyle: {
    fontSize: Typography.SM,
  },
  itemContainerStyle: {
    paddingHorizontal: 0,
  },
  itemTextStyle: {
    fontSize: Typography.SM,
  },
});
