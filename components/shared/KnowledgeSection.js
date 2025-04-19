import { View, Image, StyleSheet, Text } from "react-native";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
export default function KnowledgeSection() {
  return (
    <View style={styles.sectionContainer}>
      <Image
        source={require("../../assets/imgs/light.png")}
        style={styles.image}
      />
      <Text style={styles.question}>Co the ban chua biet</Text>
      <Text style={styles.heading}>Cas Hoi Nuong Cas Hoi Nuong</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        tincidunt, magna et pharetra efficitur, lorem metus suscipit justo, nec
        dictum mi libero ac lorem. Vivamus posuere, nulla id sagittis fermentum,
        eros velit feugiat velit, vel consectetur nisl nisi at lacus. Duis
        ultrices nisl et nunc suscipit, non tincidunt libero facilisis. Aenean
        auctor, nisi ut aliquet vulputate, enim erat sodales augue, non posuere
        mauris nulla nec urna. Mauris tincidunt justo sit amet vehicula
        ullamcorper. Nullam euismod, turpis eu tristique suscipit, eros lacus
        facilisis est, sed tristique libero libero id mi.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    padding: Spacing.SM,
    borderRadius: Spacing.SM,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XXS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.XXS,
    elevation: 5,
  },
  image: {
    width: Sizes.MASSIVE,
    height: Sizes.MASSIVE,
  },
  heading: {
    width: "90%",
    marginTop: Spacing.XL,
    fontWeight: "bold",
    fontSize: Typography.MD,
    color: colors.textColor,
    textAlign: "center",
  },
  question: {
    width: "90%",
    marginTop: Spacing.SM,
    fontSize: Typography.SM,
    color: colors.descriptionTextColor,
    textAlign: "center",
  },
  description: {
    width: "90%",
    marginTop: Spacing.SM,
    fontSize: Typography.SM,
    color: colors.textColor,
  },
});
