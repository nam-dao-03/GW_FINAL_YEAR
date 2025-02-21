import { StyleSheet, View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../utils/Colors";
export default function FavoriteItem() {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <Text style={styles.favoriteHeading}>Ga Luoc</Text>
        <Text style={styles.favoriteDescription}>1 khau phan an - 1 calo</Text>
      </View>
      <View style={styles.itemRight}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.favoriteIcon, { opacity: 0.5 }]
              : [styles.favoriteIcon]
          }
        >
          <Ionicons name="add" size={24} color="black" />
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.favoriteIcon, { opacity: 0.5 }]
              : [styles.favoriteIcon]
          }
        >
          <Ionicons name="close-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.whiteColor,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  itemLeft: {
    gap: 5,
  },
  favoriteHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textColor,
  },
  favoriteDescription: {
    fontSize: 16,
    color: colors.descriptionTextColor,
  },
  itemRight: {
    flexDirection: "row",
    gap: 16,
  },
  favoriteIcon: {
    backgroundColor: colors.backgroundColorScreen,
    padding: 5,
    borderRadius: "50%",
  },
});
