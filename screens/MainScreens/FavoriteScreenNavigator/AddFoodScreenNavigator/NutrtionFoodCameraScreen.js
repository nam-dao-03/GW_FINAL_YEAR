import { useFocusEffect } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback } from "react";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderNavigation from "../../../../components/shared/HeaderNavigation";
import Sizes from "../../../../utils/Size";
import Spacing from "../../../../utils/Spacing";
import Typography from "../../../../utils/Typography";
import colors from "../../../../utils/Colors";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import ImageEditor from "@react-native-community/image-editor";
import LoadingScreenOverlay from "../../../../components/shared/LoadingScreenOverLay";
export default function NutritionFoodCameraScreen({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState();
  const [flash, setFlash] = useState("off");
  const [isLoading, setIsLoading] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  // Cập nhật header khi flash thay đổi hoặc màn hình được focus
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title="Nutrition Food Camera"
            iconRight={
              <Ionicons
                name={flash === "on" ? "flash" : "flash-off"}
                size={Sizes.MD}
                color={colors.whiteColor}
              />
            }
            actionRight={handleToggleFlash}
          />
        ),
      });
    }, [flash])
  );

  // Kiểm tra và yêu cầu quyền camera
  useFocusEffect(
    useCallback(() => {
      const checkAndRequestPermission = async () => {
        if (!permission) return;

        if (!permission.granted && permission.canAskAgain) {
          const result = await requestPermission();
          if (!result.granted) {
            navigation.goBack();
          }
        } else if (!permission.granted && !permission.canAskAgain) {
          Alert.alert(
            "Camera permission needed",
            "Please enable camera access in Settings to continue.",
            [
              {
                text: "Cancel",
                onPress: () => navigation.goBack(),
                style: "cancel",
              },
              {
                text: "Open Settings",
                onPress: () => {
                  Linking.openSettings();
                  navigation.goBack();
                },
              },
            ]
          );
        }
      };

      checkAndRequestPermission();
    }, [permission])
  );

  if (!permission || !permission.granted) {
    return <View />;
  }

  function handleToggleFlash() {
    setFlash((current) => (current === "on" ? "off" : "on"));
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    setIsLoading(true);
    if (cameraRef) {
      //   const photoData = await cameraRef.takePictureAsync({ base64: true });
      const photoData = await cameraRef.takePictureAsync();

      setImage(photoData);
      const croppedImage = await cropImage(
        photoData.uri,
        photoData.width,
        photoData.height
      );
      navigation.popTo("NutritionFoodImagePickerScreen", {
        uri: croppedImage.uri,
        base64: croppedImage.base64,
        mimeType: croppedImage.type,
      });
      setIsLoading(false);
    }
  }
  async function cropImage(uri, originalWidth, originalHeight) {
    try {
      const { width: screenWidth, height: screenHeight } =
        Dimensions.get("window");

      // Kích thước và vị trí của imageContainer (dựa theo style bạn định nghĩa)
      const containerHeight = Sizes.MASSIVE * 2.3;
      const containerWidth = (containerHeight / 10) * 16;
      const containerX = (screenWidth - containerWidth) / 2 - Spacing.XS;
      const containerY = Spacing.BIG_70 * 1.3 + Spacing.XXS; // lấy theo overlayContainer

      // Kích thước hiển thị của camera view trên màn hình (dựa theo style camera)
      const cameraViewHeight = screenHeight + Spacing.BIG_50 * 1.3;
      const cameraViewWidth = screenWidth;

      // Tính tỷ lệ scale so với ảnh gốc
      const scaleX = originalWidth / cameraViewWidth;
      const scaleY = originalHeight / cameraViewHeight;

      // Ánh xạ toạ độ UI sang tọa độ ảnh gốc
      const cropOffsetX = Math.round(containerX * scaleX);
      const cropOffsetY = Math.round(containerY * scaleY);
      const cropWidth = Math.round(containerWidth * scaleX);
      const cropHeight = Math.round(containerHeight * scaleY);

      const cropData = {
        offset: { x: cropOffsetX, y: cropOffsetY },
        size: { width: cropWidth, height: cropHeight },
        displaySize: {
          width: Math.round(containerWidth),
          height: Math.round(containerHeight),
        },
        resizeMode: "cover",
        includeBase64: true,
      };

      const result = await ImageEditor.cropImage(uri, cropData);

      return {
        uri: result.uri || result,
        base64: result.base64 || null,
        width: cropWidth,
        height: cropHeight,
        type: result.type,
      };
    } catch (error) {
      console.error("Lỗi khi cắt ảnh:", error);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
      {isLoading && <LoadingScreenOverlay />}
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(ref) => setCameraRef(ref)}
        flash={flash}
        ratio="16:9"
      />
      <View style={styles.overlayContainer}>
        <View style={styles.imageContainer}>
          <Text style={{ color: "#ccc", fontSize: Typography.XXS }}>
            Place Nutrition Facts here
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <FontAwesome6
            name="camera-rotate"
            size={Sizes.SM}
            color={colors.whiteColor}
          />
          <Text style={styles.text}>Flip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <FontAwesome6
            name="camera"
            size={Sizes.SM}
            color={colors.whiteColor}
          />
          <Text style={styles.text}>Shoot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    position: "relative",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + Spacing.BIG_50 * 1.3,
  },
  buttonContainer: {
    position: "absolute",
    bottom: Spacing.LG,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: Spacing.MD,
  },

  button: {
    width: Sizes.XXXL,
    height: Sizes.XXXL,
    borderRadius: Spacing.BIG_70,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: Typography.XXS,
    fontWeight: "600",
    color: "white",
    marginTop: Sizes.XXS,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    marginTop: Spacing.BIG_40,
    alignItems: "center",
  },
  imageContainer: {
    height: Sizes.MASSIVE * 2.3,
    width: ((Sizes.MASSIVE * 2.3) / 10) * 16,
    borderRadius: Spacing.MD,
    borderWidth: Sizes.XXXS,
    borderColor: "#000",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(250, 250, 250, 0.1)",
    marginTop: 0,
    opacity: 1,
  },
});
