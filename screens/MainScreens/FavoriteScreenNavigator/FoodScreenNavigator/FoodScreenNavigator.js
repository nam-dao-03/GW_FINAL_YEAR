import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailFoodScreen from "./DetailFoodScreen";
import colors from "../../../../utils/Colors";
import UpdateFoodScreen from "./UpdateFoodScreen";
import { FoodProvider } from "../../../../context/food";
import UpdateNutritionFoodScreen from "./UpdateNutritionFoodScreen";
const Stack = createNativeStackNavigator();
export default function FoodScreenNavigator({ route }) {
  return (
    <FoodProvider>
      <Stack.Navigator
        initialRouteName="DetailFoodScreen"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primaryColor },
          headerTintColor: colors.whiteColor,
        }}
      >
        <Stack.Screen
          name="DetailFoodScreen"
          component={DetailFoodScreen}
          options={{ title: "Detail Food" }}
        />
        <Stack.Screen
          name="UpdateFoodScreen"
          component={UpdateFoodScreen}
          options={{ title: "Update Food" }}
        />
        <Stack.Screen
          name="UpdateNutritionFoodScreen"
          component={UpdateNutritionFoodScreen}
          options={{ title: "Update Nutrition Food" }}
        />
      </Stack.Navigator>
    </FoodProvider>
  );
}
