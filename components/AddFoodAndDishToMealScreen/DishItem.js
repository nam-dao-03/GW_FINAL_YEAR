import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
export default function DishItem({
  dish,
  onNavigateScreen,
  onDeleteDishItem,
  onAddDishToMeal,
}) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.itemContainer, { opacity: 0.5 }]
          : [styles.itemContainer]
      }
      onPress={() => onNavigateScreen(dish.getDishId())}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.favoriteHeading}>{dish?.nameDish || ""}</Text>
        <Text style={styles.favoriteDescription}>
          1 serving size - {dish?.calories || ""} kcal
        </Text>
      </View>
      <View style={styles.itemRight}>
        {!!dish.isFavorite && (
          <Ionicons
            name="heart"
            size={Sizes.SM * 1.2}
            color={colors.fieryRed}
            style={styles.favoriteIcon}
          />
        )}
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.pressableIcon, { opacity: 0.5 }]
              : [styles.pressableIcon]
          }
          onPress={() => onAddDishToMeal(dish)}
        >
          <Ionicons name="add" size={Sizes.MD} color="black" />
        </Pressable>
        {!!dish?.isCreatedByUser && (
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.pressableIcon, { opacity: 0.5 }]
                : [styles.pressableIcon]
            }
            onPress={() => onDeleteDishItem(dish)}
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
