import React from "react";
import PropTypes from "prop-types";

import "./Badge.scss";
import "../Alert/Alert.scss";

const Badge = ({ text, type }) => (
  <div className={`evo-badge alert-${type}`} role="status" data-testid="badge">
    <span>{text}</span>
  </div>
);

export default Badge;

Badge.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf([
    "default", // - light grey
    "info", // - blue
    "success", // - green
    "warning", // - yellow
    "danger", // - red
  ]),
};

Badge.defaultProps = {
  type: "default",
};
