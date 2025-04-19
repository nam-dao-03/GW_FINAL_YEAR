import { StyleSheet, Text } from "react-native";
import Typography from "../../utils/Typography";
import Spacing from "../../utils/Spacing";

export default function Heading({ children }) {
  return <Text style={styles.heading}>{children}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: Typography.LG,
    marginVertical: Spacing.MD,
  },
});
