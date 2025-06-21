import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import colors from "../../../utils/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import ModalAdd from "../../../components/FavoriteScreen/ModalAdd";
import Typography from "../../../utils/Typography";
import Spacing from "../../../utils/Spacing";
import TopTabFavoriteScreenNavigator from "./TopTabFavoriteScreenNavigator/TopTabFavoriteScreenNavigator";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { bottomTabStyle } from "../../../utils/Common";
import useAppContext from "../../../hooks/useAppContext";
import { appActions } from "../../../context/app";
import HeaderNavigation from "../../../components/shared/HeaderNavigation";
import Sizes from "../../../utils/Size";

export default function FavoriteScreen({ navigation }) {
  const [appState, appDispatch] = useAppContext();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const bottomTabNavigation = navigation.getParent("MainScreensBottomTab");
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title="Favorites"
            iconRight={
              <Ionicons name="add" size={Sizes.MD} color={colors.whiteColor} />
            }
            headerLeft={false}
            actionRight={() => {
              setIsVisibleModal(true);
            }}
          />
        ),
      });
      bottomTabNavigation.setOptions(bottomTabStyle);
      appDispatch(appActions.setTrueShowFAB());
    }, [bottomTabNavigation])
  );
  return (
    <SafeAreaView style={styles.screenContainer}>
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
