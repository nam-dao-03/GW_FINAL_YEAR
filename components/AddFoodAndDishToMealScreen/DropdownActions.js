import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import { BREAKFAST, DINNER, LUNCH, SNACK } from "../../utils/constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
const dataMeal = [
  { label: BREAKFAST, value: BREAKFAST },
  { label: LUNCH, value: LUNCH },
  { label: DINNER, value: DINNER },
  { label: SNACK, value: SNACK },
];

const dataFoodAndDish = [
  {
    label: "Food and Dish",
    value: "FoodAndDish",
  },
  {
    label: "Food List",
    value: "FoodList",
  },
  {
    label: "Dish List",
    value: "DishList",
  },
];

export default function DropdownActions({
  defaultValueMeal = BREAKFAST,
  defaultValueFoodDish = "FoodAndDish",
  onChangeMeal,
  onChangeFoodDishOption,
}) {
  const [valueMeal, setValueMeal] = useState(defaultValueMeal);
  const [valueFoodDish, setValueFoodDish] = useState(defaultValueFoodDish);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.whiteColor }]}
        selectedTextStyle={styles.selectedTextStyle}
        data={dataMeal}
        maxHeight={Sizes.HUGE * 3}
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
        data={dataFoodAndDish}
        maxHeight={Sizes.HUGE * 3}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        value={valueFoodDish}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValueFoodDish(item.value);
          onChangeFoodDishOption(item.value);
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
  container: {
    backgroundColor: colors.primaryColor,
    padding: Spacing.MD,
    paddingTop: 0,
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
