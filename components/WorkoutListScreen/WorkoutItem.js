import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";

export default function WorkoutItem({
  workout,
  onActionItem,
  icon = "add",
  onPressItem,
  onDeleteItemSpecific,
}) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.itemContainer, { opacity: 0.5 }]
          : [styles.itemContainer]
      }
      onPress={() => {
        if (onPressItem) {
          onPressItem(workout);
        }
      }}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.favoriteHeading}>
          {workout?.exerciseName || "name"}
        </Text>
        <Text style={styles.favoriteDescription}>
          {workout?.calories || 123} kcal - {workout?.duration || 10} minutes
        </Text>
      </View>
      <View style={styles.itemRight}>
        {!!workout?.isCreatedByUser && (
          <Ionicons
            name="person"
            size={Sizes.SM * 1.2}
            color={colors.descriptionTextColor}
            style={styles.favoriteIcon}
          />
        )}
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.pressableIcon, { opacity: 0.5 }]
              : [styles.pressableIcon]
          }
          onPress={() => onActionItem(workout)}
        >
          <Ionicons name={icon} size={Sizes.MD} color="black" />
        </Pressable>
        {!!workout?.isCreatedByUser && icon !== "close-outline" && (
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.pressableIcon, { opacity: 0.5 }]
                : [styles.pressableIcon]
            }
            onPress={() => onDeleteItemSpecific(workout)}
          >
            <Ionicons name="close-outline" size={Sizes.MD} color="black" />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: Spacing.XS,
    paddingVertical: Spacing.MD,
    paddingHorizontal: Spacing.LG,
    borderRadius: Spacing.SM,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
  },
  itemLeft: {
    width: "60%",
    gap: 5,
  },
  favoriteHeading: {
    fontSize: Typography.MD,
    fontWeight: "bold",
    color: colors.textColor,
    flexWrap: "wrap",
  },
  favoriteDescription: {
    fontSize: Typography.SM,
    color: colors.descriptionTextColor,
  },
  itemRight: {
    flexDirection: "row",
    gap: Spacing.MD,
  },
  pressableIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.XXS * 2,
    borderRadius: 999,
  },
  favoriteIcon: {
    alignSelf: "flex-end",
  },
});
