import React from "react";
import PropTypes from "prop-types";

import "./Range.scss";

const Range = ({ min, max, avg }) => {
  const css = {
    left:
      Math.round(max === min ? 0 : ((avg - min) / (max - min)) * 200) +
      10 +
      "px",
  };

  if (min === max || avg === undefined) {
    return null;
  }
  const avgTxt = avg;
  return (
    <div className="evo-range">
      <div className="range-line">
        <div className="range-line" />
      </div>
      <div style={css} className="range-avg">
        <div>{avgTxt}</div>
      </div>
    </div>
  );
};

export default Range;

Range.propTypes = {
  /** Minimum value */
  min: PropTypes.number.isRequired,
  /** Maximum value */
  max: PropTypes.number.isRequired,
  /** Average value */
  avg: PropTypes.number,
};
