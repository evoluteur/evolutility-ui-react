// Evolutility-UI-React :: /views/charts/Chart.js

// Parent Component for Bars charts, Pie charts, or list

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Icon from "react-crud-icons";
import { i18n_charts, i18n_actions } from "../../../i18n/i18n";
import Alert from "../../widgets/Alert";
import dao from "../../../utils/dao";
import { lcWrite } from "../../../utils/localStorage";
import Spinner from "../../shell/Spinner";
import ChartTable from "./ChartTable";
import { chartSizes, chartTypes } from "./chartProps";

import Bars from "./Bars";
import Pie from "./Pie";
// import TreeMap from './TreeMap'

import "./Charts.scss";

//#region  ---------------- Helpers ----------------
const cTypes = {
  bars: "bars",
  pie: "pie",
  table: "table",
};

const sortLabel = (a, b) => (a.label || "").localeCompare(b.label || "");
const sortCount = (a, b) => {
  if (a.value < b.value) {
    return 1;
  }
  if (b.value < a.value) {
    return -1;
  }
  return 0;
};
const cssActive = (active) => (active ? "active" : "");
const chartIcon = (chartType, props) => (
  <Icon
    id={chartType}
    key={chartType}
    {...props}
    name={chartType === "table" ? "list" : chartType}
    tooltip={i18n_charts[chartType]}
    className={cssActive(chartType === props.chartType)}
  />
);
//#endregion

const Chart = ({ entity, field, title, size, chartType, canExpand }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [curSize, setCurSize] = useState(size);
  const [curChartType, setCurChartType] = useState(chartType);
  const [curSortId, setCurSortId] = useState("count");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = () => {
      const fid = field.id;
      if (fid) {
        dao.getChart(entity, fid).then((response) => {
          if (response.errors) {
            console.error(response.errors);
            const msg = response.errors[0]?.message;
            setError({
              title: "Server error",
              message: `Couldn't retrieve charts data for field "${fid}". ${msg}`,
            });
          }
          setData(response.data);
          setLoading(false);
        });
      }
    };
    getData();
  }, [entity, field]);

  const clickView = (evt) => {
    const chartsType = evt.currentTarget.dataset.id;
    lcWrite(entity + "-charts-" + field.id, chartsType);
    setCurChartType(chartsType);
  };

  const clickResize = () => {
    setCurSize(curSize !== "large" ? "large" : "small");
  };

  const sortTable = (evt) => {
    // - client-side sort (we have all the data no need to re-query)
    const sortId = evt.currentTarget.id || "count";
    if (data?.length > 1) {
      let data2 = JSON.parse(JSON.stringify(data));
      const sortFn = sortId === "label" ? sortLabel : sortCount;
      if (curSortId === sortId) {
        data2 = data2.reverse();
      } else {
        data2 = data2.sort(sortFn);
      }
      setData(data2);
      setCurSortId(sortId);
    }
  };

  const params = {
    data,
    entity,
    sortTable,
  };

  let body;
  if (error) {
    // - error
    body = (
      <Alert
        type="danger"
        title={error.title}
        message={error.message}
        more={error.messageMore}
      />
    );
  } else if (loading) {
    // - loading
    body = <Spinner />;
  } else if (!data || data.length === 0) {
    // - no data
    body = (
      <Alert
        type="info"
        title={i18n_charts.noData}
        message={i18n_charts.emptyData}
      />
    );
  } else if (curChartType === cTypes.table) {
    // - table view
    body = <ChartTable {...params} field={field} />;
  } else if (curChartType === cTypes.pie) {
    // - Pie charts
    body = <Pie {...params} showLegend={curSize === "large"} />;
  } else {
    // - Bars charts
    body = <Bars {...params} />;
  }

  const iconProps = {
    size: "small",
    theme: "light",
    onClick: clickView,
  };

  const actionsIcons = (
    <>
      {canExpand && (
        <div className="chart-actions-left">
          <Icon
            onClick={clickResize}
            name={curSize === "large" ? "collapse" : "expand"}
            size="small"
            tooltip={
              curSize === "large" ? i18n_actions.collapse : i18n_actions.expand
            }
          />
        </div>
      )}
      <div className="chart-actions-right">
        {[
          chartIcon("pie", iconProps),
          chartIcon("bars", iconProps),
          chartIcon("table", iconProps),
        ]}
      </div>
    </>
  );

  return (
    <div className={"evol-chart-holder panel panel-default size-" + curSize}>
      <div className="chart-holder">
        <h3 className="panel-title">{title}</h3>
        {body}
      </div>
      {actionsIcons}
    </div>
  );
};

export default Chart;

Chart.propTypes = {
  entity: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(chartSizes),
  chartType: PropTypes.oneOf(chartTypes),
  canExpand: PropTypes.bool,
};

Chart.defaultProps = {
  chartType: cTypes.bars,
  size: "small",
  canExpand: true,
};
