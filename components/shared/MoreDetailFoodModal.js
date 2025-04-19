import { useToast } from "react-native-toast-notifications";
import useAppContext from "../../hooks/useAppContext";
import { StyleSheet, Text, View } from "react-native";
import PressableIcon from "./PressableIcon";
import { Ionicons, FontAwesome6 as FA6 } from "@expo/vector-icons/";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import colors from "../../utils/Colors";
import Sizes from "../../utils/Size";
import Modal from "react-native-modal";
import { appActions } from "../../context/app";
export default function MoreDetailFoodModal({
  isModalVisible,
  setModalVisible,
  onNavigateEditScreen,
  food,
  isDisableEdit = false,
}) {
  const toast = useToast();
  const [appState, appDispatch] = useAppContext();
  function setToggleFavoriteFood() {
    const isFavorite = food.isFavorite ? 0 : 1;
    const updatedFood = { ...food, isFavorite };
    appDispatch(appActions.updateFood(updatedFood));
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
          onPress={setToggleFavoriteFood}
        >
          <Ionicons
            name={food?.isFavorite ? "heart" : "heart-outline"}
            size={Sizes.MD}
            color={food?.isFavorite ? colors.tertiaryColor : colors.textColor}
          />
          <Text style={styles.modalText}>Favorite</Text>
        </PressableIcon>
        {!!food.isCreatedByUser && !isDisableEdit && (
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
