/* eslint-disable react-hooks/exhaustive-deps */
// #region ---------------- Imports ----------------
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { diffData } from "../../../utils/validation";
import { logActivity } from "../../../utils/activity";
import Edit from "./Edit/Edit";
import Browse from "./Browse/Browse";
import ViewHeader from "../ViewHeader/ViewHeader";
import Alert from "../../widgets/Alert/Alert";
import Spinner from "../../widgets/Spinner/Spinner";
import { i18n_actions, i18n_msg, i18n_errors } from "../../../i18n/i18n";
import config from "../../../config";
import { capitalize } from "../../../utils/format";
import { getModel } from "../../../utils/moMa";
import { getOne, updateOne, insertOne, getLOVs } from "../../../dao/dao";

import "./One.scss";
// #endregion

// #region ---------------- Helpers ----------------
const { withActivity } = config;

const getDefaultData = (model) => {
  const defaultData = {};
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

const recordTitle = (m, data, isNew) => {
  if (m) {
    if (isNew) {
      return `New ${m.name || "item"}`;
    }
    if (data?.id) {
      if (m.titleFunction) {
        return m.titleFunction(Object.assign({}, data));
      }
      return data[m.titleField] || capitalize(m.name);
    }
    return m.title;
  }
  return "Model not found";
};

const addModelLOVs = (model, lovs) => {
  // - Add missing lov field lists to model
  model._lovNoList.forEach((fid) => {
    const f = model.fieldsH[fid];
    f.list = lovs[fid];
  });
  delete model._lovNoList;
};

// #endregion

const One = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { entity, view, id } = useParams();
  const model = getModel(entity);
  const isNew = id === "0";
  const viewData = view === "edit" ? userData : data;
  const title =
    (error || isLoading) && !isNew
      ? capitalize(model?.name)
      : recordTitle(model, viewData, isNew);

  const setAllData = (data) => {
    setData(data);
    setUserData(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    document.title = title;
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
      if (model._lovNoList) {
        getLOVs(entity).then((data) => {
          if (done) {
            return;
          }
          if (data.errors) {
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
      getOne(entity, parseInt(id, 10)).then((data) => {
        if (done) {
          return;
        }
        if (data.errors) {
          setError(data.errors[0]);
        } else {
          if (model._lovNoList?.length) {
            addModelLOVs(model, data._lovs);
            delete data._lovs;
          }
          setAllData(data);
          if (withActivity) {
            logActivity(entity, id, data[model.titleField], "read");
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
    (fid, value) => {
      const newData = structuredClone(userData || {});
      if (value?.name && value.name.type === "span") {
        const children = value.name.props.children;
        newData[fid] = {
          id: value.id,
          name: children[1],
          icon: children[0]?.props?.id,
        };
      } else {
        newData[fid] = value;
      }
      setUserData(newData);
    },
    [userData]
  );

  const onSave = useCallback(() => {
    const delta = diffData(model, data, userData);
    if (delta) {
      const intId = id ? parseInt(id, 10) : null;
      const upsertPromise = intId
        ? updateOne(entity, intId, delta)
        : insertOne(entity, userData);
      upsertPromise.then((response) => {
        if (response.errors) {
          toast.error(response.errors[0].message);
        } else {
          let toastMsg;
          if (intId) {
            toastMsg = i18n_actions.updated.replace(
              "{0}",
              capitalize(model.name)
            );
          } else {
            toastMsg = i18n_actions.added.replace("{0}", model.name);
          }
          toast.success(toastMsg);
          setAllData(response.data);
          if (!intId) {
            navigate(`../${entity}/edit/${response.data?.id}`);
          }
        }
      });
    } else {
      toast.info(i18n_msg.noUpdate);
    }
  }, [entity, id, navigate, data, userData]);

  const body = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <Alert title={i18n_errors.serverError} message={error.message} />;
    }
    const viewProps = {
      entity,
      model,
      data: viewData,
    };
    return view === "edit" ? (
      <Edit {...viewProps} onFieldChange={onFieldChange} onSave={onSave} />
    ) : (
      <Browse {...viewProps} />
    );
  };

  return (
    <div className={`evol-one model_${entity}`}>
      <ViewHeader
        id={id}
        entity={entity}
        title={title}
        comments={data?.nb_comments}
        view={view}
      />
      {body()}
    </div>
  );
};

export default One;
