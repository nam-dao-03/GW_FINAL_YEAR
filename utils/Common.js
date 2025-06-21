import { Alert } from "react-native";
import Sizes from "./Size";
import Typography from "./Typography";
import uuid from "react-native-uuid";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
const bottomTabStyle = {
  tabBarLabelPosition: "below-icon",
  tabBarLabelStyle: { fontSize: Typography.XS },
  tabBarIconStyle: { width: Sizes.MD, height: Sizes.MD },
  tabBarStyle: {
    height: Sizes.XXL, // Tăng chiều cao
    display: "flex", // Hiển thị lại Bottom Tab
  },
};

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
  if (typeof input === "number" && !isNaN(input)) {
    return parseFloat(input.toFixed(2)); // Giữ số, làm tròn về 2 chữ số thập phân
  }

  if (typeof input !== "string") return NaN;

  // Chuẩn hóa dấu phân tách
  const normalizedInput = input.replace(/[,\.]/g, ".");

  const numberValue = parseFloat(normalizedInput);

  return isNaN(numberValue) ? NaN : parseFloat(numberValue.toFixed(2));
}
function generateRandomString() {
  // const characters =
  //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // let result = "";
  // for (let i = 0; i < 8; i++) {
  //   result += characters.charAt(Math.floor(Math.random() * characters.length));
  // }
  // return result;
  return uuid.v4();
}

function calTotalCupsArr(
  waterIntakeVolume,
  waterPerCupDefault,
  cupDrunkListToday
) {
  // Lượng nước còn lại cần uống
  const cupDrunkNum = cupDrunkListToday.length;
  const waterIntakeRemaining =
    waterIntakeVolume -
    cupDrunkListToday.reduce(
      (consumed, cupDrunk) => consumed + cupDrunk.getWaterPerCup(),
      0
    );

  // Số cốc còn lại cần uống
  const cupsNumRemaining = Math.max(
    Math.ceil(waterIntakeRemaining / waterPerCupDefault),
    0
  );

  // Tạo mảng tổng số cốc hiển thị
  const totalCupsArr = Array(cupDrunkNum + cupsNumRemaining).fill(null);
  return totalCupsArr;
}

export default function AppIcon({ type, name, size, color }) {
  switch (type) {
    case "FA6":
      return <FontAwesome6 name={name} size={size} color={color} />;
    case "Ionicons":
      return <Ionicons name={name} size={size} color={color} />;
    case "MaterialIcons":
      return <MaterialIcons name={name} size={size} color={color} />;
    // thêm các case khác nếu cần
    default:
      return null;
  }
}

export {
  bottomTabStyle,
  alertNotification,
  isValidNumber,
  convertToNumber,
  generateRandomString,
  showConfirmationDialog,
  calTotalCupsArr,
  AppIcon,
};
