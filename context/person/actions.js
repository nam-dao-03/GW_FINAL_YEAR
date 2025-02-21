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

const changeMinutesInput = (payload, dispatch) => {
  const action = {
    type: SET_MINUTES_INPUT,
    payload,
  };
  dispatch(action);
};

const changeDaysInput = (payload, dispatch) => {
  const action = {
    type: SET_DAYS_INPUT,
    payload,
  };
  dispatch(action);
};

const changeGenderInput = (payload, dispatch) => {
  const action = {
    type: SET_GENDER_INPUT,
    payload,
  };
  dispatch(action);
};

const changeHeightInput = (payload, dispatch) => {
  const action = {
    type: SET_HEIGHT_INPUT,
    payload,
  };
  dispatch(action);
};

const changeWeightInput = (payload, dispatch) => {
  const action = {
    type: SET_WEIGHT_INPUT,
    payload,
  };
  dispatch(action);
};

const changeAgeInput = (payload, dispatch) => {
  const action = {
    type: SET_AGE_INPUT,
    payload,
  };
  dispatch(action);
};

const changeTargetInput = (payload, dispatch) => {
  const action = {
    type: SET_TARGET_INPUT,
    payload,
  };
  dispatch(action);
};

const changeTargetWeightInput = (payload, dispatch) => {
  const action = {
    type: SET_TARGET_WEIGHT_INPUT,
    payload,
  };
  dispatch(action);
};

const changeTrainingIntensityInput = (payload, dispatch) => {
  const action = {
    type: SET_TRAINING_INTENSITY_INPUT,
    payload,
  };
  dispatch(action);
};

export {
  changeMinutesInput,
  changeDaysInput,
  changeGenderInput,
  changeHeightInput,
  changeWeightInput,
  changeAgeInput,
  changeTargetInput,
  changeTargetWeightInput,
  changeTrainingIntensityInput,
};
