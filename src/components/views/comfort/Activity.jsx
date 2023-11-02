import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getActivity, clearActivity } from "../../../utils/activity";
import PageTitle from "../../shell/PageTitle/PageTitle";
import { getModel } from "../../../utils/moMa";
import { i18n_activity } from "../../../i18n/i18n";
import { capitalize } from "../../../utils/format";
import Button from "../../widgets/Button/Button";

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

const Activity = () => {
  const { entity = null } = useParams();
  const m = getModel(entity);
  const [act, setFullActivity] = useState(getActivity(entity));

  const activityItem = (act) => {
    return (
      act && (
        <div key={act.id}>
          <Link to={`../${entity}/browse/${act.id}`}>
            <img className="e-icon" src={`/pix/${m.icon}`} alt="" />
            {act.title}
          </Link>
          <div className="visits">{visitsCount(act.visits)}</div>
          <div className="last-visit">{act.date}</div>
        </div>
      )
    );
  };

  const activityList = (title, items) => (
    <section>
      <h3>{title.replace("{0}", m.namePlural)}</h3>
      {items.map(activityItem)}
    </section>
  );

  const onClearActivity = () => {
    // TODO: confirmation
    clearActivity(entity);
    setFullActivity(null);
  };

  return (
    <div className="evol-activity">
      <PageTitle
        entity={entity}
        title={capitalize(m.namePlural) + " Activity"}
        view="activity"
      />
      {act?.lastViewed?.length > 0 && (
        <section>
          {i18n_activity.activitySince
            ?.replace("{0}", m.namePlural)
            .replace("{1}", act.firstActivityDate)}
          <Button
            onClick={onClearActivity}
            type="default"
            label="Clear Activity"
          />
        </section>
      )}
      {act?.mostViewed.length > 0 &&
        activityList(i18n_activity.mostViewed, act?.mostViewed)}
      {act?.lastViewed.length ? (
        activityList(i18n_activity.lastViewed, act?.lastViewed)
      ) : (
        <div>{i18n_activity.noActivity}</div>
      )}
    </div>
  );
};

export default Activity;
