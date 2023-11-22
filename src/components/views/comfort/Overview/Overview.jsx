// #region ---------------- Imports ----------------
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "react-crud-icons";
import { getModel } from "utils/moMa";
import { fieldInCharts } from "utils/dico";
import { views } from "utils/dicoViews";
import { capitalize } from "utils/format";
import { lcWrite, lcRead } from "utils/localStorage";
import { i18n_actions as i18n } from "i18n/i18n";
import ViewHeader from "components/views/ViewHeader/ViewHeader";
import Chart from "components/views/analytics/Charts/Chart";
import SearchBox from "./SearchBox";
import Activity from "./Activity";
import InvalidRoute from "./InvalidRoute";
// #endregion

import "./Overview.scss";

const Overview = () => {
  const { entity } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [entity]);

  const m = getModel(entity);
  const chartFields = m?.fields.filter(fieldInCharts);

  const lcKey = `../${entity}-overview-chart`;
  const lcChartField = lcRead(lcKey);

  const [chartField, setChartField] = useState(
    !!m && lcChartField ? m.fieldsH[lcChartField] : chartFields?.[0] || ""
  );

  if (m === null) {
    return <InvalidRoute entity={entity} />;
  } else {
    const chartFieldChanged = (evt) => {
      const target = evt.currentTarget;
      const fid = target.selectedOptions[0].value;
      lcWrite(lcKey, fid);
      setChartField(m.fieldsH[fid]);
    };

    const urlBegin = `../${entity}/`;
    const ViewLink = ({ id, label, icon }) => (
      <Link to={urlBegin + id}>
        <Icon name={icon} theme="light" />
        <span>{label}</span>
      </Link>
    );

    const Actions = () => (
      <div className="ovw-actions">
        <div>
          <ViewLink {...views.list} />
          <ViewLink {...views.cards} />
        </div>
        <div>
          {!m.noCharts && <ViewLink {...views.charts} />}
          {!m.noStats && <ViewLink {...views.stats} />}
        </div>
        <div>
          <ViewLink id="edit/0" label={"New " + m.name} icon="add" />
        </div>
      </div>
    );

    const placeHolder = i18n.searchX.replace("{0}", m.namePlural);
    const body = (
      <div className="ovw-body">
        <Actions />
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
              <select
                value={chartField?.id}
                onChange={chartFieldChanged}
                className="form-control"
              >
                {chartFields?.map((f) => (
                  <option key={f.id} value={f.id}>
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
          title={capitalize(m.namePlural) + " " + i18n.overview}
          view="overview"
        />
        {body}
      </div>
    );
  }
};

export default Overview;
