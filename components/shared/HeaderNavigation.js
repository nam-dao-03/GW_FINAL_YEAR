import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import PressableIcon from "./PressableIcon";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import colors from "../../utils/Colors";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Sizes from "../../utils/Size";
export default function HeaderNavigation({
  title = "",
  iconRight,
  actionRight = () => {},
  headerLeft = true,
}) {
  const navigation = useNavigation();

  function handleGoBackScreen() {
    navigation.dispatch(CommonActions.goBack());
  }
  return (
    <View style={styles.header}>
      {headerLeft && (
        <PressableIcon onPress={handleGoBackScreen} style={{ padding: 0 }}>
          <Ionicons name="arrow-back" size={Sizes.MD} color="white" />
        </PressableIcon>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {iconRight && (
        <PressableIcon
          onPress={actionRight}
          style={{ padding: 0, marginLeft: "auto", marginRight: Spacing.XXS }}
        >
          {iconRight}
        </PressableIcon>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    paddingTop: Spacing.LG,
    paddingBottom: Spacing.SM,
    paddingHorizontal: Spacing.XS,
  },
  headerTitle: {
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.whiteColor,
    marginLeft: Spacing.SM,
  },
});
