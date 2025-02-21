import { Alert } from "react-native";
function alertNotification(heading, textBody) {
  Alert.alert(heading, textBody, [{ text: "Okay" }], {
    cancelable: false,
  });
}
function isValidNumber(text) {
  return /^-?\d+(,\d)?$|^-?\d+$/.test(text);
}
function convertToNumber(input) {
  return parseFloat(input.replace(/,/g, "."));
}
export { alertNotification, isValidNumber, convertToNumber };
