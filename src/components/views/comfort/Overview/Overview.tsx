// #region ---------------- Imports ----------------
import { useState, useEffect, type ReactNode, type ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "components/widgets/Icon/Icon";
import { getModel } from "utils/moMa";
import { fieldInCharts } from "utils/dico";
import { views } from "utils/dicoViews";
import { capitalize } from "utils/format";
import { lcWrite, lcRead } from "utils/localStorage";
import ErrorBoundary from "components/ErrorBoundary";
import { i18n_actions as i18n } from "i18n/i18n";
import ViewHeader from "components/views/ViewHeader/ViewHeader";
import Chart from "components/views/analytics/Charts/Chart";
import SearchBox from "./SearchBox";
import Activity from "./Activity";
import InvalidRoute from "./InvalidRoute";
import type { Field } from "types/model";
// #endregion

import "./Overview.scss";

const Overview = () => {
  const { entity } = useParams<{ entity: string }>();
  const m = getModel(entity);
  const title = capitalize(m?.namePlural) + " " + i18n.overview;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = title;
  }, [title]);

  const chartFields = m?.fields.filter(fieldInCharts);

  const lcKey = `../${entity}-overview-chart`;
  const lcChartField = lcRead(lcKey);

  const [chartField, setChartField] = useState<Field | string | undefined>(
    !!m && lcChartField ? m.fieldsH[lcChartField] : chartFields?.[0] || "",
  );

  if (m === null) {
    return <InvalidRoute entity={entity} />;
  } else {
    const chartFieldChanged = (evt: ChangeEvent<HTMLSelectElement>) => {
      const target = evt.currentTarget;
      const fid = target.selectedOptions[0].value;
      lcWrite(lcKey, fid);
      setChartField(m.fieldsH[fid]);
    };

    const urlBegin = `../${entity}/`;
    const ViewLink = ({
      id,
      label,
      icon,
    }: {
      id: string;
      label: string;
      icon: string;
    }): ReactNode => (
      <Link to={urlBegin + id}>
        <Icon name={icon} theme="light" />
        <span>{label}</span>
      </Link>
    );

    const Actions = () => (
      <div className="ovw-actions">
        <div>
          <ViewLink {...views.list} />
          <ViewLink {...views.cards} />
        </div>
        <div>
          {!m.noCharts && <ViewLink {...views.charts} />}
          {!m.noStats && <ViewLink {...views.stats} />}
        </div>
        <div>
          <ViewLink id="edit/0" label={"New " + m.name} icon="add" />
        </div>
      </div>
    );

    const placeHolder = i18n.searchX.replace("{0}", m.namePlural);
    const body = (
      <div className="ovw-body">
        <Actions />
        <SearchBox entity={entity as string} placeHolder={placeHolder} />
        <div className="ovw-text"></div>
        <div className="cols-2">
          <Activity entity={entity as string} />
          {!m.noCharts && (
            <ErrorBoundary>
              <div className="ovw-chart">
                <Chart
                  entity={entity as string}
                  field={chartField as Field}
                  title=""
                  chartType="pie"
                  size="small"
                  className="panel"
                />
                <select
                  value={
                    typeof chartField === "string" ? chartField : chartField?.id
                  }
                  onChange={chartFieldChanged}
                  className="form-control"
                >
                  {chartFields?.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </ErrorBoundary>
          )}
        </div>
      </div>
    );

    return (
      <div className="evol-overview">
        <ViewHeader entity={entity as string} title={title} view="overview" />
        {body}
      </div>
    );
  }
};

export default Overview;
