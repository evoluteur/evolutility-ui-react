import React from "react";
import PropTypes from "prop-types";
import { i18n_stats } from "i18n/i18n";

import "./Range.scss";

const Range = (props) => {
  const { min, max, avg } = props;
  const css = {
    left:
      Math.round(max === min ? 0 : ((avg - min) / (max - min)) * 200) +
      6 +
      "px",
  };

  if (min === max || avg === undefined) {
    return null;
  }
  const avgTxt = i18n_stats.avg + ": " + avg;
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
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  avg: PropTypes.number,
};
