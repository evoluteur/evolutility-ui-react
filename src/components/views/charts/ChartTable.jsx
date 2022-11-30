// Evolutility-UI-React :: /views/charts/Chart_Table.js

// Shows a table with the chart data

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { i18n_charts } from "../../../i18n/i18n";

import "./ChartTable.scss";

const percent = (value, total) =>
  `${parseInt((10000 * value) / total, 10) / 100}%`;

const ChartTable = ({ entity, field, sortTable, data, showTotal = true }) => {
  const sLink = "../../" + entity + "?" + field.id + "_id=";
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
            <th onClick={sortTable} className="alignR">
              {i18n_charts.count}
            </th>
            <th onClick={sortTable} className="alignR">
              {i18n_charts.percentage}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d.id}>
              <td>
                <Link to={makeLink(d)}>{d.label || "N/A"}</Link>
              </td>
              <td className="alignR">{d.value}</td>
              <td className="alignR">{percent(d.value, totalCount)}</td>
            </tr>
          ))}
          {showTotal && totalCount && (
            <tr className="footer">
              <td>{i18n_charts.total}</td>
              <td className="alignR">{totalCount}</td>
              <td className="alignR">100%</td>
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
  field: PropTypes.object.isRequired,
  sortTable: PropTypes.func,
  data: PropTypes.array,
};

ChartTable.defaultProps = {
  sortTable: null,
  data: null,
};
