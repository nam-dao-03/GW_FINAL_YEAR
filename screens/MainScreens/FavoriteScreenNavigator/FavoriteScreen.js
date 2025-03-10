import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import colors from "../../../utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import PressableIcon from "../../../components/PressableIcon";
import ModalAdd from "../../../components/FavoriteScreen/ModalAdd";
import Typography from "../../../utils/Typography";
import Spacing from "../../../utils/Spacing";

import TopTabFavoriteScreenNavigator from "./TopTabFavoriteScreenNavigator/TopTabFavoriteScreenNavigator";

export default function FavoriteScreen({ navigation }) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.heading}>Favorites</Text>
        <PressableIcon
          onPress={() => {
            setIsVisibleModal(true);
          }}
        >
          <Ionicons name="add" size={Typography.LG} color={colors.whiteColor} />
        </PressableIcon>
      </View>
      <ModalAdd
        isVisible={isVisibleModal}
        onBackdropPress={() => setIsVisibleModal(false)}
      />
      <TopTabFavoriteScreenNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.XL,
    paddingVertical: Spacing.SM,
    backgroundColor: colors.primaryColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: Typography.MD,
    color: colors.whiteColor,
    fontWeight: "bold",
  },
});
