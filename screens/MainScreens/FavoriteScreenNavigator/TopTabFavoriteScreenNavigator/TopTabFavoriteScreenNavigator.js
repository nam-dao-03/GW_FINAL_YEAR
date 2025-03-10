import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Typography from "../../../../utils/Typography";
import colors from "../../../../utils/Colors";
import FoodScreen from "./FoodScreen";
import DishScreen from "./DishScreen";

const TopTab = createMaterialTopTabNavigator();

export default function TopTabFavoriteScreenNavigator() {
  return (
    <TopTab.Navigator
      initialRouteName="FoodScreen"
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: Typography.MD,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primaryColor, // Màu gạch chân tab được chọn
        },
      }}
    >
      <TopTab.Screen
        name="FoodScreen"
        component={FoodScreen}
        options={{
          title: "My Food",
        }}
      />
      <TopTab.Screen
        name="DishScreen"
        component={DishScreen}
        options={{
          title: "My Dish",
        }}
      />
    </TopTab.Navigator>
  );
}
