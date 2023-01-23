/* eslint-disable react-hooks/exhaustive-deps */
// #region ---------------- Imports ----------------
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { diffData } from "../../../utils/validation";
import { logActivity } from "../../../utils/activity";

import Edit from "./Edit";
import Browse from "./Browse";

import Header from "../../shell/PageTitle";
import Alert from "../../widgets/Alert";
import Spinner from "../../widgets/Spinner";
import { i18n_actions, i18n_msg, i18n_errors } from "../../../i18n/i18n";
import config from "../../../config";
import { capitalize } from "../../../utils/format";
import { getModel } from "../../../utils/moMa";
import { getOne, updateOne, addOne } from "../../../utils/dao";

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
    let title = "";
    if (isNew) {
      title = `New ${m.name || "item"}`;
    } else if (m.titleFunction) {
      // Note: would this be unsecure?
      // title = m.titleFunction(data, m);
      title = m.titleFunction(Object.assign({}, data));
    } else {
      title = data[m.titleField];
    }
    return title;
  }
  return "Model not found";
};
// #endregion

const One = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({ ...data });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { entity, view, id } = useParams();
  const model = getModel(entity);
  const isNew = id === "0";
  const title = error ? "Error" : recordTitle(model, data, isNew);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    setUserData({ ...data });
  }, [view]);

  useEffect(() => {
    let done = false;
    // setData(null);
    // setUserData(null);
    setError(null);
    if (id && !isNew) {
      setLoading(true);
      const m = getModel(entity);
      getOne(entity, id).then((data) => {
        if (done) {
          return;
        }
        if (data.errors) {
          setError(data.errors[0]);
        } else {
          if (data.data) {
            data = data.data;
          }
          setData(data);
          setUserData(data);
          if (withActivity) {
            logActivity(entity, id, data[m.titleField], "read");
          }
        }
        setLoading(false);
      });
    } else if (isNew) {
      const defaults = getDefaultData(model);
      setData(defaults);
      setUserData(defaults);
      // TODO: get LOVs ?
      setLoading(false);
    }

    return () => {
      done = true;
    };
  }, [entity, id]);

  const body = () => {
    if (loading) {
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
      return "EMPTY";
    }
    if (view === "edit") {
      const cbFieldChange = (fid, value) => {
        const newData = JSON.parse(JSON.stringify(userData || {}));
        newData[fid] = value;
        setUserData(newData);
      };

      const cbUpsertOne = () => {
        const delta = diffData(model, data, userData);
        if (delta) {
          const intId = id ? parseInt(id, 10) : null;
          const upsertPromise = intId
            ? updateOne(entity, intId, delta)
            : addOne(entity, userData);
          upsertPromise.then((response) => {
            let toastMsg;
            if (response.errors) {
              // TODO:
              toast.error(
                "Server error while inserting or updating the record."
              );
            } else {
              const newId = response?.data?.id;
              if (newId) {
                toastMsg = i18n_actions.updated.replace(
                  "{0}",
                  capitalize(model.name)
                );
                navigate("/" + entity + "/edit/" + newId);
              } else {
                toastMsg = i18n_actions.added.replace("{0}", model.name);
              }
            }
            toast.success(toastMsg);
            setData(response.data);
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
    <div className={"evol-one model_" + entity}>
      <Header
        id={id}
        entity={entity}
        title={title}
        model={model}
        comments={data.nb_comments}
        cardinality="1"
        view={view}
      />
      {body()}
    </div>
  );
};

export default One;
