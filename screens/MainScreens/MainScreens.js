import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "./UserScreen";
import colors from "../../utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import ManageFavoritesScreen from "./ManageFavoritesScreen/ManageFavoritesScree";
import DashboardScreenNavigator from "./DashboardScreenNavigator/DashboardScreenNavigator";
const BottomTab = createBottomTabNavigator();

export default function MainScreens({ navigation }) {
  return (
    <BottomTab.Navigator initialRouteName="DashboardScreenNavigator">
      <BottomTab.Screen
        name="DashboardScreenNavigator"
        component={DashboardScreenNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "DashBoard",
          tabBarActiveTintColor: colors.primaryColor,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ManageFavoritesScreen"
        component={ManageFavoritesScreen}
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

const styles = StyleSheet.create({});
