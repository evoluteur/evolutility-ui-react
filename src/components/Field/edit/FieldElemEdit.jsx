// Evolutility-UI-React :: /field/Field.js

// Model-driven field (possible types specified in dico.fieldTypes).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React, { memo } from "react";
import PropTypes from "prop-types";

import FieldDate from "./FieldDate";
import FieldUpload from "./FieldUpload";
import { jsonString } from "utils/format";
import { fieldTypes as ft } from "utils/dico";
import Typeahead from "./FieldObject";

import "../Field.scss";

const fSymbols = {
  money: "$",
  email: "@",
  url: <span>&#128279;</span>,
};

const createOption = (id, text) => (
  <option key={id} value={`${id}`}>
    {text}
  </option>
);

const FieldElemEdit = memo(({ fieldDef, onChange, value }) => {
  // - return the widget needed for the specific field type
  const f = fieldDef;
  const sharedFieldProps = {
    id: f.id,
    onChange,
    autoComplete: "off",
    className: "form-control",
    "data-testid": "field-" + f.type,
  };
  const fType = f.type;
  if (fType === ft.bool) {
    return (
      <input
        {...sharedFieldProps}
        className=""
        type="checkbox"
        checked={!!value}
      />
    );
  }
  if (fType === ft.textml) {
    return (
      <textarea
        {...sharedFieldProps}
        rows={f.height || 4}
        value={value || ""}
      />
    );
  }
  if (fType === ft.lov) {
    if (f.object) {
      return (
        <Typeahead {...sharedFieldProps} entity={f.object} value={value} />
      );
    }
    const opts = f.list
      ? f.list.map((item) => createOption(item.id, item.text))
      : [
          createOption(value?.id || "na", value?.name),
          createOption(-1, "Error: list not found"),
        ];
    return (
      <select {...sharedFieldProps} value={value?.id || ""}>
        <option />
        {opts}
      </select>
    );
  }
  // if (fType === ft.list) {
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
  if (fType === ft.date) {
    return <FieldDate id={f.id} value={value} onChange={onChange} />;
  }
  if (fType === ft.time) {
    return <input {...sharedFieldProps} type="time" value={value || ""} />;
  }
  if (fType === ft.json) {
    return (
      <textarea
        {...sharedFieldProps}
        rows={f.height || 4}
        value={jsonString(value)}
      />
    );
  }
  if (fType === ft.image || fType === ft.doc) {
    return (
      <FieldUpload
        id={f.id}
        docType={fType}
        onChange={onChange}
        value={value}
      />
    );
  }
  if (fType === ft.email || fType === ft.money || fType === ft.url) {
    const inputType = fType === ft.money ? "number" : "text";
    return (
      <div className="input-group">
        <span className="input-group-addon">{fSymbols[fType]}</span>
        <input {...sharedFieldProps} type={inputType} value={value || ""} />
      </div>
    );
  }
  let inputType = "text";
  if (fType === ft.int || fType === ft.dec) {
    inputType = "number";
    sharedFieldProps.step = fType === ft.int ? "1" : "0.1";
  }
  return <input {...sharedFieldProps} type={inputType} value={value || ""} />;
});

export default FieldElemEdit;

FieldElemEdit.propTypes = {
  /** Field metadata */
  fieldDef: PropTypes.object.isRequired,
  /** Callback functions for changed field value */
  onChange: PropTypes.func.isRequired,
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

FieldElemEdit.defaultProps = {
  value: null,
  label: null,
  readOnly: null,
  icon: null,
  message: null,
  onChange: null,
};
