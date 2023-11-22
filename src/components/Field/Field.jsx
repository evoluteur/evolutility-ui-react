import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { fieldPropTypes } from "components/views/modelPropTypes";
import FieldLabel from "./FieldLabel";
import FieldElemEdit from "./edit/FieldElemEdit";
import FieldElemBrowse from "./browse/FieldElemBrowse";

import "./Field.scss";

const Field = ({
  fieldDef,
  onChange,
  label,
  readOnly,
  icon,
  value,
  invalid,
  message,
}) => {
  const fReadOnly = readOnly || fieldDef.readOnly;

  return (
    <div
      className={classnames("evol-fld", { "has-error": invalid })}
      style={{ width: `${fieldDef.width || 100}%` }}
    >
      <FieldLabel
        label={label || fieldDef.label}
        field={fieldDef}
        readOnly={fReadOnly}
      />
      {fReadOnly ? (
        <FieldElemBrowse fieldDef={fieldDef} value={value} icon={icon} />
      ) : (
        <FieldElemEdit fieldDef={fieldDef} value={value} onChange={onChange} />
      )}
      {invalid && message && <div className="evo-fld-invalid">{message}</div>}
    </div>
  );
};

export default Field;

Field.propTypes = {
  /** Field metadata */
  fieldDef: fieldPropTypes.isRequired,
  /** Callback functions for changed field value */
  onChange: PropTypes.func,
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
  onChange: null,
};
