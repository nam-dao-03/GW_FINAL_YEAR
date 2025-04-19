import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import HeaderNavigation from "../../components/shared/HeaderNavigation";
import { AntDesign } from "@expo/vector-icons/";
import Sizes from "../../utils/Size";
import SearchBar from "../../components/shared/SearchBar";
import useAppContext from "../../hooks/useAppContext";
import Spacing from "../../utils/Spacing";
import WorkoutItem from "../../components/WorkoutListScreen/WorkoutItem";
import colors from "../../utils/Colors";
import { appActions } from "../../context/app";
import {
  generateRandomString,
  showConfirmationDialog,
} from "../../utils/Common";
import { getLocalDate } from "../../utils/Date";
import { useToast } from "react-native-toast-notifications";
import ModalAddWorkout from "../../components/WorkoutListScreen/ModalAddWorkout";
import KeyboardAvoidingWrapper from "../../components/shared/KeyboardAvoidingWrapper";
export default function WorkoutListScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title="Workout"
            iconRight={<AntDesign name="plus" size={Sizes.MD} color="white" />}
            actionRight={handlerNavigateCreateWorkout}
          />
        ),
      });
    }, [])
  );
  const [searchValue, setSearchValue] = useState("");
  const [appState, appDispatch] = useAppContext();
  const [isModalAddWorkoutVisible, setIsModalAddWorkoutVisible] =
    useState(false);
  const toast = useToast();
  const [workout, setWorkout] = useState({});
  const { workoutList } = appState;

  const filteredWorkoutList = workoutList
    .filter((item) => item.workoutDate === null)
    .filter((item) =>
      item.exerciseName.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      if (a.isCreatedByUser === b.isCreatedByUser) return 0;
      return a.isCreatedByUser ? -1 : 1;
    });
  function handlerSearchValue(value) {
    setSearchValue(value);
  }

  function handlerNavigateCreateWorkout() {
    navigation.navigate("CreateWorkoutScreen");
  }

  const renderWorkoutItem = useCallback(({ item }) => {
    return (
      <WorkoutItem
        workout={item}
        onActionItem={handleAddItem}
        onPressItem={handleOpenAddWorkoutModal}
        onDeleteItemSpecific={handleDeleteItem}
      />
    );
  }, []);

  function handleOpenAddWorkoutModal(workout) {
    setIsModalAddWorkoutVisible(true);
    setWorkout(workout);
  }
  function handleAddItem(workout) {
    const workoutId = generateRandomString();
    const workoutDate = getLocalDate();
    const newWorkout = {
      ...workout,
      isCreatedByUser: 0,
      workoutId,
      workoutDate,
    };
    appDispatch(appActions.createWorkout(newWorkout));
    toast.show(`Added ${workout?.exerciseName} to Workout`, {
      type: "success",
    });
  }
  function handleDeleteItem(workout) {
    function onConfirm() {
      const workoutId = workout.workoutId;
      appDispatch(appActions.deleteWorkoutById(workoutId));
      toast.show(`Deleted ${workout.exerciseName}`, { type: "success" });
    }

    showConfirmationDialog(
      "Delete Item",
      "Do you want to continue?",
      onConfirm,
      () => {} // Trường hợp nhấn "No", không cần làm gì thêm
    );
  }
  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        <SearchBar
          navigation={navigation}
          placeholder="Search Workout"
          onSearch={handlerSearchValue}
        />
        <FlatList
          data={filteredWorkoutList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderWorkoutItem}
          style={styles.flatList}
          initialScrollIndex={0}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Spacing.BIG_70 * 3 }}
          ListHeaderComponentStyle={{ zIndex: 10 }}
          keyboardShouldPersistTaps="handled"
        />
        <ModalAddWorkout
          isVisible={isModalAddWorkoutVisible}
          onBackdropPress={setIsModalAddWorkoutVisible}
          workout={workout}
        />
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  flatList: {
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
  },
});
