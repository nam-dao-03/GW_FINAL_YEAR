import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
export default function FavoriteFoodItem({
  food,
  onDeleteFoodItem,
  onNavigateScreen,
}) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.itemContainer, { opacity: 0.5 }]
          : [styles.itemContainer]
      }
      onPress={() => onNavigateScreen(food.foodId)}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.favoriteHeading}>{food.nameFood || ""}</Text>
        <Text style={styles.favoriteDescription}>
          1 {food.measurement || ""} - {food.calories || ""} calories
        </Text>
      </View>
      <View style={styles.itemRight}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.favoriteIcon, { opacity: 0.5 }]
              : [styles.favoriteIcon]
          }
        >
          <Ionicons name="add" size={Sizes.MD} color="black" />
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.favoriteIcon, { opacity: 0.5 }]
              : [styles.favoriteIcon]
          }
          onPress={() => onDeleteFoodItem(food.foodId || "12345678")}
        >
          <Ionicons name="close-outline" size={Sizes.MD} color="black" />
        </Pressable>
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
  favoriteIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.XXS * 2,
    borderRadius: "50%",
  },
});
