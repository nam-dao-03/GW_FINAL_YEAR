import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { lazy, useLayoutEffect } from "react";
import DashBoardScreen from "./DashBoardScreen";
import FavoriteScreen from "./FavoriteScreen";
import UserScreen from "./UserScreen";
import colors from "../../utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
const BottomTab = createBottomTabNavigator();

export default function MainScreens({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      gestureEnabled: false,
    });
  }, []);
  return (
    <BottomTab.Navigator initialRouteName="DashBoardScreen">
      <BottomTab.Screen
        name="DashBoardScreen"
        component={DashBoardScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Dash Board",
          tabBarActiveTintColor: colors.primaryColor,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Favorite",
          tabBarActiveTintColor: colors.primaryColor,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="UserScreen"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Me",
          tabBarActiveTintColor: colors.primaryColor,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
