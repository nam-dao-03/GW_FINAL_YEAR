import { StyleSheet, TextInput, View, Text } from "react-native";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
import PressableIcon from "./PressableIcon";
import { useRef, useState } from "react";
export default function SearchBar({
  style,
  navigation,
  placeholder,
  onSearch,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  function handleFocusInput() {
    inputRef.current.focus();
  }
  function handleUnfocusInput() {
    inputRef.current.blur();
  }

  function handleChangeText(value) {
    setSearchValue(value);
    onSearch(value);
  }
  function deleteAllText() {
    setSearchValue("");
    onSearch("");
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <PressableIcon style={{ padding: 0 }} onPress={handleFocusInput}>
          <Ionicons name="search-sharp" size={Sizes.MD} color="black" />
        </PressableIcon>
        <TextInput
          ref={inputRef}
          style={styles.input}
          onFocus={() => {
            setIsFocused(true);
            navigation?.setOptions({ headerShown: false }); // Ẩn header khi focus
          }}
          onBlur={() => {
            setIsFocused(false);
            navigation?.setOptions({ headerShown: true }); // Hiện lại header khi mất focus
          }}
          placeholder={placeholder}
          value={searchValue}
          onChangeText={handleChangeText}
        />
        {searchValue && (
          <PressableIcon onPress={deleteAllText}>
            <Ionicons
              name="close-circle-sharp"
              size={Sizes.SM * 1.3}
              color={colors.shadowColor}
            />
          </PressableIcon>
        )}
      </View>
      {isFocused ? (
        <PressableIcon onPress={handleUnfocusInput}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </PressableIcon>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.MD,
    paddingVertical: Spacing.XL,
    backgroundColor: colors.primaryColor,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    borderRadius: Spacing.MD,
    paddingHorizontal: Spacing.SM,
  },
  input: {
    flex: 1,
    height: Sizes.XL,
    fontSize: Typography.SM,
    color: colors.textColor,
    paddingHorizontal: Spacing.MD,
    backgroundColor: colors.whiteColor,
    borderRadius: Spacing.MD,
  },
  cancelButton: {
    fontSize: Typography.SM,
    color: colors.whiteColor,
  },
});
