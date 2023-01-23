// #region ---------------- Imports ----------------
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "react-crud-icons";
import { getModel } from "../../../utils/moMa";
import { getActivity } from "../../../utils/activity";
import { fieldInCharts } from "../../../utils/dico";
import { viewsMany } from "../../../utils/dicoViews";
import { capitalize } from "../../../utils/format";
import { lcWrite, lcRead } from "../../../utils/localStorage";
import { i18n_activity } from "../../../i18n/i18n";
import Header from "../../shell/PageTitle";
import Chart from "../charts/Chart";
import ModelLinks from "../comfort/ModelLinks";

import "./Overview.scss";
// #endregion

const Overview = () => {
  const { entity } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entity]);

  const m = getModel(entity);
  const data = getActivity(entity);

  const lcKey = `${entity}-overview-chart`;
  const lcChartField = lcRead(lcKey);
  const chartFields = m?.fields.filter(fieldInCharts);

  const [chartField, setChartField] = useState(
    !!m && lcChartField
      ? m.fieldsH[lcChartField]
      : chartFields && chartFields?.length
      ? chartFields[0]
      : ""
  );

  const msg = `Sorry but "${entity}" is not a valid object type.`;
  if (m === null) {
    return (
      <div>
        <div>{msg}</div>
        INVALID MODEL
        <ModelLinks />
      </div>
    );
    //  <div>Possible objects: {ModelLinks()}</div>
  } else {
    const chartFieldChanged = (evt) => {
      const e = evt.currentTarget;
      const fid = e.children[e.selectedIndex]?.id;

      lcWrite(lcKey, fid);
      setChartField(m.fieldsH[fid]);
    };

    const mIcon = m.icon;
    const iconPath = "/pix/" + mIcon;
    const urlBegin = "../" + entity + "/";
    const viewLink = (v) => (
      <Link key={v.id} to={urlBegin + v.id}>
        <Icon name={v.icon} theme="light" />
        <span>{v.label}</span>
      </Link>
    );
    const activityLink = ({ id, title }) => (
      <Link key={id} to={urlBegin + "browse/" + id}>
        <img src={iconPath} alt="" />
        {title}
      </Link>
    );

    const actions = (
      <div className="ovw-actions">
        <div>
          {viewLink(viewsMany.list)}
          {viewLink(viewsMany.cards)}
        </div>
        <div>
          {viewLink(viewsMany.charts)}
          {viewLink(viewsMany.stats)}
        </div>

        <div>
          <Link to={urlBegin + "edit/0"}>
            <Icon name="add" theme="light" />
            <span>{"New " + m.name} </span>
          </Link>
        </div>
      </div>
    );

    const body = (
      <div className="ovw-body">
        {actions}
        <div className="ovw-text"></div>
        <br />
        <div className="cols-2">
          <div className="ovw-hist panel">
            <h4>{viewLink(viewsMany.activity)}</h4>
            <span>
              {i18n_activity.mostViewed.replace("{0}", m.namePlural)}:
            </span>

            <div className="ovw-hist-list">
              {data?.mostViewed?.map(activityLink)}
            </div>
            <br />
            <span>
              {i18n_activity.lastViewed.replace("{0}", m.namePlural)}:
            </span>
            <div className="ovw-hist-list">
              {data?.lastViewed?.map(activityLink)}
            </div>
          </div>
          <div className="ovw-chart">
            <Chart
              entity={entity}
              field={chartField}
              title=""
              chartType="pie"
              size="small"
              canExpand={false}
              className="panel"
            />
            <select onChange={chartFieldChanged} className="form-control">
              {chartFields?.map((f) => (
                <option key={f.id} id={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );

    return (
      <div className="evol-overview">
        <Header
          entity={entity}
          model={m}
          title={capitalize(m.namePlural) + " Overview"}
          count={null}
          cardinality="n"
          view="summary"
        />
        {body}
      </div>
    );
  }
};

export default Overview;
