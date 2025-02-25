import { StyleSheet, Text, View } from "react-native";
import colors from "../../utils/Colors";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import PressableIcon from "../PressableIcon";

export default function StatusWaterContainer({
  waterPerCup,
  cupDrunk,
  waterIntakeVolume,
  onCupClick,
}) {
  console.log("cupDrunk", cupDrunk);
  const totalCups = Math.ceil(waterIntakeVolume / waterPerCup);
  const cupArray = Array.from({ length: totalCups }, (_, i) => i + 1);

  return (
    <View style={styles.statusWaterContainer}>
      {cupArray.map((index) => (
        <PressableIcon key={index} onPress={() => onCupClick(index)}>
          <MCIcons
            name={index <= cupDrunk ? "cup" : "cup-outline"}
            size={40}
            color={index <= cupDrunk ? colors.waterColor : "#A9A9A9"}
          />
        </PressableIcon>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statusWaterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});
