import PropTypes from "prop-types";

export const chartTypes = ["bars", "pie", "table"];

export const chartSizes = ["tiny", "small", "large"];

export const chartDataPropType = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  })
);

const chartProps = {
  data: chartDataPropType,
  size: PropTypes.oneOf(chartSizes),
  showLegend: PropTypes.bool,
};

export default chartProps;
