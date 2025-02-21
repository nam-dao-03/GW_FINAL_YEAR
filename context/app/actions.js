import { CREATE_MEAL, CREATE_USER } from "./constants";
import { createMeal } from "../../database/databaseHelper";

function createMealAction(db, meal, dispatch) {
  const action = {
    type: CREATE_MEAL,
    payload: meal,
  };
  dispatch(action);
  createMeal(db, meal);
}

export { createMealAction };
