import { StyleSheet, Text } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
export default function Heading({ children }) {
  return <Text style={styles.heading}>{children}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: Typography.LG,
    color: colors.textColor,
    marginHorizontal: Spacing.LG,
    marginVertical: Spacing.XL,
    lineHeight: Spacing.XXXL,
  },
});
