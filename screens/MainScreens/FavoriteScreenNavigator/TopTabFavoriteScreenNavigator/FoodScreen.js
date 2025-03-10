import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

import Spacing from "../../../../utils/Spacing";
import { appActions } from "../../../../context/app";
import { showConfirmationDialog } from "../../../../utils/Common";

import colors from "../../../../utils/Colors";
import FavoriteFoodItem from "../../../../components/FoodScreen/FavoriteFoodItem";
import useAppContext from "../../../../hooks/useAppContext";

export default function FoodScreen({ navigation }) {
  const [state, dispatch] = useAppContext();
  const { foodList } = state;

  function handleDeleteFoodItem(foodId) {
    function onConfirm() {
      dispatch(appActions.deleteFoodById(foodId));
    }
    showConfirmationDialog(
      "Delete Item?",
      "Do you want to continue?",
      onConfirm
    );
  }

  function handleNavigateScreen(foodId) {
    navigation
      .getParent("FavoriteScreenNavigator")
      .navigate("FoodScreenNavigator", {
        screen: "DetailFoodScreen",
        params: { foodId },
      });
  }

  function renderFoodItemList({ item }) {
    return (
      <FavoriteFoodItem
        food={item}
        onDeleteFoodItem={handleDeleteFoodItem}
        onNavigateScreen={handleNavigateScreen}
      />
    );
  }
  return (
    <FlatList
      data={foodList}
      keyExtractor={(item) => item.getFoodId()}
      renderItem={renderFoodItemList}
      style={styles.flatList}
      initialScrollIndex={0}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: Spacing.XL }}
      ListHeaderComponentStyle={{ zIndex: 10 }}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    paddingHorizontal: Spacing.SM,
    paddingVertical: Spacing.MD,
    backgroundColor: colors.backgroundColorScreen,
  },
});
