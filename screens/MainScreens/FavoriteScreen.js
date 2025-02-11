import { useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import colors from "../../utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function FavoriteScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, []);
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.screenInner}></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  screenInner: {
    flex: 1,
    margin: 20,
  },
});
