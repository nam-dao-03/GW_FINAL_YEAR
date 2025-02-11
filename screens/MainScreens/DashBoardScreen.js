import { useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import colors from "../../utils/Colors";
import Calendar from "../../components/DashBoardScreen/Calendar";
import ProgressBoard from "../../components/DashBoardScreen/ProgressBoard";
import StatusWaterContainer from "../../components/DashBoardScreen/StatusWaterContainer";
export default function DashBoardScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, []);
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.day}>Yesterday</Text>
            <Calendar />
          </View>
          <ProgressBoard />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Ban da uong bao nhieu nuoc</Text>
            <Pressable
              style={({ pressed }) => (pressed ? [{ opacity: 0.5 }] : [])}
            >
              <Text style={styles.waterLabel}>
                <Text>0</Text> / <Text>2157 ml</Text>
              </Text>
            </Pressable>
          </View>
          <StatusWaterContainer />
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
  headerContainer: {
    backgroundColor: colors.primaryColor,
    padding: 16,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  day: {
    fontSize: 24,
    color: colors.whiteColor,
    fontWeight: "bold",
  },
  bodyContainer: {
    backgroundColor: colors.backgroundColorScreen,
    padding: 16,
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    color: colors.textColor,
  },
  waterLabel: {
    fontSize: 16,
    color: colors.waterColor,
    borderBottomColor: colors.waterColor,
    borderBottomWidth: 1,
  },
});
