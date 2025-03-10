import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Kích thước tính theo chiều rộng màn hình 360px
const Sizes = {
  TINY: wp("0.3%"), // 1.08px
  XXXS: wp("0.5%"), // 1.8px
  XXS: wp("1%"), // ~3.6px
  XS: wp("2%"), // ~7.2px
  SM: wp("4%"), // ~14.4px
  MD: wp("6%"), // ~21.6px
  LG: wp("8%"), // ~28.8px
  XL: wp("10%"), // ~36px
  XXL: wp("12%"), // ~43.2px
  XXXL: wp("14%"), // ~50.4px
  HUGE: wp("20%"), // ~72px
  MASSIVE: wp("25%"), // ~90px
};

export default Sizes;
