import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as Progress from "react-native-progress";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
import colors from "../../utils/Colors";

const { width, height } = Dimensions.get("window");

export default function LoadingScreenOverlay() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval); // clear khi unmount
  }, []);

  return (
    <View style={styles.overlay}>
      <Progress.Circle
        size={Sizes.MASSIVE}
        indeterminate={true}
        color={colors.primaryColor}
        borderWidth={Sizes.XXXS}
      />
      <Text style={styles.text}>Loading{dots}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width,
    height,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  text: {
    marginTop: Spacing.MD,
    fontSize: Typography.SM,
    fontWeight: "500",
    color: "#ffffff",
  },
});
