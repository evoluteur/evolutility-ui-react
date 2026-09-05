// Evolutility-UI-React :: /views/Charts/Chart.tsx

// Parent Component for charts w/ togglee Bars, Pie, or table

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

// #region ---------------- Imports ----------------
import { useState, type MouseEvent } from "react";
import classnames from "classnames";
import Icon, { type IconClickHandler } from "components/ui/Icon/Icon";
import { i18n_charts, i18n_actions, i18n_errors } from "i18n/i18n";
import Alert from "components/ui/Alert/Alert";
import { useChart } from "dao/queries";
import { lcWrite } from "utils/localStorage";
import Spinner from "components/ui/Spinner/Spinner";
import ChartTable from "./ChartTable";
import type { ChartSize, ChartType } from "./chartProps";
import Bars from "./Bars";
import Pie from "./Pie";
// #endregion
import type { Field, ChartDatum } from "types/model";

import "./Charts.scss";

//#region   ----- Helpers ----------------
const sortByLabel = (a: ChartDatum, b: ChartDatum) =>
  (a.label || "").localeCompare(b.label || "");
const sortByCount = (a: ChartDatum, b: ChartDatum) => a.value - b.value;

const ChartIcon = ({
  chartType,
  props,
}: {
  chartType: ChartType;
  props: { onClick: IconClickHandler; chartType: ChartType };
}) => (
  <Icon
    id={chartType}
    {...props}
    name={chartType === "table" ? "list" : chartType}
    tooltip={i18n_charts[chartType]}
    className={chartType === props.chartType ? "active" : ""}
    size="small"
    theme="light"
  />
);
//#endregion

export interface ChartProps {
  entity: string;
  /** Field to aggregate data by */
  field: Field;
  /** Chart title */
  title: string;
  size?: ChartSize;
  chartType?: ChartType;
  /** Callback function to expend the chart */
  setExpanded?: ((fid: string, expanded: boolean) => void) | null;
  /** Show Chart in full screen */
  isExpanded?: boolean;
  hidden?: boolean | null;
  className?: string;
}

const Chart = ({
  entity,
  field,
  title,
  size = "small",
  chartType = "bars",
  setExpanded = null,
  isExpanded = false,
  hidden = false,
  className = "panel",
}: ChartProps) => {
  const [curChartType, setCurChartType] = useState<ChartType>(chartType);
  // - data sorted client-side (kept w/ the query data it was sorted from,
  //   so that it is dropped as soon as the chart data changes)
  const [sorted, setSorted] = useState<{
    source: ChartDatum[] | undefined;
    sortId: string;
    data: ChartDatum[];
  } | null>(null);

  const { data: chartData, isLoading, error } = useChart(entity, field?.id);
  const isSorted = !!sorted && sorted.source === chartData;
  const data = isSorted ? sorted.data : chartData || [];
  const curSortId = isSorted ? sorted.sortId : "";

  const clickView: IconClickHandler = (evt) => {
    const chartsType = (evt.currentTarget as HTMLElement).dataset
      .id as ChartType;
    lcWrite(entity + "-charts-" + field.id, chartsType);
    setCurChartType(chartsType);
  };

  const clickResize = () => {
    setExpanded?.(field.id, !isExpanded);
  };

  const sortTable = (evt: MouseEvent<HTMLElement>) => {
    // - client-side sort (we have all the data no need to re-query)
    const sortId = evt.currentTarget.id || "count";
    if (data?.length > 1) {
      let data2 = structuredClone(data);
      if (curSortId === sortId) {
        data2 = data2.reverse();
      } else {
        const sortFn = sortId === "label" ? sortByLabel : sortByCount;
        data2 = data2.sort(sortFn);
      }
      setSorted({ source: chartData, sortId, data: data2 });
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
  } else if (isLoading) {
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
  } else if (curChartType === "pie") {
    // - Pie charts
    body = <Pie {...params} showLegend={size === "large"} />;
  } else if (curChartType === "table") {
    // - Table view
    body = <ChartTable {...params} field={field} />;
  } else {
    // - Bars charts
    body = <Bars {...params} />;
  }

  const iconProps = {
    onClick: clickView,
    chartType: curChartType,
  };

  const actionsIcons = (
    <>
      {typeof setExpanded === "function" && (
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
        <ChartIcon chartType="pie" props={iconProps} />
        <ChartIcon chartType="bars" props={iconProps} />
        <ChartIcon chartType="table" props={iconProps} />
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
        <h2 className="panel-title">{title}</h2>
        {body}
      </div>
      {actionsIcons}
    </div>
  );
};

export default Chart;
