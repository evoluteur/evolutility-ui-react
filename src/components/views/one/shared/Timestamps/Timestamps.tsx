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
const showWhoIs = config.withWhoIs;

export interface TimestampsProps {
  created: unknown;
  updated: unknown;
  /** Name of the user who created the record (w/ config.withWhoIs) */
  createdBy?: string | null;
  /** Name of the user who last updated the record */
  updatedBy?: string | null;
}

// - one line under the page title: "Updated 2 days ago by Ada · Created Sep 6,
//   2026 by Bob" (full date & time on hover)
const Timestamps = memo(
  ({ updated, created, createdBy, updatedBy }: TimestampsProps) => {
    if (!showTimestamp || !(updated || created)) {
      return null;
    }
    // - no "updated" if never updated since creation
    const wasUpdated =
      !!updated && datetimeString(updated) !== datetimeString(created);
    const stamp = (
      d: unknown,
      label: string,
      txt: string,
      by?: string | null,
    ) => (
      <>
        <time dateTime={String(d)} title={datetimeString(d)}>
          {label.replace("{0}", txt)}
        </time>
        {showWhoIs && by ? i18n.byX.replace("{0}", by) : null}
      </>
    );
    return (
      <div className="timestamps" data-testid="timestamps">
        {wasUpdated &&
          stamp(updated, i18n.updatedX, relativeTimeString(updated), updatedBy)}
        {wasUpdated && !!created && <span aria-hidden="true"> · </span>}
        {!!created &&
          stamp(created, i18n.createdX, longDateString(created), createdBy)}
      </div>
    );
  },
);

export default Timestamps;
