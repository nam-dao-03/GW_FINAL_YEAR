import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
import { DEFAULT_AVERAGE_NUTRITIONAL } from "../../utils/constants";
import { convertToNumber } from "../../utils/Common";
export default function FavoriteFoodItem({
  food,
  onDeleteFoodItem,
  onNavigateDetailScreen,
  onOpenAddFoodToMealModal,
}) {
  const scaleFactor = food
    ? convertToNumber(food.servingSize / DEFAULT_AVERAGE_NUTRITIONAL)
    : 1;
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.itemContainer, { opacity: 0.5 }]
          : [styles.itemContainer]
      }
      onPress={() => onNavigateDetailScreen(food?.foodId)}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.favoriteHeading}>{food.nameFood || ""}</Text>
        <Text style={styles.favoriteDescription}>
          1 {food.measurement || ""} -{" "}
          {convertToNumber(food.calories * scaleFactor) || ""} kcal
        </Text>
      </View>
      <View style={styles.itemRight}>
        {!!food.isFavorite && (
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
          onPress={() => onOpenAddFoodToMealModal(food)}
        >
          <Ionicons name="add" size={Sizes.MD} color="black" />
        </Pressable>
        {!!food.isCreatedByUser && (
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.pressableIcon, { opacity: 0.5 }]
                : [styles.pressableIcon]
            }
            onPress={() => onDeleteFoodItem(food)}
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
    borderRadius: "50%",
  },
  favoriteIcon: {
    alignSelf: "flex-end",
  },
});
