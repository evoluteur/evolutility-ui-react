// Evolutility-UI-React :: /views/charts/Chart_Table.js

// Shows a table with the chart data

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { i18n_charts } from "../../../i18n/i18n";

import "./ChartTable.scss";

const percent = (value, total) =>
  `${parseInt((10000 * value) / total, 10) / 100}%`;

const ChartTable = ({ entity, field, sortTable, data }) => {
  const sLink = "../../" + entity + "?" + field.id + "=";
  const makeLink = (d) => {
    let param = "" + (d.id || d.label);
    param = param === "null" ? "null" : "eq." + param;
    return sLink + param;
  };
  // const data = data;

  let totalCount = 0;
  data.forEach((d) => (totalCount += d.value));

  return (
    <div className="chartTable">
      <table className="table table-hover">
        <thead>
          <tr>
            <th id="label" onClick={sortTable}>
              {field.label}
            </th>
            <th onClick={sortTable} className="alignR">
              Count
            </th>
            <th onClick={sortTable} className="alignR">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((d) => (
                <tr key={d.value + d.id}>
                  <td>
                    {d.label ? <Link to={makeLink(d)}>{d.label}</Link> : " N/A"}
                  </td>
                  <td className="alignR">{d.value}</td>
                  <td className="alignR">{percent(d.value, totalCount)}</td>
                </tr>
              ))
            : null}
          {totalCount ? (
            <tr className="footer">
              <td>{i18n_charts.total}</td>
              <td className="alignR">{totalCount}</td>
              <td className="alignR">100%</td>
            </tr>
          ) : null}
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
