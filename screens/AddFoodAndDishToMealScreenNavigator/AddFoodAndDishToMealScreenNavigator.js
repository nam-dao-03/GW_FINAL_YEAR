import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import AddFoodAndDishToMealScreen from "./AddFoodAndDishToMealScreen";

import HeaderNavigation from "../../components/shared/HeaderNavigation";
import DetailDishScreen from "../../shared/DetailDishScreen";
import DetailFoodScreen from "../../shared/DetailFoodScreen";
export default function AddFoodAndDishToMealScreenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddFoodAndDishToMealScreen"
        component={AddFoodAndDishToMealScreen}
        options={{
          header: () => <HeaderNavigation title="Add food and dish to meal" />,
        }}
      />
      <Stack.Screen name="DetailFoodScreen" component={DetailFoodScreen} />
      <Stack.Screen name="DetailDishScreen" component={DetailDishScreen} />
    </Stack.Navigator>
  );
}
