import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import ContinueButton from "./ContinueButton";
import NumberStepper from "./NumberStepper";
import { useEffect, useState } from "react";
import { MEASURE_TYPE } from "../../utils/constants";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import { useToast } from "react-native-toast-notifications";
import { getLocalDate } from "../../utils/Date";
import { calculationMeasure } from "../../utils/Indicators";
export default function ModalUpdateMeasure({
  isVisible,
  onBackdropPress,
  dailyNutrition,
  measureType,
}) {
  const [measure, setMeasure] = useState(1);
  const [appState, appDispatch] = useAppContext();
  const { userList, waterIntakeList } = appState;
  const user = userList[0];
  const waterIntake = waterIntakeList.find(
    (item) => item.getDate() === getLocalDate()
  );
  const toast = useToast();
  console.log(dailyNutrition);
  useEffect(() => {
    if (!dailyNutrition) return;
    if (measureType === MEASURE_TYPE.HEIGHT) {
      setMeasure(Number(dailyNutrition.height));
    } else if (measureType === MEASURE_TYPE.WEIGHT) {
      setMeasure(Number(dailyNutrition.weight));
    }
  }, [measureType, dailyNutrition]);
  function handleReduceMeasure(value) {
    setMeasure(value);
  }
  function handleIncreaseMeasure(value) {
    setMeasure(value);
  }
  function handleChangeMeasure(value) {
    setMeasure(value);
  }
  function handleSubmit() {
    if (measureType === MEASURE_TYPE.HEIGHT) {
      const newDailyNutrition = {
        ...dailyNutrition,
        height: String(measure),
      };
      const { updatedDailyNutrition, updatedWaterIntake } = calculationMeasure(
        user,
        newDailyNutrition,
        waterIntake
      );
      appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
      appDispatch(appActions.updateWaterIntake(updatedWaterIntake));
    } else if (measureType === MEASURE_TYPE.WEIGHT) {
      const newDailyNutrition = {
        ...dailyNutrition,
        weight: String(measure),
      };
      const { updatedDailyNutrition, updatedWaterIntake } = calculationMeasure(
        user,
        newDailyNutrition,
        waterIntake
      );
      appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
      appDispatch(appActions.updateWaterIntake(updatedWaterIntake));
    }
    onBackdropPress(false);
    toast.show("Updated ", {
      type: "success",
    });
  }

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={true} // Tăng hiệu suất animation
      hideModalContentWhileAnimating={true} // Ẩn nội dung khi animation
      backdropTransitionOutTiming={0}
      avoidKeyboard={true}
      onBackdropPress={() => onBackdropPress(false)}
      style={styles.modalStyle}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.heading}>
          Update {measureType === MEASURE_TYPE.WEIGHT ? "Weight" : "Height"}
        </Text>
        <NumberStepper
          style={styles.numberStepper}
          defaultNumber={measure}
          onChangeNumber={handleChangeMeasure}
          onReduceNumber={handleReduceMeasure}
          onIncreaseNumber={handleIncreaseMeasure}
        />
        <ContinueButton onPress={handleSubmit} />
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
    borderTopLeftRadius: Spacing.XL,
    borderTopRightRadius: Spacing.XL,
    padding: Spacing.SM,
    height: Sizes.MASSIVE * 2.3,
  },
  heading: {
    fontSize: Typography.LG,
    fontWeight: "bold",
    color: colors.textColor,
    textAlign: "center",
    marginTop: Spacing.SM,
  },
  numberStepper: {
    marginTop: Spacing.MD,
    marginBottom: Spacing.LG,
  },
});
