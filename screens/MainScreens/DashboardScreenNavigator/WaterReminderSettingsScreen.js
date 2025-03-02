import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../utils/Colors";
import PressableIcon from "../../../components/PressableIcon";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function WaterReminderSettingScreen({ navigation }) {
  function handleGoBackNavigation() {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.header}>
          <PressableIcon onPress={handleGoBackNavigation}>
            <Ionicons name="arrow-back" size={30} color={colors.whiteColor} />
          </PressableIcon>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  header: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
