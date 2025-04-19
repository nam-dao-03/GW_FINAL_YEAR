import { TextInput, View, StyleSheet } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import useDishContext from "../../hooks/useDishContext";
import { dishActions } from "../../context/dish";
import { useCallback } from "react";
export default function AddNameDishContainer({ style, textInputStyle }) {
  const [state, dispatch] = useDishContext();
  const { nameDish } = state;

  const handleChangeNameDishInput = useCallback(
    (value) => {
      dispatch(dishActions.setDishName(value));
    },
    [dispatch]
  );
  return (
    <View style={[styles.section, style]}>
      <TextInput
        placeholder="Enter dish name"
        placeholderTextColor={colors.shadowColor}
        value={nameDish}
        onChangeText={handleChangeNameDishInput}
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
