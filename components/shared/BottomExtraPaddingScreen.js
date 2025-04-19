import Sizes from "../../utils/Size";
import { View, StyleSheet } from "react-native";
export default function BottomExtraPaddingScreen() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: Sizes.MASSIVE,
  },
});
