import {
  SET_MINUTES_INPUT,
  SET_DAYS_INPUT,
  SET_GENDER_INPUT,
  SET_WEIGHT_INPUT,
  SET_HEIGHT_INPUT,
  SET_AGE_INPUT,
  SET_TARGET_INPUT,
  SET_TARGET_WEIGHT_INPUT,
} from "./constants.js";

const changeMinutesInput = (payload) => {
  return {
    type: SET_MINUTES_INPUT,
    payload,
  };
};

const changeDaysInput = (payload) => {
  return {
    type: SET_DAYS_INPUT,
    payload,
  };
};

const changeGenderInput = (payload) => {
  return {
    type: SET_GENDER_INPUT,
    payload,
  };
};

const changeHeightInput = (payload) => {
  return {
    type: SET_HEIGHT_INPUT,
    payload,
  };
};

const changeWeightInput = (payload) => {
  return {
    type: SET_WEIGHT_INPUT,
    payload,
  };
};

const changeAgeInput = (payload) => {
  return {
    type: SET_AGE_INPUT,
    payload,
  };
};

const changeTargetInput = (payload) => {
  return {
    type: SET_TARGET_INPUT,
    payload,
  };
};

const changeTargetWeightInput = (payload) => {
  return {
    type: SET_TARGET_WEIGHT_INPUT,
    payload,
  };
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
};
