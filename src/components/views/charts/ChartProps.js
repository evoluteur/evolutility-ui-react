import PropTypes from "prop-types";

const sizes = ["tiny", "small", "large"];
const chartTypes = ["bars", "pie", "table"];

const chartProps = {
  sizes,
  chartTypes,
  chartProps: {
    data: PropTypes.any,
    size: PropTypes.oneOf(sizes),
    showLegend: PropTypes.bool,
  },
};

export default chartProps;
