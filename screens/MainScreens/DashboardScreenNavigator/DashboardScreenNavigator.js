import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WaterIntakeScreen from "./WaterTrackerScreen";
import DashboardScreen from "./DashboardScreen";
import { memo } from "react";
import WaterReminderSettingScreen from "./WaterReminderSettingsScreen";
const Stack = createNativeStackNavigator();
function DashboardScreenNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
      <Stack.Screen name="WaterTrackerScreen" component={WaterIntakeScreen} />
      <Stack.Screen
        name="WaterReminderSettingScreen"
        component={WaterReminderSettingScreen}
      />
    </Stack.Navigator>
  );
}

export default memo(DashboardScreenNavigator);
