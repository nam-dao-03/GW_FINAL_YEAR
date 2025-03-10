import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../../utils/Colors";
import PressableIcon from "../../../components/PressableIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome6 as FA6 } from "@expo/vector-icons";
import ProgressBoard from "../../../components/WaterTrackerScreen/ProgressBoard";
import WaterLogItem from "../../../components/WaterTrackerScreen/WaterLogItem";
import useAppContext from "../../../hooks/useAppContext";
import { extractDate, getLocalDate } from "../../../utils/Date";
import { useMemo } from "react";
import { showConfirmationDialog } from "../../../utils/Common";
import { appActions } from "../../../context/app";
import Sizes from "../../../utils/Size";
import Spacing from "../../../utils/Spacing";
import Typography from "../../../utils/Typography";
export default function WaterIntakeScreen({ navigation }) {
  const [state, dispatch] = useAppContext();
  const { waterIntakeList, cupDrunkList } = state;
  const today = getLocalDate();
  const waterIntake = waterIntakeList.find((item) => item.getDate() === today);
  const cupDrunkListToday = cupDrunkList.filter(
    (item) => extractDate(item.getDate()) === today
  );

  const consumedWater = cupDrunkListToday.reduce(
    (consumed, cupDrunk) => consumed + cupDrunk.getWaterPerCup(),
    0
  );

  function handleGoBackNavigation() {
    navigation.goBack();
  }

  function handleNavigateWaterReminderSettingScreen() {
    navigation.navigate("WaterReminderSettingScreen");
  }

  function renderCupDrunkItemList({ item }) {
    return (
      <WaterLogItem
        cupDrunk={item}
        onDeleteCupDrunkItem={handledDeleteCupDrunkItem}
      />
    );
  }

  function handledDeleteCupDrunkItem(cupDrunkId) {
    function onConfirm() {
      dispatch(appActions.deleteCupDrunkById(cupDrunkId));
    }
    showConfirmationDialog(
      "Delete Item?",
      "Do you want to continue?",
      onConfirm
    );
  }

  const cupDrunkListTodayReverse = useMemo(
    () => [...cupDrunkListToday].reverse(),
    [cupDrunkListToday]
  );
  const headerComponent = useMemo(
    () => (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.flatListContainer}>
          <ScrollView style={styles.screenContainer}>
            <View style={styles.header}>
              <PressableIcon onPress={handleGoBackNavigation}>
                <Ionicons
                  name="arrow-back"
                  size={Sizes.LG}
                  color={colors.whiteColor}
                />
              </PressableIcon>
              <PressableIcon onPress={handleNavigateWaterReminderSettingScreen}>
                <FA6
                  name="clock-rotate-left"
                  size={Sizes.MD}
                  color={colors.whiteColor}
                />
              </PressableIcon>
            </View>
            <ProgressBoard
              consumedWater={consumedWater}
              waterIntake={waterIntake}
            />
            <Text style={styles.title}>History</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    ),
    [
      consumedWater,
      waterIntake,
      handleGoBackNavigation,
      handleNavigateWaterReminderSettingScreen,
    ]
  );

  console.log("cupDrunkListToday.length", cupDrunkListToday.length);
  return (
    <FlatList
      data={cupDrunkListTodayReverse}
      keyExtractor={(item) => item.getCupDrunkId()}
      renderItem={renderCupDrunkItemList}
      style={styles.flatList}
      initialScrollIndex={0}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: Spacing.XL }}
      ListHeaderComponentStyle={{ zIndex: 10 }}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={headerComponent}
      // headerComponent()
    />
  );
}

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  header: {
    backgroundColor: colors.primaryColor,
    paddingVertical: Spacing.XL,
    paddingHorizontal: Spacing.SM,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: Typography.LG,
    color: colors.textColor,
    paddingHorizontal: Spacing.LG,
    marginTop: Spacing.XL,
  },
  flatListContainer: {
    flex: 1,
  },
  flatList: {
    backgroundColor: colors.backgroundColorScreen,
  },
});
