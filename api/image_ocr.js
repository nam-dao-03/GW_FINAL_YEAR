import axios from "axios";
import FormData from "form-data";
const OCR_SPACE_API_KEY = "K84487483288957";

export const scanImageWithOCR = async (base64String, mimeType) => {
  try {
    // Tạo form data
    const formData = new FormData();
    // Thêm ảnh dạng base64 vào form
    // OCR.space API chấp nhận base64 không có prefix "data:image/...;base64,"
    // Nếu base64String đã có prefix, cần xóa nó trước khi gửi
    const base64WithoutPrefix = base64String.includes("base64,")
      ? base64String.split("base64,")[1]
      : base64String;

    formData.append(
      "base64Image",
      `data:${mimeType};base64,${base64WithoutPrefix}`
    );

    formData.append("language", "auto");
    formData.append("isOverlayRequired", "false");
    formData.append("isTable", "true");
    formData.append("OCREngine", "2");

    console.log(
      "Sending form data with first few chars of base64:",
      `data:${mimeType};base64,${base64WithoutPrefix}`.slice(0, 100)
    );

    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      formData,
      {
        headers: {
          apikey: OCR_SPACE_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const TextOverLay = response?.data?.ParsedResults?.[0]?.TextOverlay || null;
    // console.log("textOverLay:", textOverLay);
    // console.log("Full textOverLay:", JSON.stringify(textOverLay, null, 2));
    return { success: true, TextOverLay };
  } catch (error) {
    console.error("OCR Error:", error);
    return { success: false, error: error.message || error };
  }
};
