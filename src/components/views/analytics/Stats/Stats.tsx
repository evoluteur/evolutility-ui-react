// Evolutility-UI-React :: /views/many/Stats.tsx

// Stats view to display records count, and other aggregations
// like min, max, average... for numeric fields

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

// #region ---------------- Imports ----------------
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getModel } from "utils/moMa";
import { i18n_stats, i18n_comments } from "i18n/i18n";
import { fieldTypes as ft } from "utils/dico";
import { useStats } from "dao/queries";
import { xItemsCount, numString } from "utils/format";
import ViewHeader from "components/views/ViewHeader/ViewHeader";
import Spinner from "components/ui/Spinner/Spinner";
import Alert from "components/ui/Alert/Alert";
import FieldValue from "components/Field/browse/FieldValue";
import PercentBar from "./PercentBar";
import type { Field } from "types/model";
// #endregion

import "./Stats.scss";

// #region ---------------- Helpers ----------------
// TODO:
// const { withTimestamp, withComments } = config;
const withTimestamp = false; // not implemented in Stats yet
const withComments = false; // not implemented yet

const fieldTitle = (f: Field) => (
  <>
    <h2 className="stat-field-title">{f.label}</h2>
    <div className="stat-field-id">
      {f.type}
      {f.required && <span className="field-required">*</span>}
    </div>
  </>
);

const statValue = (field: Field, stat: string, value: any, pc: number) => {
  if (stat === "nulls") {
    return (
      <>
        {value}
        <span>{"(" + numString(pc) + "%)"}</span>
      </>
    );
  } else if (
    stat === "min" ||
    stat === "max" ||
    (field.type === ft.money && stat === "avg")
  ) {
    return <FieldValue fieldDef={field} value={value} />;
  }
  return value;
};

const statsField = (d: any, f: Field, total: number) => {
  const pc = (100 * d.nulls) / total;
  return (
    <div key={f.id} className="f-stats panel">
      {fieldTitle(f)}
      <PercentBar percent={pc} />
      <div className="stat-values">
        {Object.keys(d).map((stat) => (
          <div key={stat}>
            <label>{i18n_stats[stat]}</label>
            {statValue(f, stat, d[stat], pc)}
          </div>
        ))}
        {f.type === ft.lov && f.list && (
          <div>
            <label>{i18n_stats.cardinality}</label>
            {f.list?.length}
          </div>
        )}
      </div>
    </div>
  );
};
// #endregion

const Stats = () => {
  const { entity } = useParams<{ entity: string }>();
  const model = getModel(entity);
  const title = i18n_stats.statsTitle.replace("{0}", model?.title || "");
  const { data, isLoading, error } = useStats(entity as string);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0);
    }
  }, [data]);

  let body;
  if (isLoading) {
    body = <Spinner />;
  } else if (error) {
    body = <Alert title="Server Error" message={error.message} />;
  } else if (!model) {
    body = <Alert title={i18n_stats.noData} message={i18n_stats.emptyData} />;
  } else if (data?.count === 0) {
    body = (
      <Alert
        type="info"
        title={i18n_stats.noData}
        message={i18n_stats.emptyData}
      />
    );
  } else if (data) {
    const recCount = i18n_stats.metaCount
      .replace("{0}", String(data.count))
      .replace("{1}", String(model.fields.length));
    //.replace("{2}", model?.collections.length || 0)
    const commentsCount = xItemsCount(
      data.nb_comments,
      i18n_comments.comment,
      i18n_comments.comments,
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
            return null;
          })}
        </div>
      </div>
    );
  }
  return (
    <>
      <ViewHeader entity={entity as string} title={title} view="stats" />
      {body}
    </>
  );
};

export default Stats;
