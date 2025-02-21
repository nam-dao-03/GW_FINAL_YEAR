import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetTargetScreen from "./screens/SetTargetScreen";
import IndicatorsOverviewScreen from "./screens/IndicatorsOverviewScreen";
import BMRInfoScreen from "./screens/BMRInfoScreen";
import MainScreens from "./screens/MainScreens/MainScreens";
import { AppProvider } from "./context/app";
import { PersonProvider } from "./context/person";
import colors from "./utils/Colors";
import TrainingIntensityScreen from "./screens/TrainingIntensityScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppProvider>
        <PersonProvider>
          <NavigationContainer>
            {/* chú ý initialRouteName */}
            <Stack.Navigator initialRouteName="BMRInfoScreen">
              <Stack.Screen name="BMRInfoScreen" component={BMRInfoScreen} />
              <Stack.Screen
                name="SetTargetScreen"
                component={SetTargetScreen}
                options={{
                  title: "Target",
                  headerStyle: {
                    backgroundColor: colors.primaryColor,
                  },
                  headerBackTitle: "Back",
                  headerTintColor: colors.whiteColor,
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                }}
              />
              <Stack.Screen
                name="IndicatorsOverviewScreen"
                component={IndicatorsOverviewScreen}
              />
              <Stack.Screen
                name="TrainingIntensityScreen"
                component={TrainingIntensityScreen}
                options={{
                  title: "Target",
                  headerStyle: {
                    backgroundColor: colors.primaryColor,
                  },
                  headerBackTitle: "Back",
                  headerTintColor: colors.whiteColor,
                  headerTitleStyle: {
                    fontSize: 20,
                    fontWeight: "bold",
                  },
                }}
              />
              {/* Main Screens */}
              <Stack.Screen name="MainScreens" component={MainScreens} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersonProvider>
      </AppProvider>
    </>
  );
}
