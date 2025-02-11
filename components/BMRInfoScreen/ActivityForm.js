import { View, Text, StyleSheet } from "react-native";
import InputGroup from "./InputGroup";
import colors from "../../utils/Colors";
export default function ActivityForm() {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formHeading}>How do you exercise?</Text>
      <InputGroup
        placeHolder="minutes/day"
        inputHint="minutes"
        label="Minutes"
      />
      <InputGroup
        placeHolder="day/week"
        inputHint="days"
        maxLength={1}
        label="Days"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "90%",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: -70,
    marginHorizontal: "auto",
    // box shadow
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  formHeading: {
    fontSize: 20,
    color: colors.textColor,
    marginBottom: 20,
  },
});
