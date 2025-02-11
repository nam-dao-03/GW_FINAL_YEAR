import { SafeAreaView, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
export default function UserScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({});
  });
  return (
    <SafeAreaView>
      <View>
        <Text>UserScreen</Text>
      </View>
    </SafeAreaView>
  );
}
