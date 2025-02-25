import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import Modal from "react-native-modal";
import DateTimePicker, { getDefaultStyles } from "react-native-ui-datepicker";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import colors from "../utils/Colors";
import { useState } from "react";
import { alertNotification } from "../utils/Common";
const components = {
  IconPrev: (
    <FontAwesome6 name="angle-left" size={16} color={colors.primaryColor} />
  ),
  IconNext: (
    <FontAwesome6 name="angle-right" size={16} color={colors.primaryColor} />
  ),
};
export default function ModalCalendar({
  modalVisible,
  onCloseCalendar,
  onSelectDate,
}) {
  const [selectedDate, setSelectedDate] = useState();
  const defaultStyles = getDefaultStyles();

  function handleConfirm() {
    if (!selectedDate) {
      alertNotification("Choose one day", "Choose one day or close");
      return;
    }
    // Tạo date mới với timezone local
    const localDate = new Date(
      selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
    );
    onSelectDate(localDate);
    onCloseCalendar();
  }
  return (
    <Modal
      isVisible={modalVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={onCloseCalendar}
      useNativeDriver={true} // Tăng hiệu suất animation
      hideModalContentWhileAnimating={true} // Ẩn nội dung khi animation
      backdropTransitionOutTiming={0} // Giảm giật khi đóng
    >
      <View style={styles.modalContainer}>
        <View style={styles.dateTimePickerContainer}>
          <DateTimePicker
            timeZone="Asia/Bangkok"
            mode="single"
            showOutsideDays={true}
            styles={{ ...defaultStyles, ...styles.dateTimePicker }}
            weekdaysHeight={50}
            navigationPosition="right"
            date={selectedDate}
            onChange={({ date }) => {
              setSelectedDate(date);
            }}
            components={components}
          />
          <View style={styles.ctaContainer}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [
                      { opacity: 0.5 },
                      styles.btnContainer,
                      { backgroundColor: colors.shadowColor },
                    ]
                  : [
                      styles.btnContainer,
                      { backgroundColor: colors.shadowColor },
                    ]
              }
              onPress={onCloseCalendar}
            >
              <Text style={styles.btnContent}>Close</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [
                      { opacity: 0.5 },
                      styles.btnContainer,
                      { backgroundColor: colors.secondaryColor },
                    ]
                  : [
                      styles.btnContainer,
                      { backgroundColor: colors.secondaryColor },
                    ]
              }
              onPress={handleConfirm}
            >
              <Text style={styles.btnContent}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
  },
  dateTimePickerContainer: {
    height: "68%",
    padding: 20,
    backgroundColor: colors.whiteColor,
    borderRadius: 10,
    elevation: 5, // Đổ bóng cho Android
    shadowColor: "#000", // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dateTimePicker: {
    today: { borderColor: colors.primaryColor, borderWidth: 2 },
    selected: { backgroundColor: colors.primaryColor },
    selected_label: { color: "white" },
    header: {
      borderBottomWidth: 1,
      paddingBottom: 10,
      borderColor: colors.shadowColor,
    },
    button_prev: {
      backgroundColor: "#FFF",
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    button_next: {
      backgroundColor: "#FFF",
      paddingHorizontal: 12,
      paddingVertical: 9,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    month_selector_label: {
      fontWeight: "bold",
      fontSize: 20,
    },
    year_selector_label: {
      fontWeight: "bold",
      fontSize: 20,
    },
    selected_month: {
      backgroundColor: colors.primaryColor,
    },
    selected_year: {
      backgroundColor: colors.primaryColor,
    },
  },
  ctaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btnContainer: {
    width: "40%",
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  btnContent: {
    fontSize: 16,
    color: colors.whiteColor,
    fontWeight: "bold",
  },
});
