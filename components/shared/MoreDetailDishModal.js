import { useToast } from "react-native-toast-notifications";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import Modal from "react-native-modal";
import { StyleSheet, Text, View } from "react-native";
import PressableIcon from "./PressableIcon";
import { Ionicons, FontAwesome6 as FA6 } from "@expo/vector-icons/";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
export default function MoreDetailDishModal({
  isModalVisible,
  setModalVisible,
  onNavigateEditScreen,
  dish,
  isDisableEdit = false,
}) {
  const [appState, appDispatch] = useAppContext();
  const toast = useToast();
  function setToggleFavoriteDish() {
    const isFavorite = dish.isFavorite ? 0 : 1;
    const updatedDish = { ...dish, isFavorite };
    appDispatch(appActions.updateDish(updatedDish));
    toast.show(isFavorite ? "Added to favorite" : "Removed from favorite", {
      type: "success",
    });
  }
  return (
    <Modal
      isVisible={isModalVisible} //isModalVisible
      backdropOpacity={0}
      style={styles.modalPosition}
      animationIn="zoomInRight" // Hiệu ứng mở
      animationOut="zoomOutRight" // Hiệu ứng đóng
      avoidKeyboard={true}
      onBackdropPress={() => setModalVisible(false)}
    >
      <View style={styles.modalContent}>
        <PressableIcon
          style={styles.pressableModal}
          onPress={setToggleFavoriteDish}
        >
          <Ionicons
            name={dish?.isFavorite ? "heart" : "heart-outline"}
            size={Sizes.MD}
            color={dish?.isFavorite ? colors.tertiaryColor : colors.textColor}
          />
          <Text style={styles.modalText}>Favorite</Text>
        </PressableIcon>
        {!!dish?.isCreatedByUser && !isDisableEdit && (
          <PressableIcon
            style={styles.pressableModal}
            onPress={onNavigateEditScreen}
          >
            <FA6 name="pencil" size={Sizes.SM} color={colors.textColor} />
            <Text style={styles.modalText}>Edit</Text>
          </PressableIcon>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalPosition: {
    position: "absolute",
    top: Spacing.SM, // Cách trên 10px
    right: Spacing.SM, // Cách phải 10px
    margin: 0, // Loại bỏ margin mặc định
  },
  modalContent: {
    width: Sizes.MASSIVE * 1.5,
    backgroundColor: "white",
    borderRadius: Spacing.XS,
    gap: Spacing.XXS,
    elevation: 5,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
  },

  pressableModal: {
    flexDirection: "row",
    gap: Spacing.XS,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.SM,
  },

  modalText: {
    fontSize: Typography.SM,
    color: colors.textColor,
  },
});
