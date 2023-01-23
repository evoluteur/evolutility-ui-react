import React from "react";
import config from "../../../config";
import { datetimeString } from "../../../utils/format";

import "./Timestamps.scss";

const showTimestamp = config.withTimestamp;

const Timestamps = ({ data }) => {
  if (!(showTimestamp && data && data?.id)) {
    return null;
  }
  return (
    <div className="timestamps">
      <div>
        <label>Creation date</label>
        {datetimeString(data.c_date)}
      </div>
      <div>
        <label>Last update</label>
        {datetimeString(data.u_date)}
      </div>
    </div>
  );
};

export default Timestamps;
