import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";

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
    padding: Spacing.SM,
    alignItems: "center",
    width: "80%",
    justifyContent: "space-between",
  },
  input: {
    fontSize: Typography.MD,
    width: "50%",
    height: Sizes.XL,
    borderColor: colors.textColor,
    borderWidth: 0.5,
    borderRadius: Spacing.XS,
    paddingHorizontal: Spacing.SM,
    backgroundColor: "#fff",
    marginRight: Spacing.SM,
  },
  label: {
    fontSize: Typography.MD,
    color: colors.textColor,
  },
});
