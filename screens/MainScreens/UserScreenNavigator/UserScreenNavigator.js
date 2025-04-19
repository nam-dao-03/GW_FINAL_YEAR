import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserScreen from "./UserScreen";
import SettingScreen from "./SettingScreen";
import WaterReminderSettingScreen from "../../../shared/WaterReminderSettingScreen";
import UpdateBMRScreen from "./UpdateBMRScreen";
const Stack = createNativeStackNavigator();
export default function UserScreenNavigator() {
  return (
    <Stack.Navigator initialRouteName="UserScreen">
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen
        name="WaterReminderSettingScreen"
        component={WaterReminderSettingScreen}
      />
      <Stack.Screen name="UpdateBMRScreen" component={UpdateBMRScreen} />
    </Stack.Navigator>
  );
}
