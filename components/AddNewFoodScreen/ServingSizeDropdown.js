import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import Sizes from "../../utils/Size";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import Spacing from "../../utils/Spacing";
// Đơn vị thể tích (chất lỏng & bột)
// 1 cốc (cup) ≈ 240 ml
// 1 muỗng canh (tablespoon - tbsp) ≈ 15 ml
// 1 muỗng cà phê (teaspoon - tsp) ≈ 5 ml
// Các đơn vị phổ biến khác
// 1 lát (slice) (bánh mì, thịt nguội, phô mai)
// 1 miếng (piece) (trái cây, thịt, bánh)
// 1 nắm tay (handful) (hạt, rau xanh)
// 1 chén (bowl) (súp, cơm)

const ServingSizeDropdown = ({
  onChangeMeasurementDropdown,
  data,
  measurement,
}) => {
  const [value, setValue] = useState(data[0].label);
  const [isFocus, setIsFocus] = useState(false);
  useEffect(() => {
    setValue(measurement || data[0].label);
  }, [measurement]);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: colors.primaryColor },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={Sizes.MASSIVE * 2}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? data[0].label : value}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          onChangeMeasurementDropdown(item.value);
          setIsFocus(false);
        }}
        itemContainerStyle={styles.itemContainerStyle}
        itemTextStyle={styles.itemTextStyle}
      />
    </View>
  );
};

export default ServingSizeDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  dropdown: {
    height: Sizes.XL,
    borderColor: "gray",
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.XXS,
  },
  placeholderStyle: {
    fontSize: Typography.SM,
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
