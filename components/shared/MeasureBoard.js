import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import Spacing from "../../utils/Spacing";
import colors from "../../utils/Colors";
import Sizes from "../../utils/Size";
import Typography from "../../utils/Typography";
import PressableIcon from "./PressableIcon";
import {
  MaterialCommunityIcons as MCI,
  Ionicons,
  FontAwesome5 as FA5,
} from "@expo/vector-icons";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useEffect, useState } from "react";
import {
  formatDateToLocalVN,
  formattedISODate,
  formatToMonthDay,
  formatToMonthDayYear,
  getLocalDate,
  getTodayUTC0,
  getWeekdayFromDate,
  getWeekRange,
} from "../../utils/Date";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import useAppContext from "../../hooks/useAppContext";
import { convertToNumber } from "../../utils/Common";
import { MEASURE_TYPE } from "../../utils/constants";
import ModalUpdateMeasure from "./ModalUpdateMeasure";
const measureTypeOptions = [MEASURE_TYPE.WEIGHT, MEASURE_TYPE.HEIGHT];
export default function MeasureBoard({ style = {} }) {
  const [measureType, setMeasureType] = useState(MEASURE_TYPE.WEIGHT);
  const [isModalUpdateMeasure, setIsModalUpdateMeasure] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [currentDate, setCurrentDate] = useState(getLocalDate());
  const [currentStartDate, setCurrentStartDate] = useState(getLocalDate());
  const [currentEndDate, setCurrentEndDate] = useState(getLocalDate());
  const [appState, appDispatch] = useAppContext();
  const { dailyNutritionList } = appState;
  const dailyNutrition = dailyNutritionList.find(
    (item) => item.getDate() === getLocalDate()
  );
  const minValue =
    chartData.length === 0
      ? 0
      : Math.min(...chartData.map((item) => item.value));
  useEffect(() => {
    const { startOfWeek, endOfWeek } = getWeekRange(currentDate);
    setCurrentEndDate(formattedISODate(endOfWeek));
    setCurrentStartDate(formattedISODate(startOfWeek));
    const chartData = getChartData(
      startOfWeek,
      endOfWeek,
      measureType,
      dailyNutritionList
    );
    console.log("chartData", chartData);
    setChartData(chartData);
  }, [currentDate, measureType, dailyNutrition]);

  function getChartData(startDate, endDate, measureType, data) {
    const filteredData = data
      .filter((item) => {
        const date = new Date(item.dateDailyNutrition);
        return date >= startDate && date <= endDate;
      })
      .sort(
        (a, b) =>
          new Date(a.dateDailyNutrition) - new Date(b.dateDailyNutrition)
      );

    const chartData = filteredData.map((item, index) => {
      const position =
        index === 0
          ? "left"
          : index === filteredData.length - 1
          ? "right"
          : index === filteredData.length - 2
          ? "middle-right"
          : "middle";

      return {
        date: item.dateDailyNutrition,
        value:
          measureType === MEASURE_TYPE.WEIGHT
            ? convertToNumber(item.weight)
            : convertToNumber(item.height),
        label: getWeekdayFromDate(item.dateDailyNutrition),
        position,
      };
    });
    return chartData;
  }

  function handlePreWeek() {
    const date = new Date(currentDate);
    const sevenDayAgo = formattedISODate(
      new Date(date.setDate(date.getDate() - 7))
    );
    setCurrentDate(sevenDayAgo);
  }
  function handleNextWeek() {
    const date = new Date(currentDate);
    const sevenDayNext = formattedISODate(
      new Date(date.setDate(date.getDate() + 7))
    );
    setCurrentDate(sevenDayNext);
  }

  function handleOpenCalendarModal() {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "date",
      is24Hour: true,
      display: "calendar",
      onChange: onChange,
    });
    function onChange(event, selectedTime) {
      if (event.type === "dismissed") return;
      setCurrentDate(formattedISODate(selectedTime));
    }
  }

  function handleActiveModalUpdateMeasure() {
    setIsModalUpdateMeasure(true);
  }

  const colorAreaChart =
    measureType === MEASURE_TYPE.WEIGHT
      ? colors.primaryColor
      : colors.waterColor;
  return (
    <View style={[styles.board, style]}>
      <View style={styles.headingChart}>
        <View>
          <Text style={styles.weekTitle}>
            {formatToMonthDay(new Date(currentStartDate))} -{" "}
            {formatToMonthDay(new Date(currentEndDate))}
          </Text>
          <Text style={[styles.title, { color: colorAreaChart }]}>
            {measureType === MEASURE_TYPE.WEIGHT
              ? "Weight Board (Kg)"
              : "Height Board (cm)"}
          </Text>
        </View>
        <View style={styles.headingChartRight}>
          <PressableIcon onPress={handleActiveModalUpdateMeasure}>
            <FA5 name="edit" size={Sizes.SM * 1.3} color={colorAreaChart} />
          </PressableIcon>
          <PressableIcon onPress={handleOpenCalendarModal}>
            <Ionicons
              name="calendar-outline"
              size={Sizes.MD}
              color={colorAreaChart}
            />
          </PressableIcon>
        </View>
      </View>
      {chartData.length === 0 ? (
        <View style={styles.emptySection}>
          <MCI
            name="calendar-alert"
            size={Sizes.HUGE}
            color={colorAreaChart}
            style={{ opacity: 0.7 }}
          />
          <Text style={[styles.emptySectionText, { color: colorAreaChart }]}>
            No data for this week
          </Text>
        </View>
      ) : (
        <LineChart
          areaChart
          data={chartData}
          isAnimated
          curved
          rulesColor="#aaa"
          dashGap={3}
          dashWidth={3}
          startFillColor={colorAreaChart}
          startOpacity={0.7}
          endFillColor={colorAreaChart}
          endOpacity={0.2}
          color={colorAreaChart}
          height={Sizes.MASSIVE * 1.5}
          initialSpacing={5}
          endSpacing={0}
          yAxisLabelContainerStyle={{ marginLeft: Spacing.XXS }}
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisLabelWidth={Sizes.MD}
          dataPointsColor={colors.tertiaryColor}
          yAxisTextStyle={{
            fontSize: Typography.XS,
            color: colors.textColor,
          }}
          xAxisLabelTextStyle={{
            fontSize: Typography.XS,
            color: colors.textColor,
          }}
          // spacing={35}
          width={Sizes.MASSIVE * 3.1}
          adjustToWidth={true}
          noOfSections={3}
          yAxisOffset={
            measureType === MEASURE_TYPE.WEIGHT ? minValue - 4 : minValue - 2
          }
          disableScroll={true}
          focusEnabled={true}
          pointerConfig={{
            pointerStripHeight: 100,
            pointerStripColor: colorAreaChart,
            pointerStripWidth: 2,
            pointerColor: "transparent",
            radius: 6,
            pointerLabelComponent: (items) => {
              const item = items[0];
              if (!item) return null;

              const tooltipWidth = Sizes.MASSIVE;
              let translateX = 0;
              let translateY = 0;
              if (item.position === "left") {
                translateX = 0; // đẩy sang trái nếu ở gần mép phải
              } else if (item.position === "right") {
                translateX = -tooltipWidth + Spacing.LG; // đẩy sang phải nếu ở gần mép trái
              } else if (item.position === "middle-right") {
                translateX = -Spacing.XXL;
              }
              return (
                <View
                  style={{
                    width: tooltipWidth,
                    backgroundColor: colorAreaChart,
                    borderRadius: 8,
                    padding: Spacing.XS,
                    position: "absolute",
                    transform: [{ translateX }, { translateY }],
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 10, // Android
                    zIndex: 100,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: Typography.SM,
                      fontWeight: "bold",
                      marginBottom: 4,
                    }}
                  >
                    {items[0]?.value}{" "}
                    {measureType === MEASURE_TYPE.WEIGHT ? "kg" : "cm"}
                  </Text>
                  <Text
                    style={{
                      color: "#eee",
                      fontSize: Typography.REGULAR,
                    }}
                  >
                    {formatToMonthDayYear(new Date(items[0]?.date))}
                  </Text>
                </View>
              );
            },
          }}
        />
      )}
      <View style={styles.chartCta}>
        <PressableIcon style={styles.ctaIconContainer} onPress={handlePreWeek}>
          <View style={styles.ctaIcon}>
            <Ionicons
              name="chevron-back"
              size={Sizes.SM}
              color={colorAreaChart}
            />
          </View>
          <Text style={styles.textCtaIcon}>Prev Week</Text>
        </PressableIcon>
        <SegmentedControl
          values={measureTypeOptions}
          selectedIndex={measureTypeOptions.indexOf(measureType)}
          onChange={(event) => {
            const selectedValue =
              measureTypeOptions[event.nativeEvent.selectedSegmentIndex];
            setMeasureType(selectedValue);
          }}
          fontStyle={{ color: colors.textColor, fontSize: Typography.REGULAR }}
          activeFontStyle={{ color: colorAreaChart }}
          style={{
            width: Sizes.MASSIVE * 1.5,
            height: Sizes.LG * 1.1,
          }}
        />
        <PressableIcon style={styles.ctaIconContainer} onPress={handleNextWeek}>
          <View style={styles.ctaIcon}>
            <Ionicons
              name="chevron-forward"
              size={Sizes.SM}
              color={colorAreaChart}
            />
          </View>
          <Text style={styles.textCtaIcon}>Next Week</Text>
        </PressableIcon>
      </View>
      <ModalUpdateMeasure
        isVisible={isModalUpdateMeasure}
        onBackdropPress={setIsModalUpdateMeasure}
        dailyNutrition={dailyNutrition}
        measureType={measureType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    backgroundColor: colors.whiteColor,
    borderRadius: Spacing.XS,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.XS },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.SM,
    elevation: 5,
    marginHorizontal: Spacing.LG,
    paddingVertical: Spacing.SM,
  },

  weekTitle: {
    paddingHorizontal: Spacing.MD,
    color: colors.textColor,
    fontSize: Typography.BASE,
    marginBottom: Spacing.XXS,
    fontWeight: "bold",
  },
  title: {
    paddingHorizontal: Spacing.MD,
    color: colors.descriptionTextColor,
    fontSize: Typography.REGULAR,
  },
  headingChart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.SM,
  },
  headingChartRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: Spacing.SM,
  },

  chartCta: {
    marginTop: Spacing.XS,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.SM,
  },

  ctaIconContainer: {
    width: Sizes.HUGE - Sizes.XXS,
    alignItems: "center",
    padding: 0,
  },
  ctaIcon: {
    backgroundColor: colors.backgroundColorScreen,
    width: Sizes.MD * 1.2,
    height: Sizes.MD * 1.2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
  },
  textCtaIcon: {
    color: colors.textColor,
    fontSize: Typography.XS,
  },
  emptySection: {
    height: Sizes.MASSIVE * 1.87,
    alignItems: "center",
    justifyContent: "center",
  },
  emptySectionText: {
    fontSize: Typography.SM,
    opacity: 0.5,
  },
});

