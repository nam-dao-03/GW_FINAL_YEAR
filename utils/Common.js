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

function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export {
  alertNotification,
  isValidNumber,
  convertToNumber,
  generateRandomString,
};
