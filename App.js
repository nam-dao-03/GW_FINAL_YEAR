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
import { getAllDataFormTable, openDatabase } from "./database/databaseHelper";
import { User } from "./database/entities/User";
const Stack = createNativeStackNavigator();
const db = openDatabase();
const userList = getAllDataFormTable(db, User.TABLE_NAME);
const initialRouteName = userList.length ? "MainScreens" : "BMRInfoScreen";
export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppProvider>
        <PersonProvider>
          <NavigationContainer>
            {/* chú ý initialRouteName */}
            <Stack.Navigator initialRouteName={initialRouteName}>
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
                options={{
                  title: "Indicators Overview",
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
              <Stack.Screen
                name="MainScreens"
                component={MainScreens}
                options={{
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersonProvider>
      </AppProvider>
    </>
  );
}
