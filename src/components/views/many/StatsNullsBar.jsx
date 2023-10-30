import React from "react";

import "./StatsNullsBar.scss";

const StatsNullsBar = ({ percent }) => (
  <div className="stats-line">
    <div className="sl-red" style={{ width: percent + "%" }}></div>
  </div>
);

export default StatsNullsBar;
