import { TextInput, View, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import useFoodContext from "../../hooks/useFoodContext";
import { foodActions } from "../../context/food";
export default function AddNameFoodContainer({ style, textInputStyle }) {
  const [state, dispatch] = useFoodContext();
  const { nameFood } = state;
  function handleChangeText(text) {
    dispatch(foodActions.changeNameFoodInput(text));
  }
  return (
    <View style={[styles.section, style]}>
      <TextInput
        placeholder="Enter food name"
        value={nameFood}
        onChangeText={handleChangeText}
        placeholderTextColor={colors.shadowColor}
        style={[styles.textInput, textInputStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: Spacing.MD,
    borderRadius: Spacing.MD,
    backgroundColor: colors.whiteColor,
    marginHorizontal: Spacing.SM,
    marginTop: Spacing.MD,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  textInput: {
    paddingHorizontal: Spacing.XXS,
    fontSize: Spacing.MD,
    color: colors.textColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.shadowColor,
  },
});
