import { StyleSheet, View, Text, TextInput } from "react-native";
import DropdownGender from "./DropdownGender";
import colors from "../../utils/Colors";
import usePersonContext from "../../hooks/usePersonContext";
import { personActions } from "../../context/person";
export default function PersonalPhysicalForm() {
  const [state, dispatch] = usePersonContext();
  function changeHeightInput(value) {
    const validValue = value.trim();
    personActions.changeHeightInput(validValue, dispatch);
  }
  function changeWeightInput(value) {
    const validValue = value.trim();
    personActions.changeWeightInput(validValue, dispatch);
  }
  function changeAgeInput(value) {
    const validValue = value.trim();
    personActions.changeAgeInput(validValue, dispatch);
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
            keyboardType="decimal-pad"
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
    marginTop: 20,
    backgroundColor: colors.whiteColor,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    color: colors.textColor,
    marginBottom: 10,
  },
  heightInput: {
    height: 50,
    borderColor: colors.textColor,
    borderWidth: 0.5,
    borderRadius: 10,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  inputGroup: {
    flex: 1,
  },
});
