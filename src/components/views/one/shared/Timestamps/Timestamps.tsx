import { memo } from "react";
import config from "config";
import {
  datetimeString,
  longDateString,
  relativeTimeString,
} from "utils/format";
import { i18n_activity as i18n } from "i18n/i18n";

import "./Timestamps.scss";

const showTimestamp = config.withTimestamp;

export interface TimestampsProps {
  created: unknown;
  updated: unknown;
}

// - one line under the page title: "Updated 2 days ago · Created Sep 6, 2026"
//   (full date & time on hover)
const Timestamps = memo(({ updated, created }: TimestampsProps) => {
  if (!showTimestamp || !(updated || created)) {
    return null;
  }
  // - no "updated" if never updated since creation
  const wasUpdated =
    !!updated && datetimeString(updated) !== datetimeString(created);
  const stamp = (d: unknown, label: string, txt: string) => (
    <time dateTime={String(d)} title={datetimeString(d)}>
      {label.replace("{0}", txt)}
    </time>
  );
  return (
    <div className="timestamps" data-testid="timestamps">
      {wasUpdated && stamp(updated, i18n.updatedX, relativeTimeString(updated))}
      {wasUpdated && !!created && <span aria-hidden="true"> · </span>}
      {!!created && stamp(created, i18n.createdX, longDateString(created))}
    </div>
  );
});

export default Timestamps;
