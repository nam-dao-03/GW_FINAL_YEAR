import { useCallback } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderNavigation from "../../../components/shared/HeaderNavigation";
import KeyboardAvoidingWrapper from "../../../components/shared/KeyboardAvoidingWrapper";
import { useFocusEffect } from "@react-navigation/native";
import useAppContext from "../../../hooks/useAppContext";
import { appActions } from "../../../context/app";
import Spacing from "../../../utils/Spacing";
import Typography from "../../../utils/Typography";
import colors from "../../../utils/Colors";
import { FontAwesome6 as FA6 } from "@expo/vector-icons";
import Sizes from "../../../utils/Size";
import AppIcon from "../../../utils/Common";
export default function SettingScreen({ navigation }) {
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      bottomTabNavigation.setOptions({
        tabBarStyle: { display: "none" },
      });
      navigation.setOptions({
        header: () => <HeaderNavigation title="Setting" />,
      });
      dispatch(appActions.setFalseShowFAB());
    }, [navigation])
  );
  const [_, dispatch] = useAppContext();
  const settingItemList = [
    {
      title: "Update Basal Metabolic Rate (BMR)",
      icon: { type: "Ionicons", name: "person-outline" },
      onPress: handleNavigateToUpdateBMRScreen,
    },
    {
      title: "Manage Water Notification",
      icon: { type: "Ionicons", name: "water-outline" },
      onPress: handleNavigateToWaterNotificationScreen,
    },
    {
      title: "Setting Account",
      icon: { type: "Ionicons", name: "settings-outline" },
      onPress: () => {},
    },
  ];

  function handleNavigateToWaterNotificationScreen() {
    navigation.navigate("WaterReminderSettingScreen");
  }

  function handleNavigateToUpdateBMRScreen() {
    navigation.navigate("UpdateBMRScreen");
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <ScrollView styles={styles.screen}>
          <Text style={styles.heading}>General</Text>
          {settingItemList.map((item, index) => (
            <SettingItem
              key={index}
              title={item.title}
              icon={item.icon}
              onPress={item.onPress}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  heading: {
    fontSize: Typography.LG,
    paddingHorizontal: Spacing.MD,
    marginTop: Spacing.SM,
  },
  settingItem: {
    paddingHorizontal: Spacing.MD,
    paddingVertical: Spacing.SM,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingItemText: {
    fontSize: Typography.SM,
    color: colors.textColor,
  },
});
function SettingItem({ title, icon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.settingItem, pressed && { opacity: 0.8 }]}
    >
      {({ pressed }) => (
        <>
          <Text
            style={[
              styles.settingItemText,
              pressed && { color: colors.primaryColor },
            ]}
          >
            {title}
          </Text>
          {icon && (
            <AppIcon
              type={icon.type}
              name={icon.name}
              size={Sizes.SM * 1.5}
              color={pressed ? colors.primaryColor : colors.textColor}
            />
          )}
        </>
      )}
    </Pressable>
  );
}
