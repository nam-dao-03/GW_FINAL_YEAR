import Modal from "react-native-modal";
import CustomButton from "../shared/CustomButton";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import { Ionicons } from "@expo/vector-icons";
import NumberStepper from "../shared/NumberStepper";
import { useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import { Workout } from "../../database/entities/Workout";
import { useToast } from "react-native-toast-notifications";
import { convertToNumber, generateRandomString } from "../../utils/Common";
import { getLocalDate } from "../../utils/Date";
export default function ModalAddWorkout({
  isVisible,
  onBackdropPress,
  workout,
  isEdit = false,
}) {
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(0);
  const [appState, appDispatch] = useAppContext();
  const toast = useToast();
  useEffect(() => {
    setDuration(workout?.duration || 0);
    setCalories(workout?.calories || 0);
  }, [workout]);

  function handleChangeDuration(value) {
    setDuration(value);
    setCalories(
      convertToNumber((value / workout?.duration) * workout?.calories)
    );
  }

  function handleAddItem() {
    if (duration <= 0) {
      toast.show("Please select duration", { type: "danger" });
      onBackdropPress(false);
      return;
    }
    if (isEdit) {
      const updatedWorkout = {
        ...workout,
        duration,
        calories,
      };
      appDispatch(appActions.updateWorkout(updatedWorkout));
      toast.show(`Updated ${workout?.exerciseName}`, {
        type: "success",
      });
      onBackdropPress(false);
      return;
    }
    const workoutId = generateRandomString();
    const workoutDate = appState.selectedDay;
    const newWorkout = new Workout(
      workoutId,
      workout.userId,
      workoutDate,
      workout.exerciseName,
      duration,
      calories,
      0
    );
    appDispatch(appActions.createWorkout(newWorkout));
    toast.show(`Added ${workout?.exerciseName} to Workout`, {
      type: "success",
    });
    onBackdropPress(false);
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
        <View style={styles.itemContainer}>
          <View style={styles.itemLeft}>
            <Text style={styles.favoriteHeading}>
              {workout?.exerciseName || "default name"}
            </Text>
            <Text style={styles.favoriteDescription}>
              {calories || ""} kcal - {duration} minutes
            </Text>
          </View>
          <View style={styles.itemRight}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [styles.pressableIcon, { opacity: 0.5 }]
                  : [styles.pressableIcon]
              }
              onPress={() => onBackdropPress(false)}
            >
              <Ionicons name="close-outline" size={Sizes.MD} color="black" />
            </Pressable>
          </View>
        </View>
        <NumberStepper
          defaultNumber={workout?.duration}
          onIncreaseNumber={handleChangeDuration}
          onReduceNumber={handleChangeDuration}
          onChangeNumber={handleChangeDuration}
        />
        <CustomButton style={{ marginTop: Spacing.MD }} onPress={handleAddItem}>
          {isEdit ? "Update Workout" : "Add to Workouts"}
        </CustomButton>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  //modal
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
    height: Sizes.MASSIVE * 2.8,
  },
  itemContainer: {
    marginVertical: Spacing.XS,
    paddingVertical: Spacing.MD,
    paddingHorizontal: Spacing.LG,
    borderRadius: Spacing.SM,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  itemLeft: {
    width: "60%",
    gap: 5,
  },
  favoriteHeading: {
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
  },
  favoriteDescription: {
    fontSize: Typography.SM,
    color: colors.descriptionTextColor,
  },
  pressableIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.XXS * 2,
    borderRadius: "50%",
  },
});
