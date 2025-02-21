import {
  SET_MINUTES_INPUT,
  SET_DAYS_INPUT,
  SET_GENDER_INPUT,
  SET_WEIGHT_INPUT,
  SET_HEIGHT_INPUT,
  SET_AGE_INPUT,
  SET_TARGET_INPUT,
  SET_TARGET_WEIGHT_INPUT,
  SET_TRAINING_INTENSITY_INPUT,
} from "./constants.js";

const initialValue = {
  minutes: "10",
  days: "7",
  gender: "male",
  height: "175",
  weight: "70",
  age: "17",
  target: "",
  targetWeight: "",
  trainingIntensity: "",
};

function reducer(state, action) {
  switch (action.type) {
    case SET_MINUTES_INPUT: {
      return {
        ...state,
        minutes: action.payload,
      };
    }
    case SET_DAYS_INPUT: {
      return {
        ...state,
        days: action.payload,
      };
    }
    case SET_GENDER_INPUT: {
      return {
        ...state,
        gender: action.payload,
      };
    }
    case SET_HEIGHT_INPUT: {
      return {
        ...state,
        height: action.payload,
      };
    }
    case SET_WEIGHT_INPUT: {
      return {
        ...state,
        weight: action.payload,
      };
    }
    case SET_AGE_INPUT: {
      return {
        ...state,
        age: action.payload,
      };
    }
    case SET_TARGET_INPUT: {
      return {
        ...state,
        target: action.payload,
      };
    }
    case SET_TARGET_WEIGHT_INPUT: {
      return {
        ...state,
        targetWeight: action.payload,
      };
    }
    case SET_TRAINING_INTENSITY_INPUT: {
      return {
        ...state,
        trainingIntensity: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export { initialValue, reducer };
