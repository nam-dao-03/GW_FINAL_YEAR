import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../../utils/Colors";

export default function InputGroup({
  styleExtra,
  placeHolder = "placeholder...",
  maxLength = 3,
  label,
  value,
  onChangeText,
}) {
  return (
    <View style={[styles.inputGroup, styleExtra]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        keyboardType="numeric"
        maxLength={maxLength}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    width: "80%",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 20,
    width: "50%",
    height: 50,
    borderColor: colors.textColor,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  label: {
    fontSize: 20,
    color: colors.textColor,
  },
});
