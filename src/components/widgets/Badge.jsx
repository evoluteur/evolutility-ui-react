import React from "react";
import PropTypes from "prop-types";

import "./Badge.scss";

const Badge = ({ text }) => (
  <div className="evo-badge">
    <span>{text}</span>
  </div>
);

export default Badge;

Badge.propTypes = { text: PropTypes.string.isRequired };
