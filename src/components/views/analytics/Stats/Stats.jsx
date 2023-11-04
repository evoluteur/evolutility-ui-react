/* eslint-disable react-hooks/exhaustive-deps */

// Evolutility-UI-React :: /views/many/Stats.js

// Stats view to display records count, and other aggregations
// like min, max, average... for numeric fields

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// #region ---------------- Imports ----------------
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
// import config from "../../../config";
import { getModel } from "../../../../utils/moMa";
import { i18n_stats, i18n_comments } from "../../../../i18n/i18n";
import { fieldTypes as ft } from "../../../../utils/dico";
import { getStats } from "../../../../dao/dao";
import { xItemsCount, numString, fieldValue } from "../../../../utils/format";
import ViewHeader from "../../ViewHeader/ViewHeader";
import Spinner from "../../../widgets/Spinner/Spinner";
import Alert from "../../../widgets/Alert/Alert";
import StatsNullsBar from "./StatsNullsBar";

import "./Stats.scss";
// #endregion

// #region ---------------- Helpers ----------------
// TODO:
// const { withTimestamp, withComments } = config;
const withTimestamp = false; // not implemented in Stats yet
const withComments = false; // not implemented yet

const fieldTitle = (f) => (
  <>
    <h4 className="stat-field-title">{f.label}</h4>
    <div className="stat-field-id">
      {f.type}
      {f.required && <span className="field-required">*</span>}
    </div>
  </>
);

const statValue = (field, stat, value, pc) => {
  if (stat === "nulls") {
    return (
      <>
        {value}
        <span>{"(" + numString(pc) + "%)"}</span>
      </>
    );
  } else if (stat === "min" || stat === "max") {
    return fieldValue(field, value, null);
  }
  return value;
};

const statsField = (d, f, total) => {
  const pc = (100 * d.nulls) / total;
  return (
    <div key={f.id} className="f-stats panel">
      {fieldTitle(f)}
      <StatsNullsBar percent={pc} />
      <div className="stat-values">
        {Object.keys(d).map((stat) => (
          <div key={stat}>
            <label>{i18n_stats[stat]}</label>
            {statValue(f, stat, d[stat], pc)}
          </div>
        ))}
        {f.type === ft.lov && f.list && <div>{f.list?.length} list items </div>}
      </div>
    </div>
  );
};
// #endregion

const Stats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const { entity } = useParams();
  const model = getModel(entity);
  const title = i18n_stats.statsTitle.replace(
    "{0}",
    model.label || model.title
  );

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    let done = false;
    setIsLoading(true);
    getStats(entity).then((response) => {
      if (done) {
        return;
      }
      if (response.errors) {
        setError(response.errors[0]);
      } else {
        setData(response.data);
        window.scrollTo(0, 0);
      }
      setIsLoading(false);
    });
    return () => {
      done = true;
    };
  }, [entity]);

  let body;
  if (isLoading) {
    body = <Spinner />;
  } else if (error) {
    body = <Alert title="Server Error" message={error.message} />;
  } else if (data?.count === 0) {
    body = (
      <Alert
        type="info"
        title={i18n_stats.noData}
        message={i18n_stats.emptyData}
      />
    );
  } else {
    const recCount = i18n_stats.metaCount
      .replace("{0}", data.count)
      .replace("{1}", model.fields.length);
    //.replace("{2}", model?.collections.length || 0)
    const commentsCount = xItemsCount(
      data.nb_comments,
      i18n_comments.comment,
      i18n_comments.comments
    );
    body = (
      <div className="evol-stats">
        <div className="cols-2">
          <div className="label-count">
            {recCount}
            {withComments && (
              <label className="evo-label">{commentsCount}</label>
            )}
            {withTimestamp && (
              <label className="evo-label">
                {data.updated_at_week_count || "No"} {i18n_stats.weekUpdates}
              </label>
            )}
          </div>
          {withTimestamp &&
            (data.updated_at_max !== "N/A" ||
              data.created_at_min !== "N/A") && (
              <div>
                <div className="stat-field">
                  <span>{i18n_stats.lastUpdate}:</span>
                  {data.updated_at_max}
                </div>
                <div className="stat-field">
                  <span>{i18n_stats.firstInsert}:</span>
                  {data.created_at_min}
                </div>
              </div>
            )}
        </div>
        <div className="stats-fields">
          {model.fields?.map((f) => {
            if (data[f.id] !== undefined) {
              return statsField(data[f.id], f, data.count);
            }
            return f.id;
          })}
        </div>
      </div>
    );
  }
  return (
    <>
      <ViewHeader entity={entity} title={title} view="stats" />
      {body}
    </>
  );
};

export default Stats;

Stats.propTypes = {
  entity: PropTypes.string,
};
