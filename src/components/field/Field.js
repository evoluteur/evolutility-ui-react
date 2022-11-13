// Evolutility-UI-React :: /field/Field.js

// Model-driven field (possible types specified in dico.fieldTypes).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

// import React, { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";
import Datepicker from "react-datepicker";
import Dropzone from "react-dropzone";
// import MultiSelect from "@khanacademy/react-multi-select";
import { fieldTypes as ft } from "../../utils/dico";
import { fieldValue, image, doc } from "../../utils/format";
import { i18n_actions, i18n_msg } from "../../i18n/i18n";
import { filesUrl } from "../../config";
import FieldLabel from "./FieldLabel";

import "./Field.scss";

// #region ---------------- Helpers ----------------
const isObject = (obj) => typeof obj === "object" && obj !== null;

function emHeight(f) {
  let fh = parseInt(f.height || 2, 10);
  if (fh < 2) {
    fh = 2;
  }
  return Math.trunc(fh * 1.6);
}

function createMarkup(d) {
  // TODO: good enough?
  return {
    __html: d
      ? d.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")
      : "",
  };
}

const createOption = (id, text) => (
  <option key={id} value={`${id}`}>
    {text}
  </option>
);

const itemInList = (id, list) => {
  const tag = list.find((item) => item.id === id);
  if (tag) {
    return tag.text;
  }
  return "N/A";
};
// #endregion

