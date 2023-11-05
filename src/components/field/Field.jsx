// Evolutility-UI-React :: /field/Field.js

// Model-driven field (possible types specified in dico.fieldTypes).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";
import Datepicker from "react-datepicker";
import Dropzone from "react-dropzone";
import classnames from "classnames";
import { isObject } from "underscore";
// import MultiSelect from "@khanacademy/react-multi-select";
import { fieldTypes as ft } from "../../utils/dico";
import { nullOrUndefined } from "../../utils/format";
import { i18n_actions } from "../../i18n/i18n";
import config from "../../config";
import FieldLabel from "./FieldLabel";
import Button from "../widgets/Button/Button";
import Typeahead from "./Typeahead";
import fieldElemReadOnly from "./fieldElemReadOnly";

import "./Field.scss";
import "react-datepicker/dist/react-datepicker.css";

// #region ---------------- Helpers ----------------
const { filesUrl } = config;

const createOption = (id, text) => (
  <option key={id} value={`${id}`}>
    {text}
  </option>
);

const document = (d, path) => {
  if (nullOrUndefined(d)) {
    return null;
  }
  return (
    <a href={encodeURI(path + d)} target="_blank" rel="noopener noreferrer">
      {d}
    </a>
  );
};
// #endregion

const Field = ({
  fieldDef,
  callbacks,
  label,
  readOnly,
  icon,
  value,
  invalid,
  message,
}) => {
  const getDateFieldChange = (fid) => (v) => {
    // - for fields of type date (using react-datepicker)
    callbacks.change({
      target: {
        id: fid,
        value: v,
      },
    });
  };

  // const getMultiselectFieldChange =
  //   () =>
  //   // - for fields of type list (using react-multi-select)
  //   (v) => {
  //     callbacks.change({
  //       target: {
  //         id: fieldDef.id,
  //         value: v,
  //       },
  //     });
  //   };

  const onDropFile = (files) => {
    // - only for fields of type image or document
    const f = fieldDef;
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
    const f = fieldDef;
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
      className: "form-control",
    };

    if (f.type === ft.bool) {
      return (
        <input {...usualProps} className="" type="checkbox" checked={!!d} />
      );
    }
    if (f.type === ft.textml) {
      return <textarea {...usualProps} rows={f.height || 4} value={d || ""} />;
    }
    if (f.type === ft.lov) {
      if (f.object) {
        return <Typeahead entity={f.object} props={usualProps} value={d} />;
      }
      const opts = f.list
        ? f.list.map((item) => createOption(item.id, item.text))
        : [
            createOption(d?.id, d?.name),
            createOption(-1, "Error: list not found"),
          ];
      return (
        <select {...usualProps} value={d?.id || ""}>
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
          />
        </>
      );
    }
    if (f.type === ft.time) {
      return <input {...usualProps} type="time" value={d || ""} />;
    }
    if (f.type === ft.json) {
      return (
        <textarea
          {...usualProps}
          rows={f.height || 4}
          value={isObject(d) ? JSON.stringify(d, null, 2) : d || ""}
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
          pix = document(d, filesUrl);
        }
      }

      return (
        <div>
          {pix}
          {d && (
            <div className="field-remove" onClick={removeFile}>
              <Button
                type="default"
                icon="remove"
                label={i18n_actions[`remove_${f.type}`]}
              />
            </div>
          )}
          <Dropzone onDrop={onDropFile}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={classnames("pixdrop dropzone", {
                  "dropzone--isActive": isDragActive,
                })}
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
      const fType = f.type === ft.money ? "number" : "text";
      return (
        <div className="input-group">
          <span className="input-group-addon">{symbol}</span>
          <input
            {...usualProps}
            type={fType}
            value={d || ""}
            onChange={cbs.change}
          />
        </div>
      );
    }
    let inputType = "text";
    if (f.type === ft.int || f.type === ft.dec) {
      inputType = "number";
      usualProps.step = f.type === ft.int ? "1" : "0.1";
    }

    return (
      <input
        {...usualProps}
        type={inputType}
        value={d || ""}
        onChange={cbs.change}
      />
    );
  };

  const f = fieldDef || { type: ft.text };
  const fReadOnly = readOnly || f.readOnly;

  return (
    <div
      className={classnames("evol-fld", { "has-error": invalid })}
      style={{ width: `${f.width || 100}%` }}
    >
      <FieldLabel label={label || f.label} field={f} readOnly={fReadOnly} />
      {fReadOnly
        ? fieldElemReadOnly(f, value, icon)
        : fieldElem(f, value, callbacks)}
      {invalid && message && <div className="evo-fld-invalid">{message}</div>}
    </div>
  );
};

export default Field;

Field.propTypes = {
  /** Field metadata */
  fieldDef: PropTypes.object.isRequired,
  /** Callback functions for field events */
  callbacks: PropTypes.shape({
    change: PropTypes.func,
    dropFile: PropTypes.func,
  }),
  /** Field value (object or scalar values depending on field type) */
  value: PropTypes.any,
  /** Field label (override label in fieldDef) */
  label: PropTypes.string,
  /** Field readOnly (override readOnly in fieldDef) */
  readOnly: PropTypes.bool,
  /** Field icon (only for lov fields) */
  icon: PropTypes.string,
  /** Validation error message */
  message: PropTypes.string,
};

Field.defaultProps = {
  value: null,
  label: null,
  readOnly: null,
  icon: null,
  message: null,
};
