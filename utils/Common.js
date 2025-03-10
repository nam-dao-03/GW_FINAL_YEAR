import { Alert } from "react-native";
function alertNotification(heading, textBody) {
  Alert.alert(heading, textBody, [{ text: "Okay" }], {
    cancelable: false,
  });
}

function showConfirmationDialog(
  title,
  message,
  onConfirm = () => {},
  onCancel = () => {}
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: "No",
        onPress: onCancel,
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: onConfirm,
        style: "destructive",
      },
    ],
    { cancelable: true }
  );
}

function isValidNumber(text) {
  return /^-?\d+([.,]\d+)?$/.test(text);
}

function convertToNumber(input) {
  if (typeof input !== "string") return NaN;

  // Thay tất cả dấu ',' và '.' thành '.'
  const normalizedInput = input.replace(/[,\.]/g, ".");

  return parseFloat(normalizedInput);
}
function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export {
  alertNotification,
  isValidNumber,
  convertToNumber,
  generateRandomString,
  showConfirmationDialog,
};
