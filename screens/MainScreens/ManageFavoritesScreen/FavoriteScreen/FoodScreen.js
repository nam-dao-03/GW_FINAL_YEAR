import { StyleSheet, Text, View, ScrollView } from "react-native";
import FavoriteItem from "../../../../components/FavoriteItem";
import colors from "../../../../utils/Colors";

export default function FoodScreen() {
  return (
    <ScrollView style={styles.screenContainer}>
      <FavoriteItem />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: colors.backgroundColorScreen,
  },
});
