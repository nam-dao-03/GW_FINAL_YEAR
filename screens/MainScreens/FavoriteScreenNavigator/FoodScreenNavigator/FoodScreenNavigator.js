import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailFoodScreen from "../../../../shared/DetailFoodScreen";
import UpdateFoodScreen from "./UpdateFoodScreen";
import { FoodProvider } from "../../../../context/food";
import UpdateNutritionFoodScreen from "./UpdateNutritionFoodScreen";
import HeaderNavigation from "../../../../components/shared/HeaderNavigation";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import useAppContext from "../../../../hooks/useAppContext";
import { appActions } from "../../../../context/app";
const Stack = createNativeStackNavigator();
export default function FoodScreenNavigator({ navigation }) {
  const [_, appDispatch] = useAppContext();
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      bottomTabNavigation.setOptions({
        tabBarStyle: { display: "none" },
      });
      appDispatch(appActions.setFalseShowFAB());
    }, [bottomTabNavigation])
  );
  return (
    <FoodProvider>
      <Stack.Navigator initialRouteName="DetailFoodScreen">
        <Stack.Screen name="DetailFoodScreen" component={DetailFoodScreen} />
        <Stack.Screen
          name="UpdateFoodScreen"
          component={UpdateFoodScreen}
          options={{
            header: () => <HeaderNavigation title="Detail Food" />,
          }}
        />
        <Stack.Screen
          name="UpdateNutritionFoodScreen"
          component={UpdateNutritionFoodScreen}
          options={{
            header: () => <HeaderNavigation title="Update Nutrition Food" />,
          }}
        />
      </Stack.Navigator>
    </FoodProvider>
  );
}
