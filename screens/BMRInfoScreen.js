import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLayoutEffect } from "react";
import colors from "../utils/Colors";
import ActivityForm from "../components/BMRInfoScreen/ActivityForm";
import PersonalPhysicalForm from "../components/BMRInfoScreen/PersonalPhysicalForm";
import ContinueButton from "../components/ContinueButton";

export default function BMRInfoScreen({ navigation }) {
  // Styles for react navigation
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  //navigate to SetTargetScreen
  function handleNavigateScreen() {
    navigation.navigate("SetTargetScreen");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.screenContainer} nestedScrollEnabled={true}>
          <View style={styles.header}>
            <Text style={styles.heading}>Basal Metabolic Rate (BMR)</Text>
          </View>
          <ActivityForm />
          <PersonalPhysicalForm />
          <ContinueButton
            onPress={handleNavigateScreen}
            extraStyle={styles.continueButton}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: colors.backgroundColorScreen,
  },
  header: {
    backgroundColor: colors.primaryColor,
    paddingTop: 20,
    paddingBottom: 100,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heading: {
    color: colors.whiteColor,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  continueButton: {
    marginVertical: 20,
  },
});
