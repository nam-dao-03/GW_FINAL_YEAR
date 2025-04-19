import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../../utils/Colors";
import { StyleSheet, View } from "react-native";
import DashboardScreenNavigator from "./DashboardScreenNavigator/DashboardScreenNavigator";
import Typography from "../../utils/Typography";
import Sizes from "../../utils/Size";
import FavoriteScreenNavigator from "./FavoriteScreenNavigator/FavoriteScreenNavigator";
import { bottomTabStyle } from "../../utils/Common";
import { FloatingAction } from "react-native-floating-action";
import {
  MaterialIcons as MI,
  FontAwesome6 as FA6,
  MaterialCommunityIcons as MCI,
  Ionicons,
} from "@expo/vector-icons";
import Spacing from "../../utils/Spacing";
import useAppContext from "../../hooks/useAppContext";
import {
  BREAKFAST,
  DINNER,
  LUNCH,
  SNACK,
  WORKOUT,
} from "../../utils/constants";
import UserScreenNavigator from "./UserScreenNavigator/UserScreenNavigator";
const actions = [
  {
    text: "Breakfast",
    icon: <MCI name="coffee" size={Sizes.MD} color="white" />,
    name: BREAKFAST,
    position: 5,
    buttonSize: Sizes.XXL,
    textStyle: {
      fontSize: Typography.SM,
      color: "white",
      lineHeight: Typography.SM * 1.4,
      includeFontPadding: false,
    },
    textContainerStyle: {
      height: Sizes.MD,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    margin: Spacing.XXS,
    color: colors.softPeach,
    textBackground: colors.softPeach,
  },
  {
    text: LUNCH,
    icon: <FA6 name="pizza-slice" size={Sizes.MD} color="white" />,
    name: "Lunch",
    position: 4,
    buttonSize: Sizes.XXL,
    textStyle: {
      fontSize: Typography.SM,
      color: "white",
      lineHeight: Typography.SM * 1.4,
      includeFontPadding: false,
    },
    textContainerStyle: {
      height: Sizes.MD,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    margin: Spacing.XXS,
    color: colors.amber,
    textBackground: colors.amber,
  },
  {
    text: DINNER,
    icon: <MI name="lunch-dining" size={Sizes.MD} color="white" />,
    name: "Dinner",
    position: 3,
    buttonSize: Sizes.XXL,
    textStyle: {
      fontSize: Typography.SM,
      color: "white",
      lineHeight: Typography.SM * 1.4,
      includeFontPadding: false,
    },
    textContainerStyle: {
      height: Sizes.MD,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    margin: Spacing.XXS,
    color: colors.tertiaryColor,
    textBackground: colors.tertiaryColor,
  },
  {
    text: SNACK,
    icon: <MI name="fastfood" size={Sizes.MD} color="white" />,
    name: "Snack",
    position: 2,
    buttonSize: Sizes.XXL,
    textStyle: {
      fontSize: Typography.SM,
      color: "white",
      lineHeight: Typography.SM * 1.4,
      includeFontPadding: false,
    },
    textContainerStyle: {
      height: Sizes.MD,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    margin: Spacing.XXS,
    color: colors.violet,
    textBackground: colors.violet,
  },
  {
    text: WORKOUT,
    icon: <FA6 name="dumbbell" size={Sizes.MD} color="white" />,
    name: "Workout",
    position: 1,
    buttonSize: Sizes.XXL,
    textStyle: {
      fontSize: Typography.SM,
      color: "white",
      lineHeight: Typography.SM * 1.4,
      includeFontPadding: false,
    },
    textContainerStyle: {
      height: Sizes.MD,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    margin: Spacing.XXS,
    color: colors.brightBlue,
    textBackground: colors.brightBlue,
  },
];
const tabBarHeight = bottomTabStyle.tabBarStyle.height;
const BottomTab = createBottomTabNavigator();
export default function MainScreens({ navigation, route }) {
  const [state, dispatch] = useAppContext();
  const { showFAB } = state;
  return (
    <View style={styles.flex}>
      <BottomTab.Navigator
        initialRouteName="DashboardScreenNavigator"
        screenOptions={bottomTabStyle}
        id="MainScreensBottomTab"
      >
        <BottomTab.Screen
          name="DashboardScreenNavigator"
          component={DashboardScreenNavigator}
          options={{
            headerShown: false,
            tabBarLabel: "DashBoard",
            tabBarActiveTintColor: colors.primaryColor,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={Sizes.MD} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="FavoriteScreenNavigator"
          component={FavoriteScreenNavigator}
          options={{
            headerShown: false,
            tabBarLabel: "Favorite",
            tabBarActiveTintColor: colors.primaryColor,
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="heart" size={Sizes.MD} color={color} />
            ),
          }}
        />
        <BottomTab.Screen
          name="UserScreenNavigator"
          component={UserScreenNavigator}
          options={{
            headerShown: false,
            tabBarLabel: "Me",
            tabBarActiveTintColor: colors.primaryColor,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={Sizes.MD} color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>

      {/* FloatingAction Button */}
      <FloatingAction
        actions={actions}
        visible={showFAB}
        distanceToEdge={{
          vertical: tabBarHeight + Spacing.MD,
          horizontal: Spacing.XXL,
        }}
        iconWidth={Sizes.SM}
        iconHeight={Sizes.SM}
        color={colors.primaryColor}
        overlayColor="rgba(255, 255, 255, 0.49)"
        buttonSize={Sizes.XXL + Sizes.XS}
        onPressItem={(name) => {
          if (name === WORKOUT) {
            navigation.navigate("AddWorkoutNavigator", {
              screen: "WorkoutListScreen",
            });
            return;
          }
          navigation.navigate("AddFoodAndDishToMealScreenNavigator", {
            screen: "AddFoodAndDishToMealScreen",
            params: { mealName: name },
          });
        }}
        actionsPaddingTopBottom={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
