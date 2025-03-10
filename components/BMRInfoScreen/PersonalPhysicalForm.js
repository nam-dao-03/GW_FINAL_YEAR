import { StyleSheet, View, Text, TextInput } from "react-native";
import DropdownGender from "./DropdownGender";
import colors from "../../utils/Colors";
import usePersonContext from "../../hooks/usePersonContext";
import { personActions } from "../../context/person";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
export default function PersonalPhysicalForm() {
  const [state, dispatch] = usePersonContext();
  function changeHeightInput(value) {
    const validValue = value.trim();
    dispatch(personActions.changeHeightInput(validValue));
  }
  function changeWeightInput(value) {
    const validValue = value.trim();
    dispatch(personActions.changeWeightInput(validValue));
  }
  function changeAgeInput(value) {
    const validValue = value.trim();
    dispatch(personActions.changeAgeInput(validValue));
  }
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Gender</Text>
      <DropdownGender />
      <Text style={[styles.label, { marginTop: 10 }]}>Height (cm)</Text>
      <TextInput
        style={styles.heightInput}
        keyboardType="numeric"
        maxLength={5}
        placeholder="Height (cm)"
        value={state.height}
        onChangeText={changeHeightInput}
      />
      <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.heightInput}
            keyboardType="default"
            maxLength={5}
            placeholder="Weight (kg)"
            value={state.weight}
            onChangeText={changeWeightInput}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.heightInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="Age"
            value={state.age}
            onChangeText={changeAgeInput}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: Spacing.XL,
    backgroundColor: colors.whiteColor,
    marginHorizontal: Spacing.XL,
    padding: Spacing.MD,
    borderRadius: Spacing.XL,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  label: {
    fontSize: Typography.MD,
    color: colors.textColor,
    marginBottom: Spacing.SM,
  },
  heightInput: {
    height: Sizes.XL,
    borderColor: colors.textColor,
    borderWidth: 0.5,
    borderRadius: Spacing.XS,
    fontSize: Typography.MD,
    paddingHorizontal: Spacing.SM,
  },
  inputGroup: {
    flex: 1,
  },
});