const dummyData = [
  {
    bmi: "22.86",
    dailyNutritionId: "CCyey3GP",
    dateDailyNutrition: "2025-04-22",
    height: "164.7", // Thấp hơn
    targetCalories: 3362,
    targetCarbs: 421,
    targetFat: 113,
    targetProtein: 169,
    userId: "8rzbtCzN",
    weight: "60.4", // Gầy hơn
  },
  {
    bmi: "22.86",
    dailyNutritionId: "CCyey3GP",
    dateDailyNutrition: "2025-04-21",
    height: "164.5", // Thấp hơn
    targetCalories: 3362,
    targetCarbs: 421,
    targetFat: 113,
    targetProtein: 169,
    userId: "8rzbtCzN",
    weight: "60.2", // Gầy hơn
  },
  {
    bmi: "22.86",
    dailyNutritionId: "CCyey3GP",
    dateDailyNutrition: "2025-04-20",
    height: "164.5",
    targetCalories: 3362,
    targetCarbs: 421,
    targetFat: 113,
    targetProtein: 169,
    userId: "8rzbtCzN",
    weight: "60", // Gầy hơn
  },
  {
    bmi: "22.86",
    dailyNutritionId: "CCyey3GP",
    dateDailyNutrition: "2025-04-19",
    height: "164.3", // Thấp hơn
    targetCalories: 3362,
    targetCarbs: 421,
    targetFat: 113,
    targetProtein: 169,
    userId: "8rzbtCzN",
    weight: "60", // Gầy hơn
  },
  {
    bmi: "22.86",
    dailyNutritionId: "CCyey3GP",
    dateDailyNutrition: "2025-04-18",
    height: "164.8", // Thấp hơn
    targetCalories: 3362,
    targetCarbs: 421,
    targetFat: 113,
    targetProtein: 169,
    userId: "8rzbtCzN",
    weight: "60", // Gầy hơn
  },
  {
    bmi: "22.86",
    dailyNutritionId: "CCyey3GP",
    dateDailyNutrition: "2025-04-17",
    height: "166.8", // Thấp hơn
    targetCalories: 3362,
    targetCarbs: 421,
    targetFat: 113,
    targetProtein: 169,
    userId: "8rzbtCzN",
    weight: "60", // Gầy hơn
  },
  {
    bmi: "23.45",
    dailyNutritionId: "dNxaP3AZ",
    dateDailyNutrition: "2025-04-16",
    height: "162", // Thấp hơn
    targetCalories: 3200,
    targetCarbs: 400,
    targetFat: 110,
    targetProtein: 160,
    userId: "8rzbtCzN",
    weight: "59.5", // Gầy hơn
  },
  {
    bmi: "22.70",
    dailyNutritionId: "jkz78GsL",
    dateDailyNutrition: "2025-04-15",
    height: "164", // Thấp hơn
    targetCalories: 3300,
    targetCarbs: 410,
    targetFat: 112,
    targetProtein: 165,
    userId: "8rzbtCzN",
    weight: "59", // Gầy hơn
  },
  {
    bmi: "23.10",
    dailyNutritionId: "WX9sKd8Q",
    dateDailyNutrition: "2025-04-14",
    height: "163", // Thấp hơn
    targetCalories: 3250,
    targetCarbs: 405,
    targetFat: 111,
    targetProtein: 163,
    userId: "8rzbtCzN",
    weight: "59.8", // Gầy hơn
  },
  {
    bmi: "23.65",
    dailyNutritionId: "zYi3t7Xp",
    dateDailyNutrition: "2025-04-13",
    height: "161", // Thấp hơn
    targetCalories: 3150,
    targetCarbs: 395,
    targetFat: 108,
    targetProtein: 158,
    userId: "8rzbtCzN",
    weight: "60.2", // Gầy hơn
  },
  {
    bmi: "22.50",
    dailyNutritionId: "pOe2kq7T",
    dateDailyNutrition: "2025-04-12",
    height: "164", // Thấp hơn
    targetCalories: 3350,
    targetCarbs: 418,
    targetFat: 114,
    targetProtein: 168,
    userId: "8rzbtCzN",
    weight: "58.5", // Gầy hơn
  },
  {
    bmi: "22.95",
    dailyNutritionId: "uRk7aVcE",
    dateDailyNutrition: "2025-04-11",
    height: "165",
    targetCalories: 3370,
    targetCarbs: 423,
    targetFat: 115,
    targetProtein: 170,
    userId: "8rzbtCzN",
    weight: "59.1", // Gầy hơn
  },
  {
    bmi: "22.95",
    dailyNutritionId: "uRk7aVcE",
    dateDailyNutrition: "2025-04-10",
    height: "165",
    targetCalories: 3370,
    targetCarbs: 423,
    targetFat: 115,
    targetProtein: 170,
    userId: "8rzbtCzN",
    weight: "58.5", // Gầy hơn
  },
  {
    bmi: "22.95",
    dailyNutritionId: "uRk7aVcE",
    dateDailyNutrition: "2025-04-09",
    height: "165",
    targetCalories: 3370,
    targetCarbs: 423,
    targetFat: 115,
    targetProtein: 170,
    userId: "8rzbtCzN",
    weight: "58.3", // Gầy hơn
  },

  {
    bmi: "22.95",
    dailyNutritionId: "uRk7aVcE",
    dateDailyNutrition: "2025-04-08",
    height: "165",
    targetCalories: 3370,
    targetCarbs: 423,
    targetFat: 115,
    targetProtein: 170,
    userId: "8rzbtCzN",
    weight: "58.2", // Gầy hơn
  },
  {
    bmi: "22.95",
    dailyNutritionId: "uRk7aVcE",
    dateDailyNutrition: "2025-04-07",
    height: "165",
    targetCalories: 3370,
    targetCarbs: 423,
    targetFat: 115,
    targetProtein: 170,
    userId: "8rzbtCzN",
    weight: "58", // Gầy hơn
  },
  {
    bmi: "22.95",
    dailyNutritionId: "uRk7aVcE",
    dateDailyNutrition: "2025-04-06",
    height: "165",
    targetCalories: 3370,
    targetCarbs: 423,
    targetFat: 115,
    targetProtein: 170,
    userId: "8rzbtCzN",
    weight: "57.9", // Gầy hơn
  },
  {
    bmi: "22.95",
    dailyNutritionId: "uRk7aVcE",
    dateDailyNutrition: "2025-04-05",
    height: "165",
    targetCalories: 3370,
    targetCarbs: 423,
    targetFat: 115,
    targetProtein: 170,
    userId: "8rzbtCzN",
    weight: "57.9", // Gầy hơn
  },
];
