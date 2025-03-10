import { Text, StyleSheet } from "react-native";
import Typography from "../../utils/Typography";
import Spacing from "../../utils/Spacing";
export default function Heading({ children }) {
  return <Text style={styles.headingText}>{children}</Text>;
}

const styles = StyleSheet.create({
  headingText: {
    fontSize: Typography.LG,
    marginHorizontal: Spacing.SM,
    marginTop: Spacing.MD,
  },
});
