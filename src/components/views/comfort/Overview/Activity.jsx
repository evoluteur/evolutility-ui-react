// #region ---------------- Imports ----------------
import React from "react";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";
import config from "config";
import { pixPath } from "utils/format";
import { getModel } from "utils/moMa";
import { getActivity } from "utils/activity";
import { views } from "utils/dicoViews";
import { i18n_activity } from "i18n/i18n";
// #endregion

import "./Activity.scss";

const { withActivity } = config;

const Overview = ({ entity }) => {
  if (!withActivity) {
    return null;
  }
  const m = getModel(entity);
  const activityData = getActivity(entity);
  const iconPath = pixPath + m.icon;
  const urlBegin = `../${entity}/`;
  const viewLink = (v) => (
    <Link key={v.id} to={urlBegin + v.id}>
      <Icon name={v.icon} theme="light" />
      <span>{v.label}</span>
    </Link>
  );
  const activityLink = ({ id, title }) => (
    <Link key={id} to={`${urlBegin}browse/${id}`}>
      <img src={iconPath} alt="" />
      {title}
    </Link>
  );

  return (
    <div className="ovw-hist panel">
      <h4>{viewLink(views.activity)}</h4>
      <span>{i18n_activity.mostViewed.replace("{0}", m.namePlural)}:</span>
      <div className="ovw-hist-list">
        {activityData?.mostViewed?.map(activityLink)}
      </div>
      <br />
      <span>{i18n_activity.lastViewed.replace("{0}", m.namePlural)}:</span>
      <div className="ovw-hist-list">
        {activityData?.lastViewed?.slice(0, 10).map(activityLink)}
      </div>
    </div>
  );
};

export default Overview;
