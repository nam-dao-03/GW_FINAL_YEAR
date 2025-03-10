import { View, Text, StyleSheet } from "react-native";
import InputGroup from "./InputGroup";
import colors from "../../utils/Colors";
import usePersonContext from "../../hooks/usePersonContext";
import { personActions } from "../../context/person";
import Typography from "../../utils/Typography";
import Spacing from "../../utils/Spacing";
export default function ActivityForm() {
  const [state, dispatch] = usePersonContext();
  function changeMinutesInput(value) {
    const validValue = value.trim();
    dispatch(personActions.changeMinutesInput(validValue));
  }
  function changeDaysInput(value) {
    const validValue = value.trim();
    dispatch(personActions.changeDaysInput(validValue));
  }
  return (
    <View style={styles.formContainer}>
      <Text style={styles.formHeading}>How do you exercise?</Text>
      <InputGroup
        placeHolder="min/day"
        inputHint="minutes"
        label="Minutes"
        value={state.minutes}
        onChangeText={changeMinutesInput}
      />
      <InputGroup
        placeHolder="day/week"
        inputHint="days"
        maxLength={1}
        label="Days"
        value={state.days}
        onChangeText={changeDaysInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "90%",
    padding: Spacing.SM,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: Spacing.LG,
    marginTop: -70,
    marginHorizontal: "auto",
    // box shadow
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  formHeading: {
    fontSize: Typography.MD,
    color: colors.textColor,
    marginBottom: Spacing.LG,
  },
});
