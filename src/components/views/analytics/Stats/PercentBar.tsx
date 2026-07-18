import { memo } from "react";

import "./PercentBar.scss";

export interface PercentBarProps {
  percent: number;
}

const PercentBar = memo(({ percent }: PercentBarProps) => (
  <div className="pc-bar">
    <div className="pcb-red" style={{ width: percent + "%" }}></div>
  </div>
));

export default PercentBar;
