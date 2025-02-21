import { StyleSheet, Text, View, ScrollView } from "react-native";
import FavoriteItem from "../../../../components/FavoriteItem";
import colors from "../../../../utils/Colors";
import KnowledgeSection from "../../../../components/KnowledgeSection";

export default function DishScreen() {
  return (
    <ScrollView style={styles.screenContainer}>
      <KnowledgeSection />
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
