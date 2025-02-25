import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../utils/Colors";
export default function Loading({
  size = 60,
  thickness = 4,
  color = colors.primaryColor,
}) {
  return (
    <View style={styles.loadingContainer}>
      <Progress.CircleSnail
        size={size}
        indeterminate={true}
        color={color}
        thickness={thickness}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
