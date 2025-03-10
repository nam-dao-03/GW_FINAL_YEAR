import { StyleSheet, View, Text } from "react-native";
import Modal from "react-native-modal";
import colors from "../../utils/Colors";
import AddTitle from "./AddTitle";
import { useNavigation } from "@react-navigation/native";
import Spacing from "../../utils/Spacing";
export default function ModalAdd({ isVisible, onBackdropPress }) {
  const navigation = useNavigation();
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
        <AddTitle
          onPress={() => {
            onBackdropPress();
            navigation.navigate("AddDishScreenNavigator");
          }}
        >
          Add Dish
        </AddTitle>
        <AddTitle
          onPress={() => {
            onBackdropPress();
            navigation.navigate("AddFoodScreenNavigator");
          }}
        >
          Add Food
        </AddTitle>
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
});
