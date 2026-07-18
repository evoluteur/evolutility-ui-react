/* eslint-disable react-hooks/exhaustive-deps */
// #region ---------------- Imports ----------------
import { useEffect, useState, useCallback, type ReactElement } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { i18n_actions, i18n_msg, i18n_errors } from "i18n/i18n";
import { getOne, updateOne, insertOne, getLOVs } from "dao/dao";
import config from "config";
import { capitalize } from "utils/format";
import { getModel } from "utils/moMa";
import { logActivity } from "utils/activity";
import { diffData } from "utils/validation";
import Edit from "./Edit/Edit";
import Browse from "./Browse/Browse";
import ViewHeader from "components/views/ViewHeader/ViewHeader";
import Alert from "components/widgets/Alert/Alert";
import Spinner from "components/widgets/Spinner/Spinner";
import type { Model, RecordData } from "types/model";
import { isGqlError, type GqlError } from "types/api";

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

const addModelLOVs = (model: Model, lovs: Record<string, unknown>): void => {
  // - Add missing lov field lists to model
  model._lovNoList?.forEach((fid) => {
    const f = model.fieldsH[fid];
    f.list = lovs[fid] as any;
  });
  delete model._lovNoList;
};

// #endregion

const One = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<RecordData | null>(null);
  const [userData, setUserData] = useState<RecordData | null>(null);
  const [error, setError] = useState<GqlError | null>(null);
  const navigate = useNavigate();
  const { entity, view, id } = useParams<{
    entity: string;
    view: string;
    id: string;
  }>();
  const model = getModel(entity);
  const isNew = id === "0";
  const viewData = view === "edit" ? userData : data;
  const title =
    (error || isLoading) && !isNew
      ? capitalize(model?.name)
      : recordTitle(model, viewData, isNew);

  const setAllData = (data: RecordData | null) => {
    setData(data);
    setUserData(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    document.title = title || "";
  }, [title]);

  useEffect(() => {
    let done = false;
    setError(null);
    setIsLoading(true);
    if (isNew) {
      const setDefaultData = () => {
        const defaults = getDefaultData(model);
        setAllData(defaults);
        setIsLoading(false);
      };
      if (model?._lovNoList) {
        getLOVs(entity as string).then((data) => {
          if (done) {
            return;
          }
          if (isGqlError(data)) {
            setError(data.errors[0]);
          } else {
            addModelLOVs(model, data);
          }
          setDefaultData();
        });
      } else {
        setDefaultData();
      }
    }
    if (id && !isNew) {
      getOne(entity as string, parseInt(id, 10)).then((data) => {
        if (done) {
          return;
        }
        if ("errors" in data) {
          setError(data.errors[0]);
        } else {
          if (model && model._lovNoList?.length) {
            addModelLOVs(model, data._lovs as Record<string, unknown>);
            delete data._lovs;
          }
          setAllData(data);
          if (withActivity && model?.titleField) {
            logActivity(entity as string, id, data[model.titleField], "read");
          }
        }
        setIsLoading(false);
      });
    }
    return () => {
      done = true;
    };
  }, [entity, id]);

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
    if (delta) {
      const intId = id ? parseInt(id, 10) : null;
      const upsertPromise = intId
        ? updateOne(entity as string, intId, delta)
        : insertOne(entity as string, userData || {});
      upsertPromise.then((response) => {
        if (response.errors) {
          toast.error(response.errors[0].message);
        } else {
          let toastMsg;
          if (intId) {
            toastMsg = i18n_actions.updated.replace(
              "{0}",
              capitalize(model.name),
            );
          } else {
            toastMsg = i18n_actions.added.replace("{0}", model.name);
          }
          toast.success(toastMsg);
          setAllData(response.data || null);
          if (!intId) {
            navigate(`../${entity}/edit/${response.data?.id}`);
          }
        }
      });
    } else {
      toast.info(i18n_msg.noUpdate);
    }
  }, [entity, id, navigate, data, userData, model]);

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
