import { SafeAreaView, StyleSheet, SectionList } from "react-native";
import { useCallback, useState } from "react";
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

export default function SelectFoodForDishScreen({ navigation, route }) {
  const toast = useToast();
  const [searchValue, setSearchValue] = useState("");
  const [appState] = useAppContext();
  const [dishState, dishDispatch] = useDishContext();
  const { foodList } = appState;

  const filteredFoodList = foodList.filter((item) =>
    item.nameFood.toLowerCase().includes(searchValue.toLowerCase())
  );

  const createdByUserItems = filteredFoodList.filter(
    (item) => item.isCreatedByUser && !item.isFavorite
  );

  const otherItems = filteredFoodList.filter(
    (item) => !item.isFavorite && !item.isCreatedByUser
  );

  const favoriteItems = filteredFoodList.filter((item) => item.isFavorite);

  const sections = [
    { data: favoriteItems },
    { data: createdByUserItems },
    { data: otherItems },
  ];

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
      navigation.navigate("DetailFoodScreen", {
        foodId,
        sourceScreen: route.name,
      });
    },
    [navigation]
  );

  const handleAddFoodToDish = useCallback((selectedFood) => {
    dishDispatch(dishActions.addFoodToDish(selectedFood));
    toast.show(`${selectedFood?.nameFood || "Food"} added to dish`, {
      type: "success",
    });
  }, []);

  function handleChangeSearchText(value) {
    setSearchValue(value);
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <SearchBar
          navigation={navigation}
          placeholder="Search Food"
          onSearch={handleChangeSearchText}
        />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.getFoodId()}
          renderItem={handleRenderFoodItem}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.XL }}
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
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
  },
});
