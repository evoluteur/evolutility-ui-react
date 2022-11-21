import PropTypes from "prop-types";

export const chartTypes = ["bars", "pie", "table"];

export const chartSizes = ["tiny", "small", "large"];

const chartProps = {
  data: PropTypes.any,
  size: PropTypes.oneOf(chartSizes),
  showLegend: PropTypes.bool,
};

export default chartProps;
