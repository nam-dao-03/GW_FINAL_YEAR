import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "./FavoriteScreen/FavoriteScreen";
import AddFoodScreen from "./AddFoodScreen";
import AddDishScreen from "./AddDishScreen";
import colors from "../../../utils/Colors";
const Stack = createNativeStackNavigator();
export default function ManageFavoritesScreen({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="FavoriteScreen"
    >
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primaryColor,
          },
          headerTintColor: colors.whiteColor,
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} />
      <Stack.Screen name="AddDishScreen" component={AddDishScreen} />
    </Stack.Navigator>
  );
}
