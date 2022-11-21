import React from "react";
import { Link } from "react-router-dom";

import { getActivity } from "../../../utils/localStorage";
import { getModel } from "../../../utils/moMa";
import { i18n_activity } from "../../../i18n/i18n";

import "./Activity.scss";

const visitsCount = (n) => {
  if (n === 1) {
    return i18n_activity.views1;
  }
  if (n === 0) {
    // should never happen
    return i18n_activity.views1;
  }
  return i18n_activity.viewsN?.replace("{0}", n);
};

const Activity = ({ match }) => {
  // TODO: Add "Clear Activity" button
  const { entity = null } = match.params;
  const m = getModel(entity);
  const lastViewedActivity = getActivity(entity);
  const mostViewedActivity = lastViewedActivity
    .filter((a) => a.visits > 1)
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5);
  const startDate = lastViewedActivity[lastViewedActivity.length - 1]?.date;

  const activity = (a) => {
    return (
      <div key={a.id}>
        <Link to={"browse/" + a.id}>
          <img className="evol-many-icon" src={"/pix/" + m.icon} alt="" />
          {a.title}
        </Link>
        <div className="visits">{visitsCount(a.visits)}</div>
        <div className="last-visit">{a.date}</div>
      </div>
    );
  };

  const activityList = (title, items) => (
    <>
      <h3>{title.replace("{0}", m.namePlural)}</h3>
      {items.map(activity)}
    </>
  );

  return (
    <div className="evol-activity">
      <h2 className="page-title">Activity</h2>

      {lastViewedActivity.length > 0 && (
        <p>
          {i18n_activity.activitySince
            ?.replace("{0}", m.namePlural)
            .replace("{1}", startDate)}
        </p>
      )}
      {mostViewedActivity.length > 0 &&
        activityList(i18n_activity.mostViewed, mostViewedActivity)}
      {lastViewedActivity.length ? (
        activityList(i18n_activity.lastViewed, lastViewedActivity)
      ) : (
        <div>{i18n_activity.noActivity}</div>
      )}
    </div>
  );
};

export default Activity;
