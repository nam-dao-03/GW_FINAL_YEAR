import { View, Text, Pressable } from "react-native";

export default function LoginScreen({ navigation, route }) {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate("DashBoardScreen")}>
        <Text>Hello Login</Text>
      </Pressable>
    </View>
  );
}
