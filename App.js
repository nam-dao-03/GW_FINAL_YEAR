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
import { ToastProvider } from "react-native-toast-notifications";
import { registerBackgroundFetchAsync } from "./utils/BackgroundFetch";
import Spacing from "./utils/Spacing";
import Typography from "./utils/Typography";
import Ionicons from "@expo/vector-icons/Ionicons";
import Sizes from "./utils/Size";
import AddFoodAndDishToMealScreenNavigator from "./screens/AddFoodAndDishToMealScreenNavigator/AddFoodAndDishToMealScreenNavigator";
import HeaderNavigation from "./components/shared/HeaderNavigation";
import AddWorkoutNavigator from "./screens/AddWorkoutNavigator/AddWorkoutNavigator";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
// Cấu hình thông báo
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
(async () => {
  await registerBackgroundFetchAsync();
})();
const Stack = createNativeStackNavigator();
const db = openDatabase();

const userList = getAllDataFormTable(db, User.TABLE_NAME);
const initialRouteName = userList.length ? "MainScreens" : "BMRInfoScreen";

const successIcon = (
  <Ionicons
    name="checkmark-circle"
    size={Sizes.LG}
    color={colors.primaryColor}
  />
);
const dangerIcon = (
  <Ionicons name="warning" size={Sizes.LG} color={colors.danger} />
);
function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      // Yêu cầu quyền
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
        },
      });
      if (status !== "granted") {
        alert("Cần cấp quyền thông báo!");
        return;
      }

      // Cấu hình channel cho Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          sound: "happy_bells_notification.wav",
        });
      }
      console.log("Đã cấp quyền thông báo!");
    };

    setupNotifications();
  }, []);
  return (
    <ToastProvider
      offsetBottom={Spacing.XXXXL}
      duration={2000}
      successColor={colors.whiteColor}
      dangerColor={colors.whiteColor}
      textStyle={{ fontSize: Typography.SM, color: colors.textColor }}
      successIcon={successIcon}
      dangerIcon={dangerIcon}
    >
      <StatusBar style="auto" />
      <AppProvider>
        <PersonProvider>
          <NavigationContainer>
            {/* chú ý initialRouteName */}
            <Stack.Navigator
              initialRouteName={initialRouteName}
              id="AppNavigator"
            >
              <Stack.Screen name="BMRInfoScreen" component={BMRInfoScreen} />
              <Stack.Screen
                name="SetTargetScreen"
                component={SetTargetScreen}
                options={{
                  header: () => <HeaderNavigation title="Target" />,
                }}
              />
              <Stack.Screen
                name="IndicatorsOverviewScreen"
                component={IndicatorsOverviewScreen}
                options={{
                  header: () => <HeaderNavigation title="Indicator Overview" />,
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
              <Stack.Screen
                name="AddFoodAndDishToMealScreenNavigator"
                component={AddFoodAndDishToMealScreenNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="AddWorkoutNavigator"
                component={AddWorkoutNavigator}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersonProvider>
      </AppProvider>
    </ToastProvider>
  );
}

export default App;
