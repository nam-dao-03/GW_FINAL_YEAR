import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import {
  MaterialCommunityIcons as MCIIcon,
  AntDesign,
} from "@expo/vector-icons";
import colors from "../../utils/Colors";
import PressableIcon from "../shared/PressableIcon";
import { extractDate, extractTime, getRelativeDate } from "../../utils/Date";
import Typography from "../../utils/Typography";
import Spacing from "../../utils/Spacing";
import Sizes from "../../utils/Size";
import { useRef, useState } from "react";
import {
  alertNotification,
  convertToNumber,
  isValidNumber,
} from "../../utils/Common";
import useAppContext from "../../hooks/useAppContext";
import { appActions } from "../../context/app";
import { useToast } from "react-native-toast-notifications";
export default function WaterLogItem({
  cupDrunk,
  onDeleteCupDrunkItem,
  onOpenModalUpdateCupDrunkTime,
}) {
  const [_, dispatch] = useAppContext();
  const toast = useToast();
  const cupDrunkDate = extractDate(cupDrunk.getDate() || "2025-01-01 00:00:00");
  const cupDrunkTime = extractTime(cupDrunk.getDate() || "2025-01-01 00:00:00");
  const relativeDate = getRelativeDate(cupDrunkDate);
  const [waterPerCup, setWaterPerCup] = useState("");
  const inputUpdateWaterPerCupRef = useRef(null);
  const [isActiveUpdateWaterPerCup, setIsActiveUpdateWaterPerCup] =
    useState(false);

  function handleActiveUpdateWaterPerCup() {
    setIsActiveUpdateWaterPerCup(!isActiveUpdateWaterPerCup);
    setWaterPerCup("");
  }

  function handleChangeTextUpdateWaterPerCup(text) {
    setWaterPerCup(text);
  }

  function handleSubmitEditingUpdateWaterPerCup() {
    if (!waterPerCup.trim() || !isValidNumber(waterPerCup)) {
      alertNotification(
        "Invalid Input",
        "Please enter a valid number for water per cup."
      );
      return;
    }
    const updatedCupDrunk = {
      ...cupDrunk,
      waterPerCup: convertToNumber(waterPerCup),
    };
    dispatch(appActions.updateCupDrunk(updatedCupDrunk));
    toast.show(`Updated water per cup!`, { type: "success" });
  }

  return (
    <View style={styles.container}>
      <MCIIcon name="cup" size={Sizes.LG} color={colors.waterColor} />
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [{ opacity: 0.5 }, styles.textWaterPerCupContainer]
            : [styles.textWaterPerCupContainer]
        }
        onPress={handleActiveUpdateWaterPerCup}
      >
        {!isActiveUpdateWaterPerCup && (
          <Text style={[styles.waterVolumeText, { marginLeft: Spacing.SM }]}>
            {cupDrunk.getWaterPerCup() || 0}
          </Text>
        )}
        {isActiveUpdateWaterPerCup && (
          <TextInput
            style={styles.textInputWaterPerCup}
            ref={inputUpdateWaterPerCupRef}
            maxLength={4}
            keyboardType="number-pad"
            value={waterPerCup}
            onChangeText={handleChangeTextUpdateWaterPerCup}
            onBlur={handleActiveUpdateWaterPerCup}
            onLayout={() => {
              inputUpdateWaterPerCupRef.current?.focus();
            }}
            onSubmitEditing={handleSubmitEditingUpdateWaterPerCup}
          />
        )}
        <Text style={styles.waterVolumeText}>ml</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? { opacity: 0.5, marginLeft: "auto" }
            : { marginLeft: "auto" }
        }
        onPress={() => onOpenModalUpdateCupDrunkTime(cupDrunk)}
      >
        <Text style={styles.timeText}>
          {relativeDate} {cupDrunkTime}
        </Text>
      </Pressable>
      <PressableIcon
        style={styles.closeBtn}
        onPress={() =>
          onDeleteCupDrunkItem(cupDrunk.getCupDrunkId() || "12345678")
        }
      >
        <>
          <AntDesign
            name="close"
            size={Typography.MD}
            color={colors.secondaryTextColor}
          />
        </>
      </PressableIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.SM,
    flexDirection: "row",
    paddingHorizontal: Spacing.LG,
    paddingVertical: Spacing.SM,
    borderRadius: Spacing.XL,
    alignItems: "center",
    marginHorizontal: Spacing.LG,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Sizes.TINY * 4 },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
  },
  waterVolumeText: {
    fontSize: Typography.SM,
    color: colors.textColor,
  },
  timeText: {
    fontSize: Typography.SM,
    color: colors.textColor,
  },
  closeBtn: {
    borderRadius: "50%",
    backgroundColor: colors.shadowColor,
    marginLeft: Spacing.SM,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Sizes.TINY * 4 },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
  },
  textWaterPerCupContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.XXS,
  },
  textInputWaterPerCup: {
    fontSize: Typography.SM,
    color: colors.textColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.textColor,
    width: Sizes.XXL,
    paddingHorizontal: Spacing.XXS,
    marginLeft: Spacing.XS,
  },
});
