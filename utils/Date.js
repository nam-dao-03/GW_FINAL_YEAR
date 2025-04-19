function getLocalDate() {
  return new Date()
    .toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1");
}

function getLocalTime() {
  return new Date().toLocaleTimeString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Để hiển thị 24h thay vì AM/PM
  });
}

function generateLocalDateAndTime() {
  const localDate = getLocalDate();
  const localTime = getLocalTime();
  const localDateAndTime = `${localDate} ${localTime}`;
  return localDateAndTime;
}

function formatDateToLocalVN(date) {
  // Lấy phần ngày (định dạng dd/mm/yyyy và chuyển thành yyyy-mm-dd)
  const datePart = date
    .toLocaleDateString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1");

  // Lấy phần giờ (định dạng HH:MM:SS 24h)
  const timePart = date.toLocaleTimeString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Kết hợp lại thành chuỗi yyyy-mm-dd HH:MM:SS
  return `${datePart} ${timePart}`;
}

function formatTimeToLocalVN(date) {
  // Lấy phần giờ (định dạng HH:MM:SS 24h)
  const timePart = date.toLocaleTimeString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return timePart;
}

function formattedISODate(date) {
  return date.toISOString().split("T")[0];
}

function extractDate(dateTime) {
  return dateTime.split(" ")[0];
}

function extractTime(dateTime) {
  const timePart = dateTime.split(" ")[1];

  const timeWithoutSeconds = timePart.split(":").slice(0, 2).join(":");

  return timeWithoutSeconds;
}

function removeSeconds(timeString) {
  // timeString có định dạng "HH:mm:ss"
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
}

function formatShortDate(dateString) {
  // Tạo đối tượng Date từ chuỗi
  const date = new Date(dateString);

  // Kiểm tra xem date có hợp lệ không
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string. Please use the format 'YYYY-MM-DD'.");
  }

  // Lấy ngày, tháng và năm
  const day = date.getDate(); // Lấy ngày (23)
  const month = date.toLocaleString("default", { month: "short" }); // Lấy tháng (Feb)
  const year = date.getFullYear(); // Lấy năm (2025)

  // Định dạng lại chuỗi ngày
  return `${day} ${month} ${year}`;
}

function calculateDatePerDay(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function getRelativeDate(dateInput) {
  const inputDate = new Date(dateInput);
  const today = new Date();

  // Đặt giờ, phút, giây, và mili giây về 0 để chỉ so sánh ngày
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  // Tính khoảng cách số ngày giữa hai ngày
  const diffTime = inputDate - today;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Trả về kết quả phù hợp
  if (diffDays === 0) return "Today";
  if (diffDays === -1) return "Yesterday";
  if (diffDays === 1) return "1 day after";
  if (diffDays > 1) return `${diffDays} days after`;
  return `${Math.abs(diffDays)} days before`;
}

const getHour = (time) => {
  const [hourStr] = time.split(":");
  return Number(hourStr); // => 20
};

const getMinute = (time) => {
  const [, minuteStr] = time.split(":");
  return Number(minuteStr); // => 12
};
function getWeekdayFromDate(dateStr) {
  // Chuyển "2020:12:12" thành "2020-12-12"
  const formattedStr = dateStr.replace(/:/g, "-");
  const date = new Date(formattedStr);

  // Lấy tên thứ (Monday, Tuesday, ...)
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function getWeekRange(date) {
  const today = new Date(date);

  // Lấy ngày đầu tuần (Chủ Nhật)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  // Lấy ngày cuối tuần (Thứ Bảy)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return { startOfWeek, endOfWeek };
}
function formatToMonthDay(date) {
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function formatToMonthDayYear(date) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export {
  formattedISODate,
  formatShortDate,
  calculateDatePerDay,
  getRelativeDate,
  extractDate,
  getLocalDate,
  getLocalTime,
  generateLocalDateAndTime,
  formatDateToLocalVN,
  extractTime,
  formatTimeToLocalVN,
  removeSeconds,
  getHour,
  getMinute,
  getWeekdayFromDate,
  getWeekRange,
  formatToMonthDay,
  formatToMonthDayYear,
};
