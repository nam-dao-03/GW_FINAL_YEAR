import { StyleSheet, Text, View } from "react-native";
import colors from "../../utils/Colors";
import { MaterialCommunityIcons as MCIcons } from "@expo/vector-icons";

export default function StatusWaterContainer() {
  return (
    <View style={styles.statusWaterContainer}>
      <MCIcons name="cup-outline" size={40} color="	#A9A9A9" />
      <MCIcons name="cup" size={40} color={colors.waterColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  statusWaterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
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
