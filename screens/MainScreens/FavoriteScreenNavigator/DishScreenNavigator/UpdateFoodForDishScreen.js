import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { useCallback } from "react";
import SearchBar from "../../../../components/shared/SearchBar";
import FoodItem from "../../../../components/SelectFoodForDishScreen/FoodItem";
import useAppContext from "../../../../hooks/useAppContext";
import Spacing from "../../../../utils/Spacing";
import colors from "../../../../utils/Colors";
import useDishContext from "../../../../hooks/useDishContext";
import { dishActions } from "../../../../context/dish";
import { generateRandomString } from "../../../../utils/Common";
import { useToast } from "react-native-toast-notifications";
import KeyboardAvoidingWrapper from "../../../../components/shared/KeyboardAvoidingWrapper";
export default function UpdateFoodForDishScreen({ navigation }) {
  const toast = useToast();
  const [appState, appDispatch] = useAppContext();
  const [dishState, dishDispatch] = useDishContext();
  const { foodList } = appState;
  const handleRenderFoodItem = useCallback(({ item }) => {
    const selectedFoodId = generateRandomString();
    return (
      <FoodItem
        food={{ ...item, selectedFoodId }}
        onNavigateScreen={handleNavigateScreen}
        onPressButton={handleAddFoodToDish}
        action="add"
      />
    );
  }, []);

  const handleNavigateScreen = useCallback(
    (foodId) => {
      const sourceScreen = "UpdateFoodForDishScreen";
      navigation
        .getParent("FavoriteScreenNavigator")
        .navigate("FoodScreenNavigator", {
          screen: "DetailFoodScreen",
          params: { foodId, sourceScreen },
        });
    },
    [navigation]
  );

  const handleAddFoodToDish = useCallback((selectedFood) => {
    dishDispatch(dishActions.addFoodToDish(selectedFood));
    toast.show("Food added to dish", { type: "success" });
  }, []);

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <SearchBar navigation={navigation} placeholder="Search Food" />

        <FlatList
          data={foodList}
          keyExtractor={(item) => item.getFoodId()}
          renderItem={handleRenderFoodItem}
          style={styles.flatList}
          initialScrollIndex={0}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.XL }}
          ListHeaderComponentStyle={{ zIndex: 10 }}
          keyboardShouldPersistTaps="handled"
        />
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    position: "relative",
  },
  flatList: {
    marginTop: Spacing.SM,
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
  },
});
