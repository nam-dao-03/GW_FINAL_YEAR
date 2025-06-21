import { Pressable, StyleSheet, TextInput, View } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import { useEffect, useState } from "react";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function NumberStepper({
  defaultNumber,
  onReduceNumber,
  onIncreaseNumber,
  onChangeNumber,
  keyboardType = "decimal-pad",
  style = {},
}) {
  const [inputValue, setInputValue] = useState("0");

  useEffect(() => {
    setInputValue(defaultNumber.toString());
  }, [defaultNumber]);

  function parseNumberOrZero(value) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  function reduceNumber() {
    const currentNumber = parseNumberOrZero(inputValue);
    if (currentNumber <= 0) return;
    const newNumber = parseFloat((currentNumber - 1).toFixed(2));
    setInputValue(newNumber.toString());
    if (onReduceNumber) {
      onReduceNumber(newNumber);
    }
  }

  function increaseNumber() {
    const currentNumber = parseNumberOrZero(inputValue);
    const newNumber = parseFloat((currentNumber + 1).toFixed(2));
    setInputValue(newNumber.toString());
    if (onIncreaseNumber) {
      onIncreaseNumber(newNumber);
    }
  }

  function handleChangeText(text) {
    setInputValue(text);

    onChangeNumber(text);
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.numberStepper}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.pressableIcon, { opacity: 0.5 }]
              : [styles.pressableIcon]
          }
          onPress={reduceNumber}
        >
          <Ionicons name="remove" size={Sizes.MD} color="black" />
        </Pressable>

        <TextInput
          style={styles.textInput}
          keyboardType={keyboardType}
          maxLength={4}
          value={inputValue}
          onChangeText={handleChangeText}
        />

        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.pressableIcon, { opacity: 0.5 }]
              : [styles.pressableIcon]
          }
          onPress={increaseNumber}
        >
          <Ionicons name="add" size={Sizes.MD} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.MD,
    paddingHorizontal: Spacing.LG,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
    borderRadius: Spacing.SM,
  },
  textInput: {
    flex: 1,
    height: Sizes.XL,
    fontSize: Typography.MD,
    color: colors.textColor,
    paddingHorizontal: Spacing.MD,
    backgroundColor: colors.whiteColor,
    borderRadius: Spacing.MD,
    borderBottomWidth: 1,
    textAlign: "center",
  },
  numberStepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.XL,
    paddingHorizontal: Spacing.XXL,
  },
  pressableIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.XXS * 2,
    borderRadius: 999,
  },
});
