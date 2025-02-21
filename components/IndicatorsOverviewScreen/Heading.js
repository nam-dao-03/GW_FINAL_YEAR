import { StyleSheet, Text } from "react-native";
import colors from "../../utils/Colors";
export default function Heading({ children }) {
  return <Text style={styles.heading}>{children}</Text>;
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    color: colors.textColor,
    marginHorizontal: 20,
    marginVertical: 30,
    lineHeight: 35,
  },
});
