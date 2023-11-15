import React, { memo } from "react";

import "./PercentBar.scss";

const PercentBar = memo(({ percent }) => (
  <div className="pc-bar">
    <div className="pcb-red" style={{ width: percent + "%" }}></div>
  </div>
));

export default PercentBar;
