import PropTypes from "prop-types";

const sizes = ["small", "large"];
const chartTypes = ["bars", "pie", "table"];

const chartProps = {
  sizes,
  chartTypes,
  chartProps: {
    data: PropTypes.any,
    size: PropTypes.oneOf(sizes),
  },
};

export default chartProps;
