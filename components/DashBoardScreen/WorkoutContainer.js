import { useToast } from "react-native-toast-notifications";
import { appActions } from "../../context/app";
import useAppContext from "../../hooks/useAppContext";
import { getLocalDate } from "../../utils/Date";
import Spacing from "../../utils/Spacing";
import WorkoutItem from "../WorkoutListScreen/WorkoutItem";
import HeadingContainer from "./HeadingContainer";
import { showConfirmationDialog } from "../../utils/Common";

export default function WorkoutContainer({ onPressWorkoutItem }) {
  const [state, dispatch] = useAppContext();
  const { workoutList } = state;
  const workoutListToday = workoutList.filter(
    (item) => item.workoutDate === getLocalDate()
  );
  const toast = useToast();
  const totalCalories = workoutListToday.reduce(
    (sum, workout) => sum + workout.calories,
    0
  );
  function handleDeleteItem(workout) {
    function onConfirm() {
      const workoutId = workout.workoutId;
      dispatch(appActions.deleteWorkoutById(workoutId));
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
    <>
      {workoutListToday.length === 0 ? null : (
        <>
          <HeadingContainer
            title="Workout"
            style={{ marginTop: Spacing.SM }}
            disableLink={true}
            consumedValue={`${totalCalories} kcal`}
          />
          {workoutListToday.map((item, index) => {
            return (
              <WorkoutItem
                key={index}
                workout={item}
                icon="close-outline"
                onActionItem={handleDeleteItem}
                onPressItem={onPressWorkoutItem}
              />
            );
          })}
        </>
      )}
    </>
  );
}
