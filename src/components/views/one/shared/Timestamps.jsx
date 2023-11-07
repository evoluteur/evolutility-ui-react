import React, { memo } from "react";
import PropTypes from "prop-types";
import config from "../../../../config";
import { datetimeString } from "../../../../utils/format";
import { i18n_activity } from "../../../../i18n/i18n";

import "./Timestamps.scss";

const showTimestamp = config.withTimestamp;

const Timestamps = memo(({ updated, created }) => {
  if (!showTimestamp) {
    return null;
  }
  return (
    <div className="timestamps">
      <div>
        <label>{i18n_activity.updated}</label>
        {datetimeString(updated)}
      </div>
      <div>
        <label>{i18n_activity.created}</label>
        {datetimeString(created)}
      </div>
    </div>
  );
});

export default Timestamps;

Timestamps.propTypes = {
  created: PropTypes.any.isRequired,
  updated: PropTypes.any.isRequired,
};
