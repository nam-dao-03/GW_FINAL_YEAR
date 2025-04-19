import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../../utils/Colors";
import { FontAwesome6 as FA6 } from "@expo/vector-icons";
import ProgressBoard from "../../../components/WaterTrackerScreen/ProgressBoard";
import WaterLogItem from "../../../components/WaterTrackerScreen/WaterLogItem";
import useAppContext from "../../../hooks/useAppContext";
import {
  extractDate,
  formatDateToLocalVN,
  getLocalDate,
} from "../../../utils/Date";
import { useMemo, useCallback, useState } from "react";
import { showConfirmationDialog } from "../../../utils/Common";
import { appActions } from "../../../context/app";
import Sizes from "../../../utils/Size";
import Spacing from "../../../utils/Spacing";
import Typography from "../../../utils/Typography";
import { useFocusEffect } from "@react-navigation/native";
import HeaderNavigation from "../../../components/shared/HeaderNavigation";
import { useToast } from "react-native-toast-notifications";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
export default function WaterTrackerScreen({ navigation }) {
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      bottomTabNavigation.setOptions({
        tabBarStyle: { display: "none" },
      });
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title={""}
            iconRight={
              <FA6
                name="clock-rotate-left"
                size={Sizes.SM}
                color={colors.whiteColor}
              />
            }
            actionRight={handleNavigateWaterReminderSettingScreen}
          />
        ),
      });
      dispatch(appActions.setFalseShowFAB());
    }, [navigation])
  );
  const [isOpenModalUpdateCupDrunkTime, setIsOpenModalUpdateCupDrunkTime] =
    useState(false);
  const toast = useToast();
  const [cupDrunk, setCupDrunk] = useState({});
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

  function handleOpenModalUpdateCupDrunkTime(cupDrunk) {
    setCupDrunk(cupDrunk);
    setIsOpenModalUpdateCupDrunkTime(true);
  }

  function handleConfirmModalUpdateCupDrunkTime(event, date) {
    if (event.type === "dismissed") {
      setIsOpenModalUpdateCupDrunkTime(false);
      return;
    }
    const updatedCupDrunk = {
      ...cupDrunk,
      cupDrunkDate: formatDateToLocalVN(date),
    };
    dispatch(appActions.updateCupDrunk(updatedCupDrunk));
    toast.show(`Updated cup`, { type: "success" });
    setIsOpenModalUpdateCupDrunkTime(false);
  }

  function renderCupDrunkItemList({ item }) {
    return (
      <WaterLogItem
        cupDrunk={item}
        onDeleteCupDrunkItem={handledDeleteCupDrunkItem}
        onOpenModalUpdateCupDrunkTime={handleOpenModalUpdateCupDrunkTime}
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

  const sortedCupDrunkListToday = useMemo(
    () =>
      [...cupDrunkListToday].sort(
        (a, b) => new Date(b.cupDrunkDate) - new Date(a.cupDrunkDate)
      ),
    [cupDrunkListToday]
  );

  if (isOpenModalUpdateCupDrunkTime) {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "time",
      is24Hour: true,
      display: "clock",
      onChange: handleConfirmModalUpdateCupDrunkTime,
    });
  }

  const headerComponent = useMemo(
    () => (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.flatListContainer}>
          <ScrollView style={styles.screenContainer}>
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

  return (
    <FlatList
      data={sortedCupDrunkListToday}
      keyExtractor={(item) => item.getCupDrunkId()}
      renderItem={renderCupDrunkItemList}
      style={styles.flatList}
      initialScrollIndex={0}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: Spacing.BIG_70 * 3 }}
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
