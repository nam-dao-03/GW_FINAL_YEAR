import { View, Image, StyleSheet, Text } from "react-native";
import colors from "../utils/Colors";
export default function KnowledgeSection() {
  return (
    <View style={styles.sectionContainer}>
      <Image
        source={require("../assets/imgs/light.png")}
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
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  heading: {
    width: "90%",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 20,
    color: colors.textColor,
    textAlign: "center",
  },
  question: {
    width: "90%",
    marginTop: 10,
    fontSize: 16,
    color: colors.descriptionTextColor,
    textAlign: "center",
  },
  description: {
    width: "90%",
    marginTop: 10,
    fontSize: 16,
    color: colors.textColor,
  },
});
