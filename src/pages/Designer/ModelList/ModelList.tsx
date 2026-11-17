// Evolutility-UI-React :: pages/Designer/ModelList/ModelList.tsx
// List of the models stored on the server.
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useModelDefs } from "dao/queries";
import { i18n_designer as i18n } from "i18n/i18n";
import { pixPath, evoPath } from "utils/format";
import Alert from "components/ui/Alert/Alert";
import Button from "components/ui/Button/Button";
import Spinner from "components/ui/Spinner/Spinner";

import "../Designer.scss";

const dateTime = (d?: string) => (d ? new Date(d).toLocaleString() : "");

const ModelList = () => {
  const { data, error, isLoading } = useModelDefs();

  useEffect(() => {
    document.title = "Evolutility " + i18n.title;
  }, []);

  return (
    <div className="evo-designer" data-testid="designer-list">
      <div className="evo-page-header">
        <h1 className="page-title">{i18n.title}</h1>
      </div>
      <p>{i18n.intro}</p>
      <p>
        <Button
          type="primary"
          icon="add"
          label={i18n.newModel}
          url="/designer/new"
        />
      </p>
      {isLoading && <Spinner />}
      {error && (
        <Alert title={i18n.notFromServer} message={(error as Error).message} />
      )}
      {data && (
        <table className="table evo-designer-models">
          <thead>
            <tr>
              <th>{i18n.model}</th>
              <th>{i18n.id}</th>
              <th>{i18n.table}</th>
              <th className="align-right">{i18n.fields}</th>
              <th className="align-right">{i18n.version}</th>
              <th>{i18n.active}</th>
              <th>{i18n.updated}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {data.map((m) => (
              <tr key={m.id}>
                <td>
                  <Link to={`/designer/${m.id}`}>
                    {m.icon && (
                      <img className="e-icon" src={pixPath + m.icon} alt="" />
                    )}
                    {m.title || m.namePlural || m.id}
                  </Link>
                </td>
                <td>{m.id}</td>
                <td>{m.table}</td>
                <td className="align-right">{m.fields?.length || 0}</td>
                <td className="align-right">{m._version}</td>
                <td>{m.active ? "✓" : ""}</td>
                <td>{dateTime(m._updatedAt)}</td>
                <td>
                  {m.active && (
                    <Link to={`/${evoPath}/${m.id}/list`}>{i18n.viewData}</Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ModelList;