const Field = ({
  model,
  callbacks,
  // data,
  label,
  readOnly,
  icon,
  value,
  valueId,
  invalid,
  message,
}) => {
  // const [invalid, setInvalid] = useState(false);
  // const [message, setMessage] = useState(false);

  const getDateFieldChange = (fid) => {
    // - for fields of type date (using react-datepicker)
    return (v) => {
      callbacks.change({
        target: {
          id: fid,
          value: v,
        },
      });
    };
  };

  // const getMultiselectFieldChange =
  //   () =>
  //   // - for fields of type list (using react-multi-select)
  //   (v) => {
  //     const f = model;
  //     callbacks.change({
  //       target: {
  //         id: f.id,
  //         value: v,
  //       },
  //     });
  //   };

  const onDropFile = (files) => {
    // - only for fields of type image or document
    const f = model;
    if (files.length && (f.type === ft.image || f.type === ft.doc)) {
      const formData = new FormData();
      files.forEach((f, idx) => {
        formData.append("filename", files[idx]);
      });
      if (callbacks.dropFile) {
        try {
          callbacks.dropFile(f.id, formData);
        } catch (error) {
          // TODO: better handling
          alert("Error in upload.");
        }
      }
    }
  };

  const removeFile = () => {
    // - only for fields of type image or document
    const f = model;
    if (callbacks.dropFile) {
      callbacks.dropFile(f.id, null);
    }
  };

  const fieldElem = (f, d, cbs) => {
    // - return the widget needed for the specific field type
    const usualProps = {
      id: f.id,
      key: f.id,
      onChange: cbs.change,
    };

    if (f.type === ft.bool) {
      return <input {...usualProps} type="checkbox" checked={!!d} />;
    }
    if (f.type === ft.textml) {
      return (
        <textarea
          {...usualProps}
          rows={f.height || 4}
          className="form-control"
          value={d || ""}
        />
      );
    }
    if (f.type === ft.json) {
      return (
        <textarea
          {...usualProps}
          rows={f.height || 4}
          className="form-control"
          value={isObject(d) ? JSON.stringify(d, null, 2) : d || ""}
        />
      );
    }
    if (f.type === ft.lov) {
      if (isObject(d)) {
        // for GraphQL
        d = d.id;
      }
      const opts = f.list
        ? f.list.map((item) => createOption(item.id, item.text))
        : [createOption(`${f.id}loading`, i18n_msg.loading)];
      return (
        <select {...usualProps} className="form-control" value={d || ""}>
          <option />
          {opts}
        </select>
      );
    }
    // if (f.type === ft.list) {
    //   const opts = f.list
    //     ? f.list.map((item) => ({
    //         value: item.id,
    //         label: item.text,
    //       }))
    //     : null;
    //   return (
    //     <MultiSelect
    //       options={opts}
    //       selected={d || []}
    //       onSelectedChanged={getMultiselectFieldChange(f)}
    //     />
    //   );
    // }
    if (f.type === ft.date) {
      return (
        <Datepicker
          {...usualProps}
          className="form-control"
          selected={d ? new Date(d) : null}
          onChange={getDateFieldChange(f.id)}
        />
      );
    }
    if (f.type === ft.datetime) {
      return (
        <>
          <Datepicker
            {...usualProps}
            className="form-control inline"
            selected={d ? new Date(d) : null}
            onChange={getDateFieldChange(f.id)}
          />
          <input
            {...usualProps}
            key={`${usualProps.key}_time`}
            type="time"
            value={d ? `${d}`.substr(11, 8) : ""}
            className="form-control"
          />
        </>
      );
    }
    if (f.type === ft.time) {
      return (
        <input
          {...usualProps}
          type="time"
          value={d || ""}
          className="form-control"
        />
      );
    }
    if (f.type === ft.image || f.type === ft.doc) {
      let pix = null;
      if (d) {
        if (f.type === ft.image && d) {
          pix = (
            <img
              {...usualProps}
              className="img-thumbnail"
              src={filesUrl + d}
              alt=""
            />
          );
        } else {
          pix = doc(d, filesUrl);
        }
      }

      return (
        <div>
          {pix}
          {d ? (
            <div className="evol-remove" onClick={removeFile}>
              <button className="btn btn-default">
                <Icon
                  className="ddd"
                  name="remove"
                  size="medium"
                  theme="none"
                />
                {i18n_actions[`remove_${f.type}`]}
              </button>
            </div>
          ) : null}
          <Dropzone onDrop={onDropFile}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={`pixdrop dropzone ${
                  isDragActive ? "dropzone--isActive" : ""
                }`}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop files here...</p>
                ) : (
                  <p>{i18n_actions.dropFile}</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      );
    }
    if (f.type === ft.email || f.type === ft.money) {
      const symbol = f.type === ft.email ? "@" : "$";
      return (
        <div className="input-group">
          <span className="input-group-addon">{symbol}</span>
          <input
            {...usualProps}
            type="text"
            value={d || ""}
            onChange={cbs.change}
            className="form-control"
          />
        </div>
      );
    }
    let inputType;
    if (f.type === ft.int || f.type === ft.dec) {
      inputType = "number";
      usualProps.step = f.type === ft.int ? "1" : "0.1";
    } else {
      // if(f.type==='email'){
      inputType = "text";
    }

    return (
      <input
        {...usualProps}
        type={inputType}
        value={d || ""}
        onChange={cbs.change}
        className="form-control"
      />
    );
  };

  const fieldElemReadOnly = (f, d, d_id) => {
    // - return the formatted field value
    let fw;

    if (f.type === ft.textml) {
      const height = `${emHeight(f)}em`;
      return (
        <div
          className="disabled evo-rdonly scroll-y"
          style={{ height }}
          dangerouslySetInnerHTML={createMarkup(d)}
        />
      );
    }
    if (f.type === ft.image && d) {
      fw = image(filesUrl + d);
    } else if (f.type === ft.doc) {
      fw = doc(d, filesUrl);
      // {f.country_icon && d.country_icon ? <img src={d.country_icon}/> : null}
    } else if (f.type === ft.lov) {
      if (f.object) {
        fw = <Link to={`/${f.object}/browse/${d_id}`}>{fieldValue(f, d)}</Link>;
      } else if (f.lovIcon && icon) {
        fw = (
          <span>
            <img src={`/pix/${icon}`} className="lov-icon" alt="" />
            {fieldValue(f, d)}
            {d?.name}
          </span>
        );
      } else {
        fw = fieldValue(f, d);
      }
    } else if (f.type === ft.list) {
      if (f.list) {
        fw = (
          <div key={`${f.id}_list`} className="list-tags">
            {(d || []).map((itemid) => (
              <div key={itemid}>{itemInList(itemid, f.list)}</div>
            ))}
          </div>
        );
      } else {
        fw = fieldValue(f, d);
      }
    } else if (f.type === ft.json) {
      fw = <pre>{isObject(d) ? JSON.stringify(d, null, 2) : d || ""}</pre>;
    } else {
      fw = fieldValue(f, d);
    }
    return <div className="disabled evo-rdonly">{fw}</div>;
  };

  const f = model || { type: "text" };
  const fReadOnly = readOnly || f.readOnly;
  const cbs = callbacks || {};
  const fLabel = label || f.label;

  return (
    <div
      className={`evol-fld${invalid ? " has-error" : ""}`}
      style={{ width: `${f.width || 100}%` }}
    >
      <FieldLabel label={fLabel} field={f} readOnly={fReadOnly} />

      {fReadOnly
        ? fieldElemReadOnly(f, value, valueId)
        : fieldElem(f, value, cbs)}

      {invalid && message && <div className="evo-fld-invalid">{message}</div>}
    </div>
  );
};

export default Field;

Field.propTypes = {
  model: PropTypes.object.isRequired, // model is a field definition (field model)
  callbacks: PropTypes.shape({
    change: PropTypes.func,
    dropFile: PropTypes.func,
  }),
  data: PropTypes.any, // object or atomic values depending on field type
  value: PropTypes.any,
  valueId: PropTypes.any,
  label: PropTypes.string, // override label in model
  readOnly: PropTypes.bool, // override readOnly in model
  icon: PropTypes.string,
  message: PropTypes.string,
};

Field.defaultProps = {
  data: null,
  value: null,
  valueId: null,
  label: null,
  readOnly: null,
  icon: null,
  message: null,
};
