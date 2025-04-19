import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "./DashboardScreen";
import DetailDishScreen from "../../../shared/DetailDishScreen";
import DetailFoodScreen from "../../../shared/DetailFoodScreen";
import WaterTrackerScreen from "./WaterTrackerScreen";
import DetailMealScreen from "./DetailMealScreen";
import WaterReminderSettingScreen from "../../../shared/WaterReminderSettingScreen";
const Stack = createNativeStackNavigator();
function DashboardScreenNavigator() {
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="WaterTrackerScreen" component={WaterTrackerScreen} />
      <Stack.Screen
        name="WaterReminderSettingScreen"
        component={WaterReminderSettingScreen}
      />
      <Stack.Screen name="DetailDishScreen" component={DetailDishScreen} />
      <Stack.Screen name="DetailFoodScreen" component={DetailFoodScreen} />
      <Stack.Screen name="DetailMealScreen" component={DetailMealScreen} />
    </Stack.Navigator>
  );
}

export default DashboardScreenNavigator;
