import { StatusBar } from "expo-status-bar";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetTargetScreen from "./screens/SetTargetScreen";
import IndicatorsOverviewScreen from "./screens/IndicatorsOverviewScreen";
import BMRInfoScreen from "./screens/BMRInfoScreen";
import MainScreens from "./screens/MainScreens/MainScreens";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        {/* chú ý initialRouteName */}
        <Stack.Navigator initialRouteName="MainScreens">
          <Stack.Screen name="BMRInfoScreen" component={BMRInfoScreen} />
          <Stack.Screen name="SetTargetScreen" component={SetTargetScreen} />
          <Stack.Screen
            name="IndicatorsOverviewScreen"
            component={IndicatorsOverviewScreen}
          />
          {/* Main Screens */}
          <Stack.Screen name="MainScreens" component={MainScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
