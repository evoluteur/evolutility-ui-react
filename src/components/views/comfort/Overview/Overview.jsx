// #region ---------------- Imports ----------------
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "react-crud-icons";
import { getModel } from "../../../../utils/moMa";
import { fieldInCharts } from "../../../../utils/dico";
import { views } from "../../../../utils/dicoViews";
import { capitalize } from "../../../../utils/format";
import { lcWrite, lcRead } from "../../../../utils/localStorage";
import { i18n_actions } from "../../../../i18n/i18n";
import ViewHeader from "../../ViewHeader/ViewHeader";
import Chart from "../../analytics/Charts/Chart";
import SearchBox from "./SearchBox";
import Activity from "./Activity";
import InvalidRoute from "./InvalidRoute";

import "./Overview.scss";
// #endregion

const Overview = () => {
  const { entity } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entity]);

  const m = getModel(entity);
  const chartFields = m?.fields.filter(fieldInCharts);

  const lcKey = `${entity}-overview-chart`;
  const lcChartField = lcRead(lcKey);

  const [chartField, setChartField] = useState(
    !!m && lcChartField
      ? m.fieldsH[lcChartField]
      : chartFields && chartFields?.length
      ? chartFields[0]
      : ""
  );

  if (m === null) {
    return <InvalidRoute entity={entity} />;
  } else {
    const chartFieldChanged = (evt) => {
      const e = evt.currentTarget;
      const fid = e.children[e.selectedIndex]?.id;
      lcWrite(lcKey, fid);
      setChartField(m.fieldsH[fid]);
    };

    const urlBegin = `/${entity}/`;
    const viewLink = (v) => (
      <Link key={v.id} to={urlBegin + v.id}>
        <Icon name={v.icon} theme="light" />
        <span>{v.label}</span>
      </Link>
    );

    const actions = (
      <div className="ovw-actions">
        <div>
          {viewLink(views.list)}
          {viewLink(views.cards)}
        </div>
        <div>
          {!m.noCharts && viewLink(views.charts)}
          {!m.noStats && viewLink(views.stats)}
        </div>

        <div>
          <Link to={urlBegin + "edit/0"}>
            <Icon name="add" theme="light" />
            <span>{"New " + m.name} </span>
          </Link>
        </div>
      </div>
    );

    const placeHolder = i18n_actions.searchX.replace("{0}", m.namePlural);
    const body = (
      <div className="ovw-body">
        {actions}
        <SearchBox entity={entity} placeHolder={placeHolder} />
        <div className="ovw-text"></div>
        <div className="cols-2">
          <Activity entity={entity} />
          {!m.noCharts && (
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
                  <option
                    key={f.id}
                    id={f.id}
                    selected={f.id === chartField?.id}
                  >
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div className="evol-overview">
        <ViewHeader
          entity={entity}
          title={capitalize(m.namePlural) + " " + i18n_actions.overview}
          view="overview"
        />
        {body}
      </div>
    );
  }
};

export default Overview;
