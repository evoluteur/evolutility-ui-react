import classnames from "classnames";
import FieldLabel from "./FieldLabel";
import FieldElemEdit from "./edit/FieldElemEdit";
import FieldElemBrowse from "./browse/FieldElemBrowse";
import type { Field as FieldDef, FieldOnChange } from "types/model";

import "./Field.scss";

export interface FieldProps {
  /** Field metadata */
  fieldDef: FieldDef;
  /** Callback functions for changed field value */
  onChange?: FieldOnChange | null;
  /** Field value (object or scalar values depending on field type) */
  value?: unknown;
  /** Field label (override label in fieldDef) */
  label?: string | null;
  /** Field readOnly (override readOnly in fieldDef) */
  readOnly?: boolean | null;
  /** Field icon (only for lov fields) */
  icon?: string | null;
  /** Validation error message */
  message?: string | null;
  invalid?: boolean;
}

const Field = ({
  fieldDef,
  onChange = null,
  label = null,
  readOnly = null,
  icon = null,
  value = null,
  invalid,
  message = null,
}: FieldProps) => {
  const fReadOnly = readOnly || fieldDef.readOnly;

  return (
    <div
      className={classnames("evol-fld", { "has-error": invalid })}
      style={{ width: `${fieldDef.width || 100}%` }}
    >
      <FieldLabel
        label={label || fieldDef.label}
        field={fieldDef}
        readOnly={!!fReadOnly}
      />
      {fReadOnly ? (
        <FieldElemBrowse fieldDef={fieldDef} value={value} icon={icon} />
      ) : (
        <FieldElemEdit
          fieldDef={fieldDef}
          value={value}
          onChange={onChange ?? (() => {})}
        />
      )}
      {invalid && message && <div className="evo-fld-invalid">{message}</div>}
    </div>
  );
};

export default Field;
