import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import { showConfirmationDialog } from "../../utils/Common";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import { useNavigation } from "@react-navigation/native";
export default function ModalSettingAccount({ isVisible, onBackdropPress }) {
  const [appState, appDispatch] = useAppContext();
  const navigation = useNavigation();
  function handleDeleteData() {
    onBackdropPress();
    function onConfirm() {
      appDispatch(appActions.deleteAllData());
      navigation.reset({
        index: 0,
        routes: [{ name: "BMRInfoScreen" }],
      });
    }
    showConfirmationDialog(
      "Delete All Data?",
      "Do you want to continue?",
      onConfirm
    );
  }

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={true} // Tăng hiệu suất animation
      hideModalContentWhileAnimating={true} // Ẩn nội dung khi animation
      backdropTransitionOutTiming={0}
      onBackdropPress={onBackdropPress}
      style={styles.modalStyle}
    >
      <View style={styles.modalContainer}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [{ opacity: 0.5 }, styles.optionContainer]
              : [styles.optionContainer]
          }
          onPress={handleDeleteData}
        >
          <Ionicons
            name="trash-outline"
            size={Sizes.SM * 1.2}
            color={colors.tertiaryColor}
          />
          <Text style={styles.optionText}>Delete All Data</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: colors.whiteColor,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: Spacing.SM,
  },
  optionContainer: {
    flexDirection: "row",
    gap: Spacing.SM,
    alignItems: "center",
    paddingHorizontal: Spacing.SM,
    paddingVertical: Spacing.XS,
  },
  optionText: {
    fontSize: Typography.SM,
    color: colors.tertiaryColor,
  },
});
