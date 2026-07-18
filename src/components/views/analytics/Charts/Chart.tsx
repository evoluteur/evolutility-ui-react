// Evolutility-UI-React :: /views/Charts/Chart.tsx

// Parent Component for charts w/ togglee Bars, Pie, or table

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

// #region ---------------- Imports ----------------
import { useState, useEffect, type MouseEvent } from "react";
import classnames from "classnames";
import Icon, { type IconClickHandler } from "components/widgets/Icon/Icon";
import { i18n_charts, i18n_actions, i18n_errors } from "i18n/i18n";
import Alert from "components/widgets/Alert/Alert";
import { getChart } from "dao/dao";
import { lcWrite } from "utils/localStorage";
import Spinner from "components/widgets/Spinner/Spinner";
import ChartTable from "./ChartTable";
import type { ChartSize, ChartType } from "./chartProps";
import Bars from "./Bars";
import Pie from "./Pie";
// #endregion
import type { Field, ChartDatum } from "types/model";
import type { GqlError } from "types/api";

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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ChartDatum[]>([]);
  const [curChartType, setCurChartType] = useState<ChartType>(chartType);
  const [curSortId, setCurSortId] = useState("");
  const [error, setError] = useState<GqlError | null>(null);

  useEffect(() => {
    let done = false;
    setError(null);
    const fid = field?.id;
    if (fid) {
      // TODO timeout to show spinner
      // setIsLoading(true); // Loose animation w/ it
      getChart(entity, fid).then((response) => {
        if (done) {
          return;
        }
        if ("errors" in response) {
          setError(response.errors[0]);
        } else {
          setData(response.data || []);
        }
        setIsLoading(false);
      });
    }
    return () => {
      done = true;
    };
  }, [entity, field]);

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
