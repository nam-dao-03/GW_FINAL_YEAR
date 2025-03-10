import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import colors from "../../utils/Colors";
import usePersonContext from "../../hooks/usePersonContext";
import { personActions } from "../../context/person";
import Sizes from "../../utils/Size";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
const data = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const DropdownGender = () => {
  const [state, dispatch] = usePersonContext();
  function changeGenderInput(value) {
    dispatch(personActions.changeGenderInput(value));
  }
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: colors.primaryColor },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Gender" : "..."}
        value={state.gender}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          changeGenderInput(item.value);
          setIsFocus(false);
        }}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.itemContainerStyle}
      />
    </View>
  );
};

export default DropdownGender;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  dropdown: {
    height: Sizes.XL,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: Spacing.XS,
    paddingHorizontal: Spacing.XS,
  },
  placeholderStyle: {
    fontSize: Typography.MD,
  },
  selectedTextStyle: {
    fontSize: Typography.MD,
  },
  iconStyle: {
    width: Sizes.SM,
    height: Sizes.SM,
  },
  itemContainerStyle: {
    paddingHorizontal: 0,
  },
  itemTextStyle: {
    fontSize: Typography.SM,
  },
});
