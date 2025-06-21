import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddFoodScreen from "./AddFoodScreen";
import AddNutritionFoodScreen from "./AddNutritionFoodScreen";
import { FoodProvider } from "../../../../context/food";
import HeaderNavigation from "../../../../components/shared/HeaderNavigation";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import useAppContext from "../../../../hooks/useAppContext";
import { appActions } from "../../../../context/app";
import NutritionFoodImagePickerScreen from "./NutritionFoodImagePickerScreen";
import NutritionFoodCameraScreen from "./NutrtionFoodCameraScreen";

const Stack = createNativeStackNavigator();
export default function AddFoodScreenNavigator({ navigation }) {
  const [_, appDispatch] = useAppContext();
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      bottomTabNavigation.setOptions({
        tabBarStyle: { display: "none" },
      });
      appDispatch(appActions.setFalseShowFAB());
    }, [navigation])
  );
  return (
    <FoodProvider>
      <Stack.Navigator initialRouteName="AddFoodScreen">
        <Stack.Screen
          name="AddFoodScreen"
          component={AddFoodScreen}
          options={{ header: () => <HeaderNavigation title="Add New Food" /> }}
        />
        <Stack.Screen
          name="AddNutritionFoodScreen"
          component={AddNutritionFoodScreen}
        />
        <Stack.Screen
          name="NutritionFoodImagePickerScreen"
          component={NutritionFoodImagePickerScreen}
        />
        <Stack.Screen
          name="NutritionFoodCameraScreen"
          component={NutritionFoodCameraScreen}
        />
      </Stack.Navigator>
    </FoodProvider>
  );
}
