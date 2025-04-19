import { View, Text, StyleSheet, TextInput } from "react-native";
import ServingSizeDropdown from "./ServingSizeDropdown";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
import ServingSizeRadioGroup from "./ServingSizeRadioGroup";
import { foodActions } from "../../context/food";
import useFoodContext from "../../hooks/useFoodContext";
import { useEffect, useState } from "react";

const data = [
  {
    label: "Custom serving",
    value: "Custom serving",
    defaultServingSize: "100",
    unit: "g",
    unitDisabled: false,
  },
  {
    label: "One serving",
    value: "One serving",
    defaultServingSize: "100",
    unit: "g",
  }, // Giả định chung
  {
    label: "Cup",
    value: "Cup",
    defaultServingSize: "240",
    unit: "ml",
    unitDisabled: true,
  },
  {
    label: "Tablespoon - tbsp",
    value: "Tablespoon",
    defaultServingSize: "15",
    unit: "ml",
    unitDisabled: true,
  },
  {
    label: "Teaspoon - tsp",
    value: "Teaspoon",
    defaultServingSize: "5",
    unit: "ml",
    unitDisabled: true,
  },
  {
    label: "Slice",
    value: "Slice",
    defaultServingSize: "30",
    unit: "g",
    unitDisabled: true,
  }, // Trung bình
  {
    label: "Piece",
    value: "Piece",
    defaultServingSize: "50",
    unit: "g",
    unitDisabled: true,
  }, // Trung bình
  {
    label: "Handful",
    value: "Handful",
    defaultServingSize: "40",
    unit: "g",
    unitDisabled: true,
  }, // Trung bình
  {
    label: "Bowl",
    value: "Bowl",
    defaultServingSize: "250",
    unit: "ml",
    unitDisabled: true,
  },
];

export default function AddServingSizeContainer({}) {
  const [state, dispatch] = useFoodContext();
  const [isCustom, setIsCustom] = useState(true);
  const { measurement, servingSize, unit } = state;
  const nutritionObj = data.find((item) => item.value === measurement);
  useEffect(() => {
    const isCustom = data.some((item) => item.value === measurement);
    setIsCustom(!isCustom);
  }, [measurement]);
  function changeMeasurementDropdown(measurement) {
    const selectedItem = data.find((item) => item.value === measurement);
    if (measurement === data[0].value) {
      dispatch(foodActions.changeMeasurementInput(""));
      dispatch(foodActions.changeUnitInput(selectedItem?.unit || "g"));
      dispatch(
        foodActions.changeServingSize(selectedItem?.defaultServingSize || "100")
      );
      setIsCustom(true);
      return;
    }
    dispatch(foodActions.changeMeasurementInput(measurement));
    dispatch(foodActions.changeUnitInput(selectedItem?.unit || "g"));
    dispatch(
      foodActions.changeServingSize(selectedItem?.defaultServingSize || "100")
    );
    setIsCustom(false);
  }
  function changeMeasurementInput(value) {
    dispatch(foodActions.changeMeasurementInput(value));
  }
  function changeServingSizeInput(value) {
    dispatch(foodActions.changeServingSize(value));
  }
  function changeUnitInput(value) {
    dispatch(foodActions.changeUnitInput(value));
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a serving size</Text>
      <ServingSizeDropdown
        onChangeMeasurementDropdown={changeMeasurementDropdown}
        data={data}
        measurement={measurement}
      />
      {isCustom ? (
        <>
          <Text style={[styles.title, { marginTop: Spacing.XS }]}>
            Name of the serving
          </Text>
          <TextInput
            style={styles.textInput}
            value={measurement}
            onChangeText={changeMeasurementInput}
          />
        </>
      ) : (
        <></>
      )}
      <View style={styles.inputServingSizeContainer}>
        <Text style={styles.title}>
          1 {nutritionObj?.label || "Custom serving"}
        </Text>
        <TextInput
          style={styles.textInput2}
          maxLength={5}
          value={servingSize}
          onChangeText={changeServingSizeInput}
          placeholder={nutritionObj?.defaultServingSize || "100"}
        />
        <ServingSizeRadioGroup
          unit={nutritionObj?.unit || unit || "g"}
          disabled={nutritionObj?.unitDisabled || false}
          onChangeTextUnit={changeUnitInput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.MD,
    borderRadius: Spacing.MD,
    backgroundColor: colors.whiteColor,
    marginHorizontal: Spacing.SM,
    marginVertical: Spacing.MD,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  title: {
    fontSize: Typography.SM,
  },
  textInput: {
    marginTop: Spacing.XS,
    borderBottomWidth: 1,
    borderBottomColor: colors.shadowColor,
    paddingHorizontal: Spacing.XS,
    fontSize: Typography.SM,
  },
  inputServingSizeContainer: {
    marginTop: Spacing.SM,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput2: {
    borderBottomColor: colors.shadowColor,
    borderBottomWidth: 1,
    width: Sizes.XXXL,
    fontSize: Typography.SM,
    paddingHorizontal: Spacing.XXS,
  },
});
