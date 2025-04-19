import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import NumberStepper from "./NumberStepper";
import ContinueButton from "./ContinueButton";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import { useEffect, useState } from "react";
import {
  FITNESS_PARAMETERS,
  GAIN_MORE_WEIGHT,
  GAIN_WEIGHT,
  LOSE_MORE_WEIGHT,
  LOSE_WEIGHT,
  MAINTAIN_WEIGHT,
} from "../../utils/constants";
import { Dropdown } from "react-native-element-dropdown";
import { useToast } from "react-native-toast-notifications";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import { calculationMeasure } from "../../utils/Indicators";
export default function ModalUpdateBMRMeasure({
  isVisible,
  onBackdropPress,
  defaultValue,
  fitnessParameter,
  defaultObj,
}) {
  const [measure, setMeasure] = useState(1);
  const [_, appDispatch] = useAppContext();
  const toast = useToast();
  const { user, dailyNutrition, waterIntake } = defaultObj;
  const [genderValue, setGenderValue] = useState();
  const [targetValue, setTargetValue] = useState();
  useEffect(() => {
    if (isVisible) {
      setMeasure(defaultValue);
    }
    if (fitnessParameter === FITNESS_PARAMETERS.GENDER) {
      setGenderValue(defaultValue);
    }
    if (fitnessParameter === FITNESS_PARAMETERS.TARGET) {
      setTargetValue(defaultValue);
    }
  }, [isVisible, defaultValue]);
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
    switch (fitnessParameter) {
      case FITNESS_PARAMETERS.TARGET_WEIGHT: {
        if (Number(dailyNutrition.weight) > measure) {
          toast.show("target weight can not be smaller than weight", {
            type: "danger",
          });
          onBackdropPress(false);
          return;
        } else {
          const updatedUser = {
            ...user,
            targetWeight: measure,
          };
          appDispatch(appActions.updateUser(updatedUser));
          toast.show("target Weight updated", { type: "success" });
          onBackdropPress(false);
          return;
        }
      }
      case FITNESS_PARAMETERS.HEIGHT: {
        if (measure < 100 || measure > 250) {
          toast.show("Try again with Height", {
            type: "danger",
          });
          onBackdropPress(false);
          return;
        } else {
          const newDailyNutrition = {
            ...dailyNutrition,
            height: measure,
          };
          const { updatedDailyNutrition, updatedWaterIntake } =
            calculationMeasure(user, newDailyNutrition, waterIntake);
          appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
          appDispatch(appActions.updateWaterIntake(updatedWaterIntake));
          toast.show("Height updated", { type: "success" });
          onBackdropPress(false);
          return;
        }
      }
      case FITNESS_PARAMETERS.WEIGHT: {
        if (measure < 30 || measure > 120) {
          toast.show("Try again with weight", {
            type: "danger",
          });
          onBackdropPress(false);
          return;
        } else {
          const newDailyNutrition = {
            ...dailyNutrition,
            weight: measure,
          };
          const { updatedDailyNutrition, updatedWaterIntake } =
            calculationMeasure(user, newDailyNutrition, waterIntake);
          appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
          appDispatch(appActions.updateWaterIntake(updatedWaterIntake));
          toast.show("Weight updated", { type: "success" });
          onBackdropPress(false);
          return;
        }
      }
      case FITNESS_PARAMETERS.AGE: {
        if (measure < 10 || measure > 80) {
          toast.show("Try again with age", {
            type: "danger",
          });
          onBackdropPress(false);
          return;
        } else {
          const updatedUser = {
            ...user,
            age: measure,
          };
          const { updatedDailyNutrition, updatedWaterIntake } =
            calculationMeasure(updatedUser, dailyNutrition, waterIntake);
          appDispatch(appActions.updateUser(updatedUser));
          appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
          appDispatch(appActions.updateWaterIntake(updatedWaterIntake));
          toast.show("Age updated", { type: "success" });
          onBackdropPress(false);
          return;
        }
      }
      case FITNESS_PARAMETERS.GENDER: {
        const updatedUser = {
          ...user,
          gender: genderValue,
        };
        const { updatedDailyNutrition, updatedWaterIntake } =
          calculationMeasure(updatedUser, dailyNutrition, waterIntake);

        appDispatch(appActions.updateUser(updatedUser));
        appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
        appDispatch(appActions.updateWaterIntake(updatedWaterIntake));

        toast.show("Gender updated", { type: "success" });
        onBackdropPress(false);
        return;
      }
      case FITNESS_PARAMETERS.MINS_EXER_PER_DAY: {
        if (measure < 0 || measure > 300) {
          toast.show("Try again with exercise minutes per day", {
            type: "danger",
          });
          onBackdropPress(false);
          return;
        } else {
          const updatedUser = {
            ...user,
            minExerPerDay: measure,
          };
          const { updatedDailyNutrition, updatedWaterIntake } =
            calculationMeasure(updatedUser, dailyNutrition, waterIntake);

          appDispatch(appActions.updateUser(updatedUser));
          appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
          appDispatch(appActions.updateWaterIntake(updatedWaterIntake));
          console.log("updatedWaterIntake", updatedWaterIntake);
          toast.show("Exercise minutes per day updated", { type: "success" });
          onBackdropPress(false);
          return;
        }
      }
      case FITNESS_PARAMETERS.DAY_EXER_PER_WEEK: {
        if (measure < 0 || measure > 7) {
          toast.show("Try again with exercise days per week", {
            type: "danger",
          });
          onBackdropPress(false);
          return;
        } else {
          const updatedUser = {
            ...user,
            dayExerPerWeek: measure,
          };
          const { updatedDailyNutrition, updatedWaterIntake } =
            calculationMeasure(updatedUser, dailyNutrition, waterIntake);
          console.log("updatedWaterIntake", updatedWaterIntake);
          appDispatch(appActions.updateUser(updatedUser));
          appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
          appDispatch(appActions.updateWaterIntake(updatedWaterIntake));

          toast.show("Exercise days per week updated", { type: "success" });
          onBackdropPress(false);
          return;
        }
      }
      case FITNESS_PARAMETERS.TARGET: {
        if (!targetValue) {
          toast.show("Please select a target", {
            type: "danger",
          });
          onBackdropPress(false);
          return;
        } else {
          const updatedUser = {
            ...user,
            target: targetValue,
            targetWeight: Number(dailyNutrition.weight) + 5,
          };
          const { updatedDailyNutrition, updatedWaterIntake } =
            calculationMeasure(updatedUser, dailyNutrition, waterIntake);

          appDispatch(appActions.updateUser(updatedUser));
          appDispatch(appActions.updateDailyNutrition(updatedDailyNutrition));
          appDispatch(appActions.updateWaterIntake(updatedWaterIntake));

          toast.show("Target updated", { type: "success" });
          onBackdropPress(false);
          return;
        }
      }
    }
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
        <Text style={styles.heading}>Update {fitnessParameter}</Text>
        {fitnessParameter === FITNESS_PARAMETERS.GENDER ? (
          <DropdownGender
            defaultValue={genderValue}
            onChange={(value) => setGenderValue(value)}
          />
        ) : fitnessParameter === FITNESS_PARAMETERS.TARGET ? (
          <DropdownTarget
            defaultValue={targetValue}
            onChange={(value) => setTargetValue(value)}
          />
        ) : (
          <NumberStepper
            style={styles.numberStepper}
            defaultNumber={measure}
            onChangeNumber={handleChangeMeasure}
            onReduceNumber={handleReduceMeasure}
            onIncreaseNumber={handleIncreaseMeasure}
          />
        )}
        {/* {fitnessParameter === FITNESS_PARAMETERS.TARGET && (
          <DropdownTarget
            defaultValue={targetValue}
            onChange={(value) => setTargetValue(value)}
          />
        )} */}
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
  //dropdown
  container: {
    backgroundColor: "white",
    paddingHorizontal: Spacing.MD,
    paddingVertical: Spacing.LG,
  },
  dropdown: {
    height: Sizes.XXL,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: Spacing.SM,
    paddingHorizontal: Spacing.SM,
  },
  placeholderStyle: {
    fontSize: Typography.MD,
  },
  selectedTextStyle: {
    fontSize: Typography.MD,
  },
});

const DropdownGender = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: colors.primaryColor },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={Sizes.MASSIVE * 2.5}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select gender" : "..."}
        value={value}
        dropdownPosition="top"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          if (onChange) onChange(item.value);
        }}
      />
    </View>
  );
};

const DropdownTarget = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState();
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: "Lose More Weight", value: LOSE_MORE_WEIGHT },
    { label: "Lose Weight", value: LOSE_WEIGHT },
    { label: "Maintain Weight", value: MAINTAIN_WEIGHT },
    { label: "Gain Weight", value: GAIN_WEIGHT },
    { label: "Gain More Weight", value: GAIN_MORE_WEIGHT },
  ];
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: colors.primaryColor },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={Sizes.MASSIVE * 2.5}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select Target" : "..."}
        value={value}
        dropdownPosition="top"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          if (onChange) onChange(item.value);
        }}
      />
    </View>
  );
};
