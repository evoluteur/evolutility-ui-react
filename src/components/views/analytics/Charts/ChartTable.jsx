// Evolutility-UI-React :: /views/Charts/Chart_Table.js

// Shows a table with the chart data

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { chartDataPropType } from "./chartProps";
import { i18n_charts } from "../../../../i18n/i18n";

import "./ChartTable.scss";

const percent = (value, total) =>
  `${parseInt((10000 * value) / total, 10) / 100}%`;

const ChartTable = ({ entity, field, sortTable, data, showTotal }) => {
  const sLink = `../../${entity}/list?${field.id}_id=`;
  const makeLink = (d) => {
    let param = "" + (d.id || d.label);
    param = param === "null" ? "null" : "eq." + param;
    return sLink + param;
  };
  let totalCount = 0;
  if (showTotal) {
    data?.forEach((d) => (totalCount += d.value));
  }

  return (
    <div className="chartTable">
      <table className="table table-hover">
        <thead>
          <tr>
            <th id="label" onClick={sortTable}>
              {field.label}
            </th>
            <th onClick={sortTable} className="align-right">
              {i18n_charts.count}
            </th>
            <th onClick={sortTable} className="align-right">
              {i18n_charts.percentage}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d.label}>
              <td>
                <Link to={makeLink(d)}>{d.label || "N/A"}</Link>
              </td>
              <td className="align-right">{d.value}</td>
              <td className="align-right">{percent(d.value, totalCount)}</td>
            </tr>
          ))}
          {showTotal && totalCount && (
            <tr className="footer">
              <td>{i18n_charts.total}</td>
              <td className="align-right">{totalCount}</td>
              <td className="align-right">100%</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;

ChartTable.propTypes = {
  entity: PropTypes.string.isRequired,
  /** Field to aggregate data by */
  field: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  /** Callback function for sorting  */
  sortTable: PropTypes.func,
  /** Chart data */
  data: chartDataPropType,
  /** Add a last row w/ total */
  showTotal: PropTypes.bool,
};

ChartTable.defaultProps = {
  sortTable: null,
  data: null,
  showTotal: true,
};
