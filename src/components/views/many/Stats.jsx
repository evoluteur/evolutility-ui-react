/* eslint-disable react-hooks/exhaustive-deps */

// Evolutility-UI-React :: /views/many/Stats.js

// Stats view to display records count, and other aggregations
// like min, max, average... for numeric fields

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// #region ---------------- Imports ----------------
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
// import config from "../../../config";
import { getModel } from "../../../utils/moMa";
import { i18n_stats, i18n_comments } from "../../../i18n/i18n";
import {
  fieldInStats,
  fieldStatsFunctions,
  fieldTypes as ft,
} from "../../../utils/dico";
import dao from "../../../utils/dao";
import {
  capitalize,
  xItemsCount,
  fieldValue,
  decimalString,
  moneyString,
  nullOrUndefined,
} from "../../../utils/format";
import Header from "../../shell/PageTitle";
import Spinner from "../../widgets/Spinner";
import Alert from "../../widgets/Alert";
import Range from "../../widgets/Range";
import Chart from "../charts/Chart";

import "./Stats.scss";
// #endregion

// #region ---------------- Helpers ----------------
// TODO:
// const { withTimestamp, withComments } = config;
const withTimestamp = false; // not implemented yet
const withComments = false; // not implemented yet

const formattedValue = (value, field) => {
  if (field.type === ft.money) {
    return moneyString(value);
  }
  return value;
};

const itemAggr = (id, label, value) => (
  <div key={id}>
    <label className="stat-fn">{label}</label> {value}
  </div>
);

const prepData = (data, fields) => {
  if (data) {
    fields.forEach((f) => {
      const d = data[f.id];
      if (d) {
        // - stats in  range
        if (!nullOrUndefined(d.min)) {
          d.min = fieldValue(f, d.min);
          d.max = fieldValue(f, d.max);
        }
        if (!nullOrUndefined(d.avg)) {
          d.avg = decimalString(d.avg);
        }
        // - other stats (no range)
        if (!nullOrUndefined(d.stddev)) {
          d.stddev = decimalString(d.stddev);
        }
        if (!nullOrUndefined(d.variance)) {
          d.variance = decimalString(d.variance);
        }
      }
    });
  }
  return data;
};

const fieldTitle = (f) => (
  <>
    <h4 className="stat-field-title">{f.label}</h4>
    <div className="stat-field-id">
      {f.type}
      {f.required && <span className="field-required">*</span>}
    </div>
  </>
);

const statsField = (d, f) =>
  d.min !== null && (
    <div key={f.id} className="f-stats panel">
      {fieldTitle(f)}
      <div className="stat-values">
        {fieldStatsFunctions(f).map(
          (fn) =>
            d[fn] !== null &&
            itemAggr(d.id + fn + "dd", i18n_stats[fn], formattedValue(d[fn], f))
        )}
        {d.avg && d.min !== d.max && (
          <div className="field-range">
            <div>{formattedValue(d.min, f)}</div>
            <Range min={d.min} max={d.max} avg={d.avg} />
            <div>{formattedValue(d.max, f)}</div>
          </div>
        )}
      </div>
    </div>
  );
// #endregion

const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const { entity } = useParams();
  const model = getModel(entity);
  const fields = useMemo(
    () =>
      model?.fields.filter(
        (f) =>
          fieldInStats(f) || (f.type === ft.lov && f.list) || f.type === ft.bool
      ),
    [entity]
  );

  const title = i18n_stats.statsTitle.replace(
    "{0}",
    model.label || model.title
  );

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    let done = false;
    dao.getStats(entity).then((response) => {
      if (done) {
        return;
      }
      if (response.errors) {
        setError(response.errors[0]);
      } else {
        setData(prepData(response.data, fields));
        window.scrollTo(0, 0);
      }
      setLoading(false);
    });
    return () => {
      done = true;
    };
  }, [entity]);

  let body;
  if (loading) {
    body = <Spinner />;
  } else if (data?.count === 0) {
    body = (
      <Alert
        type="info"
        title={i18n_stats.noData}
        message={i18n_stats.emptyData}
      />
    );
  } else if (error) {
    body = <Alert title="Server Error" message={error.message} />;
  } else {
    const recCount =
      i18n_stats.metaCount
        .replace("{0}", data.count)
        .replace("{1}", model.fields.length) +
      //.replace("{2}", model?.collections.length || 0) +
      ", " +
      fields.length +
      " Stats";
    const commentsCount = xItemsCount(
      data.nb_comments,
      i18n_comments.comment,
      i18n_comments.comments
    );
    const chartsOK = !model.noCharts;
    const defaultChartType = "bars";
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
                {data.u_date_week_count || "No"} {i18n_stats.weekUpdates}
              </label>
            )}
          </div>
          {withTimestamp &&
            (data.u_date_max !== "N/A" || data.c_date_min !== "N/A") && (
              <div>
                <div className="stat-field">
                  <span>{i18n_stats.lastUpdate}:</span>
                  {data.u_date_max}
                </div>
                <div className="stat-field">
                  <span>{i18n_stats.firstInsert}:</span>
                  {data.c_date_min}
                </div>
              </div>
            )}
        </div>
        <div className="stats-fields">
          {fields?.map((f) => {
            if (f.type === ft.bool || (f.type === ft.lov && f.list)) {
              return (
                <div key={f.id} className="f-stats panel">
                  {fieldTitle(f)}
                  <div className="stat-values">
                    {f.type === ft.lov && f.list && (
                      <div>{f.list?.length} list items </div>
                    )}
                    {chartsOK && !f.noCharts && (
                      <div className="stat-chart-holder">
                        <Chart
                          entity={entity}
                          field={f}
                          title={capitalize(model.namePlural) + " / " + f.label}
                          type={defaultChartType}
                          size="tiny"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            if (data[f.id] !== undefined) {
              return statsField(data[f.id], f);
            }
            return f.id;
          })}
        </div>
      </div>
    );
  }
  return (
    <>
      <Header
        entity={entity}
        title={title}
        model={model}
        cardinality="n"
        view="stats"
      />
      {body}
    </>
  );
};

export default Stats;

Stats.propTypes = {
  entity: PropTypes.string,
};
