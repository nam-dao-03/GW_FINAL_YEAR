import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
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
  style = {},
}) {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    setNumber(defaultNumber);
  }, [defaultNumber]);
  function reduceNumber() {
    if (number <= 1) return; // Prevent negative numbers
    const newNumber = number - 1;
    setNumber(newNumber);
    if (onReduceNumber) {
      onReduceNumber(newNumber);
    }
  }

  function increaseNumber() {
    const newNumber = number + 1;
    setNumber(newNumber);
    if (onIncreaseNumber) {
      onIncreaseNumber(newNumber);
    }
  }

  function handleChangeNumber(text) {
    const parsedNumber = parseInt(text, 10);
    if (!isNaN(parsedNumber)) {
      setNumber(parsedNumber);
      if (onChangeNumber) {
        onChangeNumber(parsedNumber);
      }
    } else {
      setNumber(0);
    }
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
          keyboardType="numeric"
          maxLength={4}
          value={number.toString()}
          onChangeText={handleChangeNumber}
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
