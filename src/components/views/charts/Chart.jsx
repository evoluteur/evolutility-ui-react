// Evolutility-UI-React :: /views/charts/Chart.js

// Parent Component for charts w/ togglee Bars, Pie, or table

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// #region ---------------- Imports ----------------
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import classnames from "classnames";
import Icon from "react-crud-icons";
import { i18n_charts, i18n_actions, i18n_errors } from "../../../i18n/i18n";
import Alert from "../../widgets/Alert";
import { getChart } from "../../../utils/dao";
import { lcWrite } from "../../../utils/localStorage";
import Spinner from "../../widgets/Spinner";
import ChartTable from "./ChartTable";
import { chartSizes, chartTypes } from "./chartProps";

import Bars from "./Bars";
import Pie from "./Pie";
// import TreeMap from './TreeMap'

import "./Charts.scss";
// #endregion

//#region  ---------------- Helpers ----------------
const cTypes = {
  bars: "bars",
  pie: "pie",
  table: "table",
};

const sortByLabel = (a, b) => (a.label || "").localeCompare(b.label || "");
const sortByCount = (a, b) => a.value - b.value;

const chartIcon = (chartType, props) => {
  return (
    <Icon
      id={chartType}
      key={chartType}
      {...props}
      name={chartType === "table" ? "list" : chartType}
      tooltip={i18n_charts[chartType]}
      className={chartType === props.chartType ? "active" : ""}
    />
  );
};
const isFunction = (x) => typeof x === "function";
//#endregion

const Chart = ({
  entity,
  field,
  title,
  size,
  chartType,
  setExpanded,
  isExpanded,
  hidden,
  className,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [curChartType, setCurChartType] = useState(chartType);
  const [curSortId, setCurSortId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    let done = false;
    const getData = () => {
      const fid = field?.id;
      if (fid) {
        // TODO timeout to show spinner
        // setLoading(true); // Loose animation w/ it
        getChart(entity, fid).then((response) => {
          if (done) {
            return;
          }
          if (response.errors) {
            setError(response.errors[0]);
          } else {
            setData(response.data);
          }
          setLoading(false);
        });
      }
    };
    getData();

    return () => {
      done = true;
    };
  }, [entity, field]);

  const clickView = (evt) => {
    const chartsType = evt.currentTarget.dataset.id;
    lcWrite(entity + "-charts-" + field.id, chartsType);
    setCurChartType(chartsType);
  };

  const clickResize = () => {
    setExpanded(field.id, !isExpanded);
  };

  const sortTable = (evt) => {
    // - client-side sort (we have all the data no need to re-query)
    const sortId = evt.currentTarget.id || "count";
    if (data?.length > 1) {
      let data2 = JSON.parse(JSON.stringify(data));
      if (curSortId === sortId) {
        data2 = data2.reverse();
      } else {
        const sortFn = sortId === "label" ? sortByLabel : sortByCount;
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
    className,
  };

  let body;
  if (error) {
    // - error
    body = (
      <Alert
        type="danger"
        title={i18n_errors.serverError}
        message={error.message}
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
  } else if (curChartType === cTypes.pie) {
    // - Pie charts
    body = <Pie {...params} showLegend={size === "large"} />;
  } else if (curChartType === cTypes.table) {
    // - Table view
    body = <ChartTable {...params} field={field} />;
  } else {
    // - Bars charts
    body = <Bars {...params} />;
  }

  const iconProps = {
    size: "small",
    theme: "light",
    onClick: clickView,
    chartType: curChartType,
  };

  const actionsIcons = (
    <>
      {isFunction(setExpanded) && (
        <div className="chart-actions-left">
          <Icon
            onClick={clickResize}
            name={isExpanded ? "collapse" : "expand"}
            size="small"
            tooltip={isExpanded ? i18n_actions.collapse : i18n_actions.expand}
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
    <div
      className={classnames("chart-card panel size-" + size, {
        "hidden-chart": hidden,
      })}
    >
      <div className="chart-content">
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
  /** Field to aggregate data by */
  field: PropTypes.object.isRequired,
  /** Chart title */
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(chartSizes),
  chartType: PropTypes.oneOf(chartTypes),
  /** Callback function to expend the chart */
  setExpanded: PropTypes.func,
  /** Show Chart in full screen */
  expanded: PropTypes.bool,
  hidden: PropTypes.bool,
  className: PropTypes.string,
};

Chart.defaultProps = {
  chartType: cTypes.bars,
  size: "small",
  setExpanded: null,
  expanded: false,
  hidden: false,
  className: "panel",
};
