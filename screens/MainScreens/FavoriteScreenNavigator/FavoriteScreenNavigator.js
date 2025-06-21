import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "./FavoriteScreen";
import AddDishScreenNavigator from "./AddDishScreenNavigator/AddDishScreenNavigator";
import AddFoodScreenNavigator from "./AddFoodScreenNavigator/AddFoodScreenNavigator";
import FoodScreenNavigator from "./FoodScreenNavigator/FoodScreenNavigator";
import { DishProvider } from "../../../context/dish";
import DishScreenNavigator from "./DishScreenNavigator/DishScreenNavigator";

const Stack = createNativeStackNavigator();

export default function FavoriteScreenNavigator() {
  return (
    <DishProvider>
      <Stack.Navigator
        initialRouteName="FavoriteScreen"
        id="FavoriteScreenNavigator"
      >
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
        <Stack.Screen
          name="AddDishScreenNavigator"
          component={AddDishScreenNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddFoodScreenNavigator"
          component={AddFoodScreenNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FoodScreenNavigator"
          component={FoodScreenNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DishScreenNavigator"
          component={DishScreenNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </DishProvider>
  );
}
