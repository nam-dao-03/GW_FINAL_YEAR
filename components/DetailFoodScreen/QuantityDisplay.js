import { StyleSheet, View, TextInput } from "react-native";
import UnitDropdown from "./UnitDropdown";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import Sizes from "../../utils/Size";
const DEFAULT_SERVING_SIZE = "100";
const DEFAULT_QUANTITY_MEASUREMENT = "1";
export default function QuantityDisplay({
  quantityUnit,
  onChangeQuantityUnit,
  measurement,
  servingSize,
  unit,
}) {
  const { chooseUnit, quantity } = quantityUnit;
  //   console.log(">>>>", quantityUnit);
  const data = [
    { label: `${measurement} (${servingSize} ${unit})`, value: measurement },
    { label: unit, value: unit },
  ];

  function onChangeQuantityInput(value) {
    const newQuantityUnit = {
      chooseUnit,
      quantity: value,
    };
    onChangeQuantityUnit(newQuantityUnit);
  }

  function onChangeUnitInput(value) {
    const newQuantityUnit = {
      chooseUnit: value,
      quantity:
        value === measurement
          ? DEFAULT_QUANTITY_MEASUREMENT
          : DEFAULT_SERVING_SIZE,
    };
    onChangeQuantityUnit(newQuantityUnit);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        maxLength={5}
        placeholder={quantity}
        value={quantity}
        onChangeText={onChangeQuantityInput}
      />
      <UnitDropdown data={data} onChangeUnitInput={onChangeUnitInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.SM,
    paddingVertical: Spacing.MD,
    borderRadius: Spacing.SM,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.MD,
  },
  textInput: {
    width: Sizes.HUGE,
    height: Sizes.XXXL,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
    borderRadius: Spacing.SM,
    paddingHorizontal: Spacing.XS,
  },
});
