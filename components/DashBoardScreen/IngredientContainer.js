import { StyleSheet, View, Text } from "react-native";
import * as Progress from "react-native-progress";
import colors from "../../utils/Colors";
import Sizes from "../../utils/Size";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
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
          height={Sizes.TINY * 2}
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
    paddingVertical: Spacing.XS,
    width: "100%",
  },
  ingredientLabel: {
    fontSize: Typography.SM,
    color: colors.whiteColor,
  },
  ingredientValue: {
    fontSize: Typography.SM,
    color: colors.whiteColor,
  },
});
