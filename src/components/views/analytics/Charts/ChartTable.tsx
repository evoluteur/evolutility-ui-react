// Evolutility-UI-React :: /views/Charts/ChartTable.tsx

// Shows a table with the chart data

import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { i18n_charts } from "i18n/i18n";
import type { ChartDatum } from "types/model";

import "./ChartTable.scss";

const percent = (value: number, total: number) =>
  `${Math.trunc((10000 * value) / total) / 100}%`;

export interface ChartTableProps {
  entity: string;
  /** Field to aggregate data by */
  field: { id: string; label: string };
  /** Callback function for sorting  */
  sortTable?: ((evt: MouseEvent<HTMLElement>) => void) | null;
  /** Chart data */
  data?: ChartDatum[] | null;
  /** Add a last row w/ total */
  showTotal?: boolean;
}

const ChartTable = ({
  entity,
  field,
  sortTable = null,
  data = null,
  showTotal = true,
}: ChartTableProps) => {
  const sLink = `../${entity}/list?${field.id}=`;
  const makeLink = (d: ChartDatum) => {
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
            <th id="label" onClick={sortTable ?? undefined}>
              {field.label}
            </th>
            <th onClick={sortTable ?? undefined} className="align-right">
              {i18n_charts.count}
            </th>
            <th onClick={sortTable ?? undefined} className="align-right">
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
