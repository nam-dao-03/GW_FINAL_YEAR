import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddDishScreen from "./AddDishScreen";
import SelectFoodForDishScreen from "./SelectFoodForDishScreen";
import HeaderNavigation from "../../../../components/shared/HeaderNavigation";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import useAppContext from "../../../../hooks/useAppContext";
import { appActions } from "../../../../context/app";
import DetailFoodScreen from "../../../../shared/DetailFoodScreen";
const Stack = createNativeStackNavigator();

export default function AddDishScreenNavigator({ navigation }) {
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
    <Stack.Navigator initialRouteName="AddDishScreen">
      <Stack.Screen
        name="AddDishScreen"
        component={AddDishScreen}
        options={{
          header: () => <HeaderNavigation title="Create new dish" />,
        }}
      />
      <Stack.Screen
        name="SelectFoodForDishScreen"
        component={SelectFoodForDishScreen}
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
