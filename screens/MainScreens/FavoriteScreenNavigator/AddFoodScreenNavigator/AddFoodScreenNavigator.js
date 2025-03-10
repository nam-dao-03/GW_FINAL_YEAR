import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddFoodScreen from "./AddFoodScreen";
import colors from "../../../../utils/Colors";
import AddNutritionFoodScreen from "./AddNutritionFoodScreen";
import { FoodProvider } from "../../../../context/food";
const Stack = createNativeStackNavigator();
export default function AddFoodScreenNavigator() {
  return (
    <FoodProvider>
      <Stack.Navigator
        initialRouteName="AddFoodScreen"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primaryColor },
          headerTintColor: colors.whiteColor,
        }}
      >
        <Stack.Screen
          name="AddFoodScreen"
          component={AddFoodScreen}
          options={{
            title: "Add New Food",
          }}
        />
        <Stack.Screen
          name="AddNutritionFoodScreen"
          component={AddNutritionFoodScreen}
          options={{
            title: "Add New Food",
          }}
        />
      </Stack.Navigator>
    </FoodProvider>
  );
}
