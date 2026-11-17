// Evolutility-UI-React :: pages/Designer/ModelEdit/ModelEdit.tsx
// Edit a model stored on the server (as JSON), check the changes to the
// database before saving, and load old versions.
// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteModelDef,
  useFetchModelVersion,
  useModelDef,
  useModelHistory,
  useSaveModelDef,
} from "dao/queries";
import { ApiError } from "dao/api";
import { i18n_designer as i18n } from "i18n/i18n";
import { evoPath } from "utils/format";
import Alert from "components/ui/Alert/Alert";
import Button from "components/ui/Button/Button";
import Spinner from "components/ui/Spinner/Spinner";
import { modelToText, newModelTemplate, textToModel } from "../designerUtils";
import type { ModelDef, SaveModelResult } from "types/api";

import "../Designer.scss";

const fill = (txt: string, ...values: (string | number)[]) =>
  values.reduce<string>((t, v, i) => t.replace(`{${i}}`, String(v)), txt);

interface Feedback {
  result?: SaveModelResult;
  error?: string;
  invalids?: string[];
  conflict?: boolean;
  info?: string;
}

const ModelEdit = () => {
  const { id = "" } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useModelDef(
    isNew ? undefined : id,
  );
  const { data: history } = useModelHistory(isNew ? undefined : id);
  const fetchVersion = useFetchModelVersion();
  const saveModel = useSaveModelDef();
  const deleteModel = useDeleteModelDef();

  // - text edited by the user, reset when the model is (re)loaded
  const source: ModelDef | undefined = isNew ? newModelTemplate : data;
  const [edited, setEdited] = useState<{
    source: ModelDef | undefined;
    text: string;
  } | null>(null);
  const text =
    edited && edited.source === source ? edited.text : modelToText(source);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    document.title = `Evolutility ${i18n.title} - ${isNew ? i18n.newModel : id}`;
  }, [id, isNew]);

  const onChange = (evt: ChangeEvent<HTMLTextAreaElement>) =>
    setEdited({ source, text: evt.target.value });

  const parsed = (): ModelDef | null => {
    try {
      return { ...textToModel(text), _version: data?._version };
    } catch (err) {
      setFeedback({ error: fill(i18n.invalidJSON, (err as Error).message) });
      return null;
    }
  };

  const onError = (err: Error) => {
    const apiErr = err as ApiError;
    setFeedback({
      error: apiErr.invalids ? apiErr.message.split(":")[0] : apiErr.message,
      invalids: apiErr.invalids?.map(
        (i) => `${i.id}: ${i.condition} (${JSON.stringify(i.value)})`,
      ),
      conflict: apiErr.status === 409 && !isNew,
    });
  };

  const save = (dryRun: boolean) => {
    const model = parsed();
    if (!model) return;
    saveModel.mutate(
      { model, isNew, dryRun },
      {
        onSuccess: (result) => {
          setFeedback({ result });
          if (!dryRun) {
            toast.success(
              isNew
                ? fill(i18n.created, result.model.id)
                : fill(
                    i18n.saved,
                    result.model.id,
                    result.model._version || "",
                  ),
            );
            setEdited(null);
            if (isNew) {
              navigate(`/designer/${result.model.id}`);
            }
          }
        },
        onError,
      },
    );
  };

  const onDelete = () => {
    if (window.confirm(fill(i18n.deleteConfirm, id))) {
      deleteModel.mutate(id, {
        onSuccess: () => {
          toast.success(fill(i18n.deleted, id));
          navigate("/designer");
        },
        onError,
      });
    }
  };

  const onReload = () => {
    setEdited(null);
    setFeedback(null);
    refetch();
  };

  const onLoadVersion = (evt: ChangeEvent<HTMLSelectElement>) => {
    const version = Number(evt.target.value);
    evt.target.value = "";
    if (!version) return;
    fetchVersion(id, version).then((m) => {
      setEdited({ source, text: modelToText(m) });
      setFeedback({ info: fill(i18n.versionLoaded, version) });
    }, onError);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div className="evo-designer">
        <Alert title={i18n.notFromServer} message={(error as Error).message} />
      </div>
    );
  }

  const r = feedback?.result;
  return (
    <div className="evo-designer" data-testid="designer-edit">
      <div className="evo-page-header">
        <h1 className="page-title">
          <Link to="/designer">{i18n.title}</Link>
          {" / "}
          {isNew ? i18n.newModel : data?.title || id}
          {!isNew && data?._version && (
            <span className="evo-designer-version">
              {i18n.version} {data._version}
            </span>
          )}
        </h1>
      </div>

      <div className="evo-designer-toolbar">
        <Button label={i18n.check} icon="check" onClick={() => save(true)} />
        <Button
          type="primary"
          label={i18n.save}
          icon="save"
          onClick={() => save(false)}
        />
        {!isNew && (
          <>
            {data?.active && (
              <Button
                label={i18n.viewData}
                icon="list"
                url={`/${evoPath}/${id}/list`}
              />
            )}
            {history && history.length > 1 && (
              <select
                className="form-control evo-designer-history"
                aria-label={i18n.history}
                defaultValue=""
                onChange={onLoadVersion}
              >
                <option value="">{i18n.loadVersion}</option>
                {history.map((h) => (
                  <option key={h.version} value={h.version}>
                    {i18n.version} {h.version} -{" "}
                    {new Date(h.savedAt).toLocaleString()}
                  </option>
                ))}
              </select>
            )}
            <Button label={i18n.delete} icon="delete" onClick={onDelete} />
          </>
        )}
        {(saveModel.isPending || deleteModel.isPending) && <Spinner />}
      </div>

      {feedback?.error && (
        <Alert
          title={i18n.errors}
          message={
            <>
              <div>{feedback.error}</div>
              {feedback.invalids && (
                <ul>
                  {feedback.invalids.map((msg) => (
                    <li key={msg}>{msg}</li>
                  ))}
                </ul>
              )}
              {feedback.conflict && (
                <p>
                  {i18n.conflict}{" "}
                  <Button label={i18n.reload} onClick={onReload} />
                </p>
              )}
            </>
          }
        />
      )}
      {feedback?.info && <Alert type="info" message={feedback.info} />}
      {r && r.warnings.length > 0 && (
        <Alert
          type="warning"
          title={i18n.warnings}
          message={
            <ul>
              {r.warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          }
        />
      )}
      {r && (
        <Alert
          type={r.dryRun ? "info" : "success"}
          title={i18n.sqlTitle}
          message={
            r.sql.length ? (
              <pre className="evo-designer-sql">{r.sql.join("\n")}</pre>
            ) : (
              i18n.noChanges
            )
          }
        />
      )}

      <textarea
        className="form-control evo-designer-json"
        aria-label={i18n.json}
        spellCheck={false}
        value={text}
        onChange={onChange}
        rows={32}
      />
    </div>
  );
};

export default ModelEdit;
