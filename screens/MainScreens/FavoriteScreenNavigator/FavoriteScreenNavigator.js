import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "./FavoriteScreen";
import AddDishScreenNavigator from "./AddDishScreenNavigator/AddDishScreenNavigator";
import AddFoodScreenNavigator from "./AddFoodScreenNavigator/AddFoodScreenNavigator";
import FoodScreenNavigator from "./FoodScreenNavigator/FoodScreenNavigator";

const Stack = createNativeStackNavigator();

export default function FavoriteScreenNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="FavoriteScreen"
      screenOptions={{ headerShown: false }}
      id="FavoriteScreenNavigator"
    >
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen
        name="AddDishScreenNavigator"
        component={AddDishScreenNavigator}
      />
      <Stack.Screen
        name="AddFoodScreenNavigator"
        component={AddFoodScreenNavigator}
      />
      <Stack.Screen
        name="FoodScreenNavigator"
        component={FoodScreenNavigator}
      />
    </Stack.Navigator>
  );
}
