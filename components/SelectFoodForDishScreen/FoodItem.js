import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
import { DEFAULT_AVERAGE_NUTRITIONAL } from "../../utils/constants";
import { convertToNumber } from "../../utils/Common";
export default function FoodItem({
  food,
  onNavigateScreen,
  onPressButton,
  action = "add",
}) {
  const {
    foodId = "1",
    nameFood = "test",
    measurement = "1",
    calories = 1,
    isFavorite = 1,
  } = food;
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
      onPress={() => onNavigateScreen(foodId)}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.favoriteHeading}>{nameFood || "test"}</Text>
        <Text style={styles.favoriteDescription}>
          1 {measurement} - {convertToNumber(calories * scaleFactor)} kcal
        </Text>
      </View>
      <View style={styles.itemRight}>
        {!!isFavorite && (
          <Ionicons
            name="heart"
            size={Sizes.SM * 1.2}
            color={colors.fieryRed}
            style={styles.favoriteIcon}
          />
        )}
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.addIcon, { opacity: 0.5 }] : [styles.addIcon]
          }
          onPress={() => onPressButton(food)}
        >
          <Ionicons
            name={action || "add"}
            size={Sizes.MD}
            color={colors.textColor}
          />
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
  addIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: Spacing.XXS * 2,
    borderRadius: "50%",
  },
  favoriteIcon: {
    alignSelf: "flex-end",
  },
});
