import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { i18n_activity as i18n } from "i18n/i18n";
import { getActivity, clearActivity } from "utils/activity";
import { getModel } from "utils/moMa";
import { capitalize, pixPath } from "utils/format";
import Button from "components/widgets/Button/Button";
import ViewHeader from "components/views/ViewHeader/ViewHeader";

import "./Activity.scss";

const visitsCount = (n) => {
  if (n === 1) {
    return i18n.views1;
  }
  if (n === 0) {
    // should never happen
    return i18n.views1;
  }
  return i18n.viewsN?.replace("{0}", n);
};

const Activity = () => {
  const { entity } = useParams();
  const [act, setFullActivity] = useState(getActivity(entity));
  const m = getModel(entity);
  const title = capitalize(m.namePlural) + " Activity";

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = title;
  }, [title]);

  const activityItem = (act) => {
    return (
      act && (
        <div key={act.id}>
          <Link to={`../${entity}/browse/${act.id}`}>
            <img className="e-icon" src={pixPath + m.icon} alt="" />
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
      <ViewHeader entity={entity} title={title} view="activity" />
      {act?.lastViewed?.length > 0 && (
        <section>
          {i18n.activitySince
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
        activityList(i18n.mostViewed, act?.mostViewed)}
      {act?.lastViewed.length ? (
        activityList(i18n.lastViewed, act?.lastViewed)
      ) : (
        <div>{i18n.noActivity}</div>
      )}
    </div>
  );
};

export default Activity;
