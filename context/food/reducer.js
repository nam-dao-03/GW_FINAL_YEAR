import {
  SET_NAME_FOOD,
  SET_MEASUREMENT,
  SET_SERVING_SIZE,
  SET_UNIT,
  SET_AVERAGE_NUTRITIONAL,
  SET_CALORIES,
  SET_CARBS,
  SET_PROTEIN,
  SET_FAT,
  UPDATE_FOOD_STATE,
} from "./constants";
const initialState = {
  nameFood: "",
  measurement: "",
  servingSize: "",
  unit: "",
  averageNutritional: "",
  calories: "",
  carbs: "",
  protein: "",
  fat: "",
};

// const initialState = {
//   nameFood: "Kirin Latte",
//   measurement: "Bottle",
//   servingSize: "100",
//   unit: "ml",
//   averageNutritional: "100",
//   calories: "32",
//   carbs: "5.65",
//   protein: "0.76",
//   fat: "0.66",
// };

function reducer(state, action) {
  switch (action.type) {
    case SET_NAME_FOOD: {
      return { ...state, nameFood: action.payload };
    }
    case SET_MEASUREMENT: {
      return { ...state, measurement: action.payload };
    }
    case SET_SERVING_SIZE: {
      return { ...state, servingSize: action.payload };
    }
    case SET_UNIT: {
      return { ...state, unit: action.payload };
    }
    case SET_AVERAGE_NUTRITIONAL: {
      return { ...state, averageNutritional: action.payload };
    }
    case SET_CALORIES: {
      return { ...state, calories: action.payload };
    }
    case SET_CARBS: {
      return { ...state, carbs: action.payload };
    }
    case SET_PROTEIN: {
      return { ...state, protein: action.payload };
    }
    case SET_FAT: {
      return { ...state, fat: action.payload };
    }
    case UPDATE_FOOD_STATE: {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
}

export { initialState, reducer };
