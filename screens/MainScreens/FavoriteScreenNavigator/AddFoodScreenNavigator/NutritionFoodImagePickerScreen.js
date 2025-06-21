import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import HeaderNavigation from "../../../../components/shared/HeaderNavigation";
import KeyboardAvoidingWrapper from "../../../../components/shared/KeyboardAvoidingWrapper";
import colors from "../../../../utils/Colors";
import Spacing from "../../../../utils/Spacing";
import Sizes from "../../../../utils/Size";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Typography from "../../../../utils/Typography";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useToast } from "react-native-toast-notifications";
import LoadingScreenOverlay from "../../../../components/shared/LoadingScreenOverLay";
import { scanImageWithOCR } from "../../../../api/image_ocr";
import {
  cleanNutritionValues,
  hasValidNutritionData,
  processNutritionLabel,
} from "../../../../utils/OCRImage";
import useFoodContext from "../../../../hooks/useFoodContext";
import { foodActions } from "../../../../context/food";
import * as Network from "expo-network";
export default function NutritionFoodImagePickerScreen({ navigation, route }) {
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        header: () => (
          <HeaderNavigation
            title="Nutrition Food Image Picker"
            iconRight={
              <Ionicons
                name="camera-outline"
                size={Sizes.MD}
                color={colors.whiteColor}
              />
            }
            actionRight={handleOpenCamera}
          />
        ),
      });
    }, [navigation, route])
  );
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState(null); // MB
  const [base64String, setBase64String] = useState(""); // For OCR later
  const [mimeType, setMimeType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [foodState, foodDispatch] = useFoodContext();
  const networkState = Network.useNetworkState();
  const toast = useToast();
  useEffect(() => {
    if (!route.params) return;
    setImage(route.params.uri);
    setImageSize(calSizeInMB(route.params.base64));
    setBase64String(route.params.base64);
    setMimeType(route.params.mimeType);
  }, [route]);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 10],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const mimeType = result.assets[0].mimeType;
      setMimeType(mimeType);
      setImage(uri);
      try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: "base64",
        });
        setBase64String(base64);
        const sizeInMB = calSizeInMB(base64);
        setImageSize(sizeInMB);
      } catch (error) {
        console.error("error base64:", error);
      }
    }
  };
  function calSizeInMB(base64) {
    if (!base64) return;
    return ((base64.length * 3) / 4 / (1024 * 1024)).toFixed(3);
  }
  function handleOpenCamera() {
    navigation.navigate("NutritionFoodCameraScreen");
  }

  async function scanNutritionImage() {
    if (!networkState.isConnected) {
      toast.show("Please check your internet connection", {
        type: "danger",
      });
      return;
    }
    if (!image || !base64String) {
      toast.show("Please pick an image first.", {
        type: "danger",
      });
      return;
    }

    if (imageSize > 0.9) {
      toast.show("Please pick an image less than 900KB", {
        type: "danger",
      });
      return;
    }
    setIsLoading(true);
    const data = await scanImageWithOCR(base64String, mimeType);
    const nutritionFacts = processNutritionLabel(data.TextOverLay.Lines);
    if (!hasValidNutritionData(nutritionFacts)) {
      toast.show("Invalid Nutrition Data Image", {
        type: "danger",
      });
      setIsLoading(false);
      return;
    }
    const { calories, protein, totalCarbohydrate, totalFat } =
      cleanNutritionValues(nutritionFacts);

    console.log("nutritionFacts>>>>>", {
      calories,
      protein,
      totalCarbohydrate,
      totalFat,
    });
    setIsLoading(false);
    foodDispatch(foodActions.changeCaloriesInput(calories));
    foodDispatch(foodActions.changeProteinInput(protein));
    foodDispatch(foodActions.changeCarbsInput(totalCarbohydrate));
    foodDispatch(foodActions.changeFatInput(totalFat));
    navigation.popTo("AddNutritionFoodScreen");
  }

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={styles.flex}>
        {isLoading && <LoadingScreenOverlay />}
        <ScrollView style={styles.screen}>
          {image ? (
            <>
              <Image source={{ uri: image }} style={styles.imageContainer} />
              <View style={styles.imageInfoContainer}>
                <MaterialCommunityIcons
                  name="file-document-outline"
                  size={Sizes.MD}
                  color={colors.primaryColor}
                />
                <Text style={styles.imageSizeText}>Size: {imageSize} MB</Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyImageContainer}>
              <MaterialCommunityIcons
                name="image-off"
                size={Sizes.MASSIVE}
                color="#999"
              />
              <Text style={styles.emptyText}>No image selected</Text>
            </View>
          )}
          <View style={styles.imageCta}>
            <Pressable
              style={({ pressed }) =>
                pressed
                  ? [{ opacity: 0.5 }, styles.buttonPickerImage]
                  : [styles.buttonPickerImage]
              }
              onPress={pickImage}
            >
              <Text style={styles.buttonPickerImageText}>Pick an image</Text>
            </Pressable>
          </View>
        </ScrollView>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [{ opacity: 0.5 }, styles.button, {}]
              : [
                  styles.button,
                  isLoading && { backgroundColor: colors.shadowColor },
                ]
          }
          onPress={scanNutritionImage}
        >
          <Text style={styles.buttonText}>Scan Nutrition Image</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundColorScreen,
    paddingHorizontal: Spacing.SM,
  },
  imageContainer: {
    height: Sizes.MASSIVE * 2.5,
    borderRadius: Spacing.MD,
    borderWidth: Sizes.XXXS,
    borderColor: colors.shadowColor,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    marginTop: Spacing.LG,
  },
  emptyImageContainer: {
    height: Sizes.MASSIVE * 2,
    borderRadius: Spacing.MD,
    borderWidth: Sizes.XXXS,
    borderColor: colors.shadowColor,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    marginTop: Spacing.LG,
  },
  emptyText: {
    fontSize: Typography.MD,
    color: "#999",
    fontStyle: "italic",
  },
  imageCta: {
    paddingHorizontal: Spacing.SM,
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.SM,
    justifyContent: "center",
  },
  buttonPickerImage: {
    backgroundColor: colors.primaryColor,
    paddingVertical: Spacing.SM,
    paddingHorizontal: Spacing.SM,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Spacing.MD,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPickerImageText: {
    color: colors.whiteColor,
    fontSize: Typography.SM,
    fontWeight: "500",
  },
  imageInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.XS,
    marginTop: Spacing.SM,
    marginHorizontal: Spacing.SM,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: Spacing.SM,
    backgroundColor: "#f9f9f9",
  },
  imageSizeText: {
    fontSize: Typography.SM,
    color: colors.textColor,
    marginLeft: Spacing.XS,
    fontWeight: "500",
  },
  button: {
    backgroundColor: colors.secondaryColor,
    paddingVertical: Spacing.MD,
    width: Sizes.MASSIVE * 3.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Spacing.MD,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }],
    bottom: Spacing.XXL,
  },
  buttonText: {
    color: colors.whiteColor,
    fontSize: Typography.MD,
    fontWeight: "500",
  },
});
