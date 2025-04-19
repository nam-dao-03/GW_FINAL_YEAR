import { StyleSheet, TextInput, View, Text } from "react-native";
import Typography from "../../utils/Typography";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";

export default function TextInputContainer({
  title,
  style,
  placeholder,
  value,
  onChangeText,
  maxLength = 5,
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChangeText={onChangeText}
        style={styles.textInput}
        keyboardType="default"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.MD,
    color: colors.textColor,
  },
  textInput: {
    borderBottomColor: colors.shadowColor,
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.XXS,
    height: Sizes.XL,
    fontSize: Typography.SM,
  },
});
