// Evolutility-UI-React :: /views/charts/Chart.js

// Parent Component for Bars charts, Pie charts, or list

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";

import Icon from "react-crud-icons";
import { i18n_charts } from "../../../i18n/i18n";
import Alert from "../../widgets/Alert";
import dao from "../../../utils/dao";
import { lcWrite } from "../../../utils/localStorage";
import Spinner from "../../shell/Spinner";
import ChartTable from "./ChartTable";
import chartProps from "./ChartProps";

import Bars from "./Bars";
import Pie from "./Pie";
// import TreeMap from './TreeMap'

import "./Charts.scss";

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
const expandToggle = (size) => (size === "large" ? "small" : "large");
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

export default class Chart extends React.Component {
  viewId = "chart";

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      chartType: props.chartType, // "Pie" or "Bars" or "Table",
      sortColumn: "",
      sortOrder: "",
      size: props.size || "small",
      loading: true,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.done = true;
  }

  getData() {
    const e = this.props.entity;
    const fid = this.props.field.id;
    let urlparams = ""; // ?token='+localStorage.token

    if (fid) {
      dao
        .getChart(e, fid + urlparams)
        .then((response) => {
          if (!this.done) {
            this.setState({
              data: response.data,
              loading: false,
            });
          }
        })
        .catch((err) => {
          if (!this.done) {
            console.error(err);
            this.setState({
              error: {
                title: "Server error",
                message:
                  "Couldn't retrieve charts data for field \"" + fid + '".',
              },
              loading: false,
            });
          }
        });
    }
  }

  click_view = (evt) => {
    const e = this.props.entity;
    const fid = this.props.field.id;
    const chartsType = evt.currentTarget.dataset.id;

    lcWrite(e + "-charts-" + fid, chartsType);
    this.setState({
      chartType: chartsType,
    });
  };

  click_resize = () => {
    this.setState({
      size: expandToggle(this.state.size),
    });
  };

  sortTable = (evt) => {
    // - client-side sort (we have all the data no need to re-query)
    const sortId = evt.currentTarget.id || "count";
    let data = this.state.data
      ? JSON.parse(JSON.stringify(this.state.data))
      : null;
    if (data && data.length > 1) {
      const sortFn = sortId === "label" ? sortLabel : sortCount;
      if (this.state.sortId === sortId) {
        data = data.reverse();
      } else {
        data = data.sort(sortFn);
      }
      this.setState({
        data,
        sortId,
      });
    }
  };

  render() {
    const props = this.props;
    const { data = [], size, chartType } = this.state;
    let body;

    data.forEach((row) => {
      row.id = "" + row.id;
    });
    const params = {
      data,
      entity: props.entity,
      sortTable: this.sortTable,
    };
    if (this.state.error) {
      // - error
      body = (
        <Alert
          type="danger"
          title={this.state.error.title}
          message={this.state.error.message}
          more={this.state.error.messageMore}
        />
      );
    } else if (this.state.loading) {
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
    } else if (chartType === cTypes.table) {
      // - table view
      body = <ChartTable {...params} field={props.field} />;
    } else if (chartType === cTypes.pie) {
      // - Pie charts
      body = <Pie {...params} />;
    } else {
      // - Bars charts
      body = <Bars {...params} />;
    }
    const iconProps = {
      size: "small",
      theme: "light",
      onClick: this.click_view,
    };
    return (
      <div
        className={
          "evol-chart-holder panel panel-default" +
          (size ? " size-" + size : "")
        }
      >
        <div className="chart-holder">
          {props.canExpend ? (
            <div className="chart-actions-left">
              <Icon
                onClick={this.click_resize}
                name={size === "large" ? "collapse" : "expand"}
                size="small"
                tooltip={size === "large" ? "Collapse" : "Expand"}
              />
            </div>
          ) : null}
          <div className="chart-actions-right">
            {[
              chartIcon("pie", iconProps),
              chartIcon("bars", iconProps),
              chartIcon("table", iconProps),
            ]}
          </div>
          <h3 className="panel-title">{props.title}</h3>
          {body}
        </div>
      </div>
    );
  }
}

Chart.propTypes = {
  entity: PropTypes.string.isRequired,
  field: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.oneOf(chartProps.sizes),
  type: PropTypes.oneOf(chartProps.chartTypes),
  sort: PropTypes.string,
  canExpend: PropTypes.bool,
  chartType: PropTypes.oneOf(["Pie", "Bars", "Table"]),
};

Chart.defaultProps = {
  chartType: cTypes.bars,
  size: "small",
  canExpend: true,
};
