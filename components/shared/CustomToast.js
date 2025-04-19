import { View, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import colors from "../../utils/Colors";
const duration = 2000;
export default function CustomToast({ icon, message, visible }) {
  if (!visible) return null; // Nếu không hiển thị thì return null
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Spacing.XL,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.MD,
    borderRadius: Spacing.XL,
    maxWidth: "70%",
    gap: Spacing.XXS,
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  icon: {},
  message: {
    fontSize: Typography.SM,
    color: colors.textColor,
    textAlign: "center",
    lineHeight: Typography.SM * 1.5,
    flexWrap: "wrap",
  },
});
