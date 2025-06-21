import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
export default function EmptySection({ description }) {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name="box-open"
        size={Sizes.HUGE}
        color={colors.descriptionTextColor}
      />
      <Text style={styles.emptyText}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.SM,
    backgroundColor: colors.backgroundColorScreen,
    borderRadius: Spacing.SM,
    width: "100%",
  },
  emptyText: {
    fontSize: Typography.MD,
    color: colors.descriptionTextColor,
    marginTop: Spacing.XS,
  },
});
