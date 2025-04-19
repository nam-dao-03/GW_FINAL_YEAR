import { Pressable, StyleSheet, Text, View } from "react-native";
import Typography from "../../utils/Typography";
import colors from "../../utils/Colors";

export default function HeadingContainer({
  title,
  onPress,
  consumedValue,
  targetValue,
  style = {},
  disableLink = false,
}) {
  return (
    <View style={[styles.headingContainer, style]}>
      <Text style={styles.heading}>{title}</Text>
      <Pressable
        style={
          !disableLink
            ? ({ pressed }) => (pressed ? [{ opacity: 0.5 }] : [])
            : {}
        }
        onPress={onPress}
        disabled={disableLink}
      >
        <Text
          style={
            !disableLink
              ? styles.waterLabel
              : {
                  fontSize: Typography.SM,
                  color: colors.descriptionTextColor,
                }
          }
        >
          <Text>{consumedValue}</Text>
          <Text>{targetValue}</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: Typography.MD,
    color: colors.textColor,
    width: "70%",
  },
  waterLabel: {
    fontSize: Typography.SM,
    color: colors.waterColor,
    borderBottomColor: colors.waterColor,
    borderBottomWidth: 1,
  },
});
