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

function formattedISODate(date) {
  return date.toISOString().split("T")[0];
}

function extractDate(dateTime) {
  return dateTime.split(" ")[0]; // Tách chuỗi theo khoảng trắng và lấy phần ngày
}

function extractTime(dateTime) {
  return dateTime.split(" ")[1]; // Tách chuỗi theo khoảng trắng và lấy phần ngày
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
export {
  formattedISODate,
  formatShortDate,
  calculateDatePerDay,
  getRelativeDate,
  extractDate,
  getLocalDate,
  getLocalTime,
  generateLocalDateAndTime,
  extractTime,
};
