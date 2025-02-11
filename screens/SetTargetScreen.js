import { useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import colors from "../utils/Colors";
import Target from "../components/SetTargetScreen/Target";
import ContinueButton from "../components/ContinueButton";
export default function SetTargetScreen({ navigation }) {
  //Style header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Target",
      headerStyle: {
        backgroundColor: colors.primaryColor,
      },
      headerBackTitle: "Back",
      headerTintColor: colors.whiteColor,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
      },
    });
  }, []);
  //state of choose target
  const [selected, setSelected] = useState();
  //Navigate to IndicatorsOverviewScreen
  function handleNavigateScreen() {
    navigation.navigate("IndicatorsOverviewScreen");
  }
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.screenHeading}>What is your Target ?</Text>
          <Target
            heading="Lose weight"
            description="Manage your weight by eating smarter."
            selected={selected === "Lose weight"}
            onPress={setSelected}
          />
          <Target
            heading="Maintain weight"
            description="Optimize for your health."
            selected={selected === "Maintain weight"}
            onPress={setSelected}
          />
          <Target
            heading="Gain weight"
            description="Gain weight with a clean eating diet."
            selected={selected === "Gain weight"}
            onPress={setSelected}
          />
          {selected ? <ContinueButton onPress={handleNavigateScreen} /> : <></>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  innerContainer: {
    flex: 1,
    gap: 20,
  },
  screenHeading: {
    marginTop: 20,
    marginHorizontal: "auto",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primaryColor,
  },
});
