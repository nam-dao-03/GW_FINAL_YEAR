import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateWorkoutScreen from "./CreateWorkoutScreen";
import WorkoutListScreen from "./WorkoutListScreen";
const Stack = createNativeStackNavigator();

export default function AddWorkoutNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WorkoutListScreen" component={WorkoutListScreen} />
      <Stack.Screen
        name="CreateWorkoutScreen"
        component={CreateWorkoutScreen}
      />
    </Stack.Navigator>
  );
}
