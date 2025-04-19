import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Sizes from "../../utils/Size";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const UnitDropdown = ({ data, onChangeUnitInput }) => {
  const [value, setValue] = useState(data[0].value);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={Sizes.MASSIVE * 3}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onChangeUnitInput(item.value);
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
};

export default UnitDropdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    height: Sizes.XXXL,
    paddingHorizontal: 8,
    borderRadius: Spacing.SM,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
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
