import { StyleSheet, View, Text } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../../utils/Colors";
export function IngredientContainer({
  ingredientLabel,
  ingredientConsumedValue,
  ingredientTotalValue,
  progress,
  extraStyle,
}) {
  return (
    <View style={[styles.ingredientContainer, extraStyle]}>
      <Text style={styles.ingredientLabel}>{ingredientLabel}</Text>
      <View style={styles.progressBar}>
        <Progress.Bar
          progress={progress}
          height={3}
          borderColor={colors.remainingProgressColor}
          unfilledColor={colors.remainingProgressColor}
          color={colors.usedProgressColor}
          borderRadius={0}
          width={null}
        />
      </View>
      <Text style={styles.ingredientValue}>
        <Text>{ingredientConsumedValue}</Text> /{" "}
        <Text>{ingredientTotalValue}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  ingredientContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    paddingVertical: 5,
    width: "100%",
  },
  ingredientLabel: {
    fontSize: 16,
    color: colors.whiteColor,
  },
  ingredientValue: {
    fontSize: 16,
    color: colors.whiteColor,
  },
});
