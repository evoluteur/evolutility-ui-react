/* eslint-disable react-hooks/exhaustive-deps */
// #region ---------------- Imports ----------------
import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactElement,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { i18n_actions, i18n_msg, i18n_errors } from "i18n/i18n";
import { useOne, useLOVs, useSaveOne } from "dao/queries";
import config from "config";
import { capitalize } from "utils/format";
import { getModel } from "utils/moMa";
import { logActivity } from "utils/activity";
import { diffData } from "utils/validation";
import Edit from "./Edit/Edit";
import Browse from "./Browse/Browse";
import ViewHeader from "components/views/ViewHeader/ViewHeader";
import Alert from "components/ui/Alert/Alert";
import Spinner from "components/ui/Spinner/Spinner";
import type { Model, RecordData } from "types/model";
import type { LovsResult } from "types/api";

import "./One.scss";
// #endregion

// #region ---------------- Helpers ----------------
const { withActivity } = config;

const getDefaultData = (model: Model | null | undefined): RecordData => {
  const defaultData: RecordData = {};
  model?.fields.forEach((f) => {
    if (f.defaultValue != null) {
      defaultData[f.id] = f.defaultValue;
    }
    if (f.type === "lov" && defaultData[f.id] == null) {
      defaultData[f.id] = "";
    }
  });
  return defaultData;
};

const recordTitle = (
  m: Model | null | undefined,
  data: RecordData | null | undefined,
  isNew: boolean,
): string => {
  if (m) {
    if (isNew) {
      return `New ${m.name || "item"}`;
    }
    if (data?.id) {
      if (m.titleFunction) {
        return m.titleFunction(Object.assign({}, data));
      }
      return (m.titleField && data[m.titleField]) || capitalize(m.name);
    }
    return m.title || "";
  }
  return "Model not found";
};

const addModelLOVs = (model: Model, lovs: LovsResult): void => {
  // - Add missing lov field lists to model
  model._lovNoList?.forEach((fid) => {
    const f = model.fieldsH[fid];
    f.list = lovs[fid];
  });
  delete model._lovNoList;
};

// #endregion

const One = () => {
  // - record being edited, kept w/ the record it was initialized from,
  //   so that it is reset as soon as the data changes (load, save, new record)
  const [edited, setEdited] = useState<{
    source: RecordData | null;
    data: RecordData;
  } | null>(null);
  const navigate = useNavigate();
  const { entity, view, id } = useParams<{
    entity: string;
    view: string;
    id: string;
  }>();
  const model = getModel(entity);
  const isNew = id === "0";
  const recordId = id && !isNew ? parseInt(id, 10) : 0;

  // - lists of values missing from the model (for dropdowns)
  const lovsQuery = useLOVs(entity as string, model?._lovNoList);
  const oneQuery = useOne(entity as string, recordId);

  const isLoading = oneQuery.isLoading || lovsQuery.isLoading;
  const error = oneQuery.error || lovsQuery.error;
  const defaultData = useMemo(() => getDefaultData(model), [entity, model]);
  const data = isNew ? defaultData : oneQuery.data || null;
  const saveOne = useSaveOne(entity as string);

  const userData = edited?.source === data ? edited.data : data;
  const setUserData = (newData: RecordData) =>
    setEdited({ source: data, data: newData });

  const viewData = view === "edit" ? userData : data;
  const title =
    (error || isLoading) && !isNew
      ? capitalize(model?.name)
      : recordTitle(model, viewData, isNew);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  // - add the lists of values to the model (once loaded)
  useEffect(() => {
    if (model && lovsQuery.data) {
      addModelLOVs(model, lovsQuery.data);
    }
  }, [model, lovsQuery.data]);

  // - track the last viewed records
  useEffect(() => {
    if (withActivity && !isNew && data && model?.titleField) {
      logActivity(
        entity as string,
        id as string,
        data[model.titleField],
        "read",
      );
    }
  }, [entity, id, data]);

  const onFieldChange = useCallback(
    (fid: string, value: unknown) => {
      const newData: RecordData = structuredClone(userData || {});
      const v = value as any;
      if (v?.name && (v.name as ReactElement)?.type === "span") {
        const children = v.name.props.children;
        newData[fid] = {
          id: v.id,
          name: children[1],
          icon: children[0]?.props?.id,
        };
      } else {
        newData[fid] = value;
      }
      setUserData(newData);
    },
    [userData],
  );

  const onSave = useCallback(() => {
    if (!model) {
      return;
    }
    const delta = diffData(model, data, userData);
    if (!delta) {
      toast.info(i18n_msg.noUpdate);
      return;
    }
    saveOne.mutate(
      {
        id: recordId || null,
        data: recordId ? delta : userData || {},
      },
      {
        onSuccess: (savedData) => {
          toast.success(
            recordId
              ? i18n_actions.updated.replace("{0}", capitalize(model.name))
              : i18n_actions.added.replace("{0}", model.name),
          );
          if (!recordId) {
            navigate(`../${entity}/edit/${savedData?.id}`);
          }
        },
        onError: (err) => {
          toast.error(err.message);
        },
      },
    );
  }, [entity, recordId, navigate, data, userData, model, saveOne]);

  const body = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <Alert title={i18n_errors.serverError} message={error.message} />;
    }
    if (!model) {
      return null;
    }
    return view === "edit" ? (
      <Edit
        entity={entity as string}
        model={model}
        data={viewData || {}}
        onFieldChange={onFieldChange}
        onSave={onSave}
      />
    ) : (
      <Browse entity={entity as string} model={model} data={viewData || {}} />
    );
  };

  return (
    <div className={`evol-one model_${entity}`}>
      <ViewHeader
        id={id}
        entity={entity as string}
        title={title}
        comments={data?.nb_comments}
        view={view}
      />
      {body()}
    </div>
  );
};

export default One;
