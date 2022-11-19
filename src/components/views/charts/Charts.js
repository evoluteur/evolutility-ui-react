// Evolutility-UI-React :: /views/charts/Charts.js

// Dashboard style set of charts (bars or pies).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React, { useEffect } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";
import { i18n_charts } from "../../../i18n/i18n";
import { getModel } from "../../../utils/moMa";
import { fieldInCharts } from "../../../utils/dico";
import { lcRead } from "../../../utils/localStorage";
import { capitalize } from "../../../utils/format";
import Header from "../../shell/Header";
import Alert from "../../widgets/Alert";
import Chart from "./Chart";

import "./Charts.scss";

const Charts = (props) => {
  const e = props.match.params.entity;
  const m = getModel(e);

  useEffect(() => {
    document.title = m ? m.label + " Charts" : "Evolutility";
    window.scrollTo(0, 0);
  });

  if (m) {
    const title = m.title || m.label;
    const chartFields = m.fields.filter(fieldInCharts);
    const nbCharts = chartFields.length;
    const css = classnames(
      "evolutility evol-many-charts",
      nbCharts === 1 ? "single-chart" : null
    );

    const chartTitle = (f) =>
      i18n_charts.objectByField
        .replace("{0}", capitalize(m.namePlural))
        .replace("{1}", f.labelCharts || f.label);
    let charts;

    if (nbCharts === 0) {
      charts = (
        <Alert title="No data" message={i18n_charts.nocharts} type="info" />
      );
    } else if (nbCharts === 1) {
      const f = chartFields[0];
      charts = (
        <Chart
          entity={e}
          field={f}
          title={chartTitle(f)}
          chartType={lcRead(`${m.id}-charts-${f.id}`) || f.chartType}
          key={"c0-" + f.id}
          size="large"
          className="panel-default single-chart"
          canExpand={false}
        />
      );
    } else {
      charts = chartFields.map((f) => (
        <Chart
          entity={e}
          size="small"
          className="panel-default"
          key={"c-" + f.id}
          field={f}
          title={chartTitle(f)}
          chartType={lcRead(m.id + "-charts-" + f.id) || f.chartType}
        />
      ));
    }

    return (
      <div className="">
        <Header
          entity={e}
          model={m}
          title={title}
          count={null}
          cardinality="n"
          view="Charts"
        />
        <div className={css}>{charts}</div>
      </div>
    );
  }
  return <Alert title="Error" message={`Invalid input parameter "${e}".`} />;
};

export default Charts;

Charts.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      entity: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
