import { StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../../utils/Colors";
import CaloriesContainer from "./CaloriesContainer";
import { IngredientContainer } from "./IngredientContainer";
const NEEDED_CALORIES_WIDTH = 140;
const CALORIES_CONTAINER_HEIGHT_IN_NEEDED_CALORIES = NEEDED_CALORIES_WIDTH;
const CALORIES_CONTAINER_WIDTH_IN_NEEDED_CALORIES = NEEDED_CALORIES_WIDTH * 0.6;
export default function ProgressBoard() {
  return (
    <View style={styles.boardContainer}>
      <View style={styles.caloriesBoard}>
        <CaloriesContainer
          caloriesLabel="Consumed"
          caloriesValue={0}
          extraStyle={{ width: "25%" }}
        />
        <View style={styles.neededCalories}>
          <Progress.Circle
            size={NEEDED_CALORIES_WIDTH}
            color={colors.usedProgressColor}
            unfilledColor={colors.remainingProgressColor}
            borderWidth={0}
            progress={0.125}
          />
          <CaloriesContainer
            caloriesLabel="Needed"
            caloriesValue={2000}
            extraStyle={styles.caloriesContainerInNeededContainer}
          />
        </View>
        <CaloriesContainer
          caloriesLabel="Burned"
          caloriesValue={0}
          extraStyle={{ width: "25%" }}
        />
      </View>
      <View style={styles.otherIngredientBoard}>
        <IngredientContainer
          ingredientLabel="Carbs"
          ingredientConsumedValue={0}
          ingredientTotalValue={208}
          extraStyle={styles.ingredientContainerExtraStyle}
        />
        <IngredientContainer
          ingredientLabel="Protein"
          ingredientConsumedValue={0}
          ingredientTotalValue={208}
          extraStyle={styles.ingredientContainerExtraStyle}
        />
        <IngredientContainer
          ingredientLabel="Fat"
          ingredientConsumedValue={0}
          ingredientTotalValue={79}
          extraStyle={styles.ingredientContainerExtraStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardContainer: {
    marginTop: 20,
  },
  caloriesBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  otherIngredientBoard: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ingredientContainerExtraStyle: {
    width: "30%",
  },
  neededCalories: {
    position: "relative",
  },
  caloriesContainerInNeededContainer: {
    width: CALORIES_CONTAINER_WIDTH_IN_NEEDED_CALORIES,
    height: CALORIES_CONTAINER_HEIGHT_IN_NEEDED_CALORIES,
    position: "absolute",
    left: "50%",
    transform: [
      { translateX: -CALORIES_CONTAINER_WIDTH_IN_NEEDED_CALORIES / 2 },
    ],
    justifyContent: "center",
  },
});
