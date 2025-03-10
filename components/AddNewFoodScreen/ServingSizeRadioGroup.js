import { StyleSheet, View, Text, Pressable } from "react-native";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import { useState, useEffect } from "react";

const data = [
  {
    value: "g",
    label: "g",
  },
  {
    value: "ml",
    label: "ml",
  },
];

export default function ServingSizeRadioGroup({
  unit,
  disabled = false,
  onChangeTextUnit,
}) {
  const [value, setValue] = useState(unit || data[0].value);
  useEffect(() => {
    if (unit) {
      setValue(unit);
    }
  }, [unit]);
  function onHandleChangeRadio(value) {
    setValue(value);
    onChangeTextUnit(value);
  }
  function setStyleContainer(value, dataValue) {
    if (value === dataValue) {
      return [
        styles.radioContainerSelected,
        disabled ? { backgroundColor: colors.shadowColor } : {},
      ];
    } else {
      return styles.radioContainer;
    }
  }
  function setStyleText(value, dataValue) {
    if (value === dataValue) {
      return styles.radioTextSelected;
    } else {
      return styles.radioText;
    }
  }
  return (
    <View style={styles.container}>
      <Pressable
        style={setStyleContainer(value, data[0].value)}
        onPress={() => onHandleChangeRadio(data[0].value)}
        disabled={disabled}
      >
        <Text style={setStyleText(value, data[0].value)}>{data[0].label}</Text>
      </Pressable>
      <Pressable
        style={setStyleContainer(value, data[1].value)}
        onPress={() => onHandleChangeRadio(data[1].value)}
        disabled={disabled}
      >
        <Text style={setStyleText(value, data[1].value)}>{data[1].label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.XS,
  },
  radioContainerSelected: {
    backgroundColor: colors.primaryColor,
    width: Sizes.XL,
    height: Sizes.XL,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
  },
  radioContainer: {
    width: Sizes.XL,
    height: Sizes.XL,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
  },
  radioTextSelected: {
    fontSize: Typography.SM,
    color: colors.whiteColor,
  },
  radioText: {
    fontSize: Typography.SM,
    color: colors.textColor,
  },
});
