import { View, Image, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import colors from "../../utils/Colors";
import Spacing from "../../utils/Spacing";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
import { knowledgeData } from "../../data/Data";

// Array of nutritional knowledge facts

export default function KnowledgeSection() {
  const [randomKnowledge, setRandomKnowledge] = useState(knowledgeData[0]);

  useEffect(() => {
    // Choose a random knowledge fact when component is rendered
    const randomIndex = Math.floor(Math.random() * knowledgeData.length);
    setRandomKnowledge(knowledgeData[randomIndex]);
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <Image
        source={require("../../assets/imgs/light.png")}
        style={styles.image}
      />
      <Text style={styles.question}>{randomKnowledge.question}</Text>
      <Text style={styles.heading}>{randomKnowledge.heading}</Text>
      <Text style={styles.description}>{randomKnowledge.description}</Text>
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
    marginTop: Spacing.SM,
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
    width: "95%",
    marginTop: Spacing.SM,
    fontSize: Typography.SM,
    color: colors.textColor,
  },
});
