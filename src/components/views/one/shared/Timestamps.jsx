import React from "react";
import config from "../../../../config";
import { datetimeString } from "../../../../utils/format";
import { i18n_activity } from "../../../../i18n/i18n";

import "./Timestamps.scss";

const showTimestamp = config.withTimestamp;

const Timestamps = ({ data }) => {
  if (!(showTimestamp && data?.id)) {
    return null;
  }
  return (
    <div className="timestamps">
      <div>
        <label>{i18n_activity.updated}</label>
        {datetimeString(data.updated_at)}
      </div>
      <div>
        <label>{i18n_activity.created}</label>
        {datetimeString(data.created_at)}
      </div>
    </div>
  );
};

export default Timestamps;
