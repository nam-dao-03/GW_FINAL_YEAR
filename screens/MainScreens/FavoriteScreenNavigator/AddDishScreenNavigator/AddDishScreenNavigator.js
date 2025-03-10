import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDishScreen from "./AddDishScreen";
import colors from "../../../../utils/Colors";

const Stack = createNativeStackNavigator();

export default function AddDishScreenNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="AddDishScreen"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primaryColor },
        headerTintColor: colors.whiteColor,
      }}
    >
      <Stack.Screen name="AddDishScreen" component={AddDishScreen} />
    </Stack.Navigator>
  );
}
