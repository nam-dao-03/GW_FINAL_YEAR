import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../../../utils/Colors";
import { useLayoutEffect, memo, useState, useCallback } from "react";
import PressableIcon from "../../../../components/PressableIcon";
import ModalAdd from "../../../../components/FavoriteScreen/ModalAdd";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DishScreen from "./DishScreen";
import FoodScreen from "./FoodScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddFoodScreen from "../AddFoodScreen";
import AddDishScreen from "../AddDishScreen";
import { useFocusEffect } from "@react-navigation/native";
const TopTab = createMaterialTopTabNavigator();
const TopTabNavigator = memo(() => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primaryColor, // Màu gạch chân tab được chọn
          width: "30%",
          marginLeft: "10%",
        },
      }}
      initialRouteName="DishScreen"
    >
      <TopTab.Screen
        name="DishScreen"
        component={DishScreen}
        options={{
          title: "My Dish",
        }}
      />
      <TopTab.Screen
        name="FoodScreen"
        component={FoodScreen}
        options={{
          title: "My Food",
        }}
      />
    </TopTab.Navigator>
  );
});
export default function FavoriteScreen({ navigation }) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.heading}>Favorites</Text>
        <PressableIcon
          name="add"
          size={24}
          color={colors.whiteColor}
          onPress={() => {
            setIsVisibleModal(true);
          }}
        />
      </View>
      <ModalAdd
        isVisible={isVisibleModal}
        onBackdropPress={() => setIsVisibleModal(false)}
      />
      <TopTabNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.primaryColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    color: colors.whiteColor,
    fontWeight: "bold",
  },
});
