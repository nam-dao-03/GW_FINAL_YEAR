import { StyleSheet, Text, View, ScrollView } from "react-native";
import KnowledgeSection from "../../../../components/KnowledgeSection";
import Spacing from "../../../../utils/Spacing";
import colors from "../../../../utils/Colors";

export default function DishScreen() {
  return (
    <ScrollView style={styles.screenContainer}>
      <KnowledgeSection />
      <View style={{ height: Spacing.BIG_40 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: Spacing.SM,
    paddingVertical: Spacing.XL,
    backgroundColor: colors.backgroundColorScreen,
    paddingBottom: Spacing.BIG_40,
  },
});
