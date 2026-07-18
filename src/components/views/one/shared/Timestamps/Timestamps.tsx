import { memo } from "react";
import config from "config";
import { datetimeString } from "utils/format";
import { i18n_activity } from "i18n/i18n";

import "./Timestamps.scss";

const showTimestamp = config.withTimestamp;

export interface TimestampsProps {
  created: unknown;
  updated: unknown;
}

const Timestamps = memo(({ updated, created }: TimestampsProps) => {
  if (!showTimestamp) {
    return null;
  }
  return (
    <div className="timestamps" data-testid="timestamps">
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
