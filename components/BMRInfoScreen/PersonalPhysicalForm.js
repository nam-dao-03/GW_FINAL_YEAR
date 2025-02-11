import { StyleSheet, View, Text, TextInput } from "react-native";
import DropdownGender from "./DropdownGender";
import colors from "../../utils/Colors";

export default function PersonalPhysicalForm() {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Gender</Text>
      <DropdownGender />
      <Text style={[styles.label, { marginTop: 10 }]}>Height</Text>
      <TextInput
        style={styles.heightInput}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Height"
      />
      <View style={{ flexDirection: "row", gap: 20, marginTop: 10 }}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.heightInput}
            keyboardType="decimal-pad"
            maxLength={4}
            placeholder="Height"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.heightInput}
            keyboardType="numeric"
            maxLength={2}
            placeholder="Age"
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
