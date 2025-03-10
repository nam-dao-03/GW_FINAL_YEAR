import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserScreen from "./UserScreen";
import colors from "../../utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import DashboardScreenNavigator from "./DashboardScreenNavigator/DashboardScreenNavigator";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
import FavoriteScreenNavigator from "./FavoriteScreenNavigator/FavoriteScreenNavigator";
const BottomTab = createBottomTabNavigator();

export default function MainScreens({ navigation }) {
  return (
    <BottomTab.Navigator
      initialRouteName="DashboardScreenNavigator"
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: { fontSize: Typography.XS },
        tabBarStyle: { height: Sizes.XXL }, // Tăng chiều cao thanh bottom tab
        tabBarIconStyle: { width: Sizes.MD, height: Sizes.MD }, // Tăng size icon
      }}
    >
      <BottomTab.Screen
        name="DashboardScreenNavigator"
        component={DashboardScreenNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "DashBoard",
          tabBarActiveTintColor: colors.primaryColor,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={Sizes.MD} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FavoriteScreenNavigator"
        component={FavoriteScreenNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Favorite",
          tabBarActiveTintColor: colors.primaryColor,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="heart" size={Sizes.MD} color={color} />
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
            <Ionicons name="person" size={Sizes.MD} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({});
