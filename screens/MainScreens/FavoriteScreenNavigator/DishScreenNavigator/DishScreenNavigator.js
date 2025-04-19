import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import DetailDishScreen from "../../../../shared/DetailDishScreen";
import HeaderNavigation from "../../../../components/shared/HeaderNavigation";
import UpdateDishScreen from "./UpdateDishScreen";
import UpdateFoodForDishScreen from "./UpdateFoodForDishScreen";
import { appActions } from "../../../../context/app";
import useAppContext from "../../../../hooks/useAppContext";
import DetailFoodScreen from "../../../../shared/DetailFoodScreen";
const Stack = createNativeStackNavigator();

export default function DishScreenNavigator({ navigation }) {
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
    <Stack.Navigator>
      <Stack.Screen
        name="DetailDishScreen"
        component={DetailDishScreen}
        options={{
          header: () => <HeaderNavigation title="Detail Dish" />,
        }}
      />
      <Stack.Screen
        name="UpdateDishScreen"
        component={UpdateDishScreen}
        options={{
          header: () => <HeaderNavigation title="Update Dish" />,
        }}
      />
      <Stack.Screen
        name="UpdateFoodForDishScreen"
        component={UpdateFoodForDishScreen}
        options={{
          header: () => <HeaderNavigation title="Select food for dish" />,
        }}
      />
      <Stack.Screen
        name="DetailFoodScreen"
        component={DetailFoodScreen}
        options={{
          header: () => <HeaderNavigation title="DetailFoodScreen" />,
        }}
      />
    </Stack.Navigator>
  );
}
