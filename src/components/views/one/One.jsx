/* eslint-disable react-hooks/exhaustive-deps */
// #region ---------------- Imports ----------------
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { diffData } from "../../../utils/validation";
import { logActivity } from "../../../utils/activity";

import Edit from "./Edit";
import Browse from "./Browse";

import PageTitle from "../../shell/PageTitle/PageTitle";
import Alert from "../../widgets/Alert/Alert";
import Spinner from "../../widgets/Spinner/Spinner";
import { i18n_actions, i18n_msg, i18n_errors } from "../../../i18n/i18n";
import config from "../../../config";
import { capitalize } from "../../../utils/format";
import { getModel } from "../../../utils/moMa";
import { getOne, updateOne, insertOne } from "../../../utils/dao";

import "./One.scss";
// #endregion

// #region ---------------- Helpers ----------------
const { withActivity } = config;

const getDefaultData = (model) => {
  const defaultData = {};
  if (model) {
    model.fields.forEach((f) => {
      if (f.defaultValue != null) {
        defaultData[f.id] = f.defaultValue;
      }
      if (f.type === "lov" && defaultData[f.id] == null) {
        defaultData[f.id] = "";
      }
    });
  }
  return defaultData;
};

const recordTitle = (m, data, isNew) => {
  if (m) {
    let title = m.title;
    if (isNew) {
      title = `New ${m.name || "item"}`;
    } else if (data?.id) {
      if (m.titleFunction) {
        // Note: would this be unsecure?
        // title = m.titleFunction(data, m);
        title = m.titleFunction(Object.assign({}, data));
      } else {
        title = data[m.titleField];
      }
    }
    return title;
  }
  return "Model not found";
};

// #endregion

const One = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({ ...data });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { entity, view, id } = useParams();
  const model = getModel(entity);
  const isNew = id === "0";
  const title = error ? "Error" : recordTitle(model, data, isNew);

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
    if (id && !isNew) {
      setIsLoading(true);
      const m = getModel(entity);
      getOne(entity, parseInt(id, 10)).then((data) => {
        if (done) {
          return;
        }
        if (data.errors) {
          setError(data.errors[0]);
        } else {
          if (data.data) {
            data = data.data;
          }
          setAllData(data);
          if (withActivity) {
            logActivity(entity, id, data[m.titleField], "read");
          }
        }
        setIsLoading(false);
      });
    } else if (isNew) {
      const defaults = getDefaultData(model);
      setAllData(defaults);
      setIsLoading(false);
    }

    return () => {
      done = true;
    };
  }, [entity, id]);

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
      data: view === "edit" ? userData : data,
    };

    if (data === null) {
      // TODO: 404
      return "NO DATA - refactor bug to be fixed";
    }
    if (view === "edit") {
      const cbFieldChange = (fid, value) => {
        const newData = structuredClone(userData || {});
        if (value?.name && value.name.type === "span") {
          newData[fid] = {
            id: value.id,
            name: value.name.props.children[1],
            icon: value.name.props.children[0]?.props?.id,
          };
        } else {
          newData[fid] = value;
        }
        setUserData(newData);
      };

      const cbUpsertOne = () => {
        const delta = diffData(model, data, userData);
        if (delta) {
          const intId = id ? parseInt(id, 10) : null;
          const upsertPromise = intId
            ? updateOne(entity, intId, delta)
            : insertOne(entity, userData);
          upsertPromise.then((response) => {
            let toastMsg;
            const newId = response?.data?.id;
            if (response.errors) {
              // TODO:
              toast.error(
                "Server error while inserting or updating the record."
              );
            } else {
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
                navigate(`/${entity}/edit/${newId}`);
              }
            }
          });
        } else {
          toast.info(i18n_msg.noUpdate);
        }
      };

      return (
        <Edit
          {...viewProps}
          onFieldChange={cbFieldChange}
          onSave={cbUpsertOne}
        />
      );
    }
    return <Browse {...viewProps} />;
  };

  return (
    <div className={`evol-one model_${entity}`}>
      <PageTitle
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
