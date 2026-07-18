// Evolutility-UI-React :: /field/FieldElemEdit.tsx

// Model-driven field (possible types specified in dico.fieldTypes).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { memo, type ReactNode } from "react";

import FieldDate from "./FieldDate";
import FieldUpload from "./FieldUpload";
import Typeahead from "./FieldObject";
import { jsonString } from "utils/format";
import { fieldTypes as ft } from "utils/dico";
import type { Field, FieldOnChange, LovValue } from "types/model";

import "../Field.scss";

const fSymbols: Record<string, ReactNode> = {
  money: "$",
  email: "@",
  url: <span>&#128279;</span>,
};

const createOption = (id: string | number, text: string | undefined) => (
  <option key={id} value={`${id}`}>
    {text}
  </option>
);

export interface FieldElemEditProps {
  /** Field metadata */
  fieldDef: Field;
  /** Callback functions for changed field value */
  onChange: FieldOnChange;
  /** Field value (object or scalar values depending on field type) */
  value?: unknown;
}

const FieldElemEdit = memo(
  ({ fieldDef, onChange, value }: FieldElemEditProps) => {
    // - return the widget needed for the specific field type
    const f = fieldDef;
    const sharedFieldProps = {
      id: f.id,
      onChange,
      autoComplete: "off",
      className: "form-control",
      "data-testid": "field-" + f.type,
      step: undefined as string | undefined,
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
          value={(value as string) || ""}
        />
      );
    }
    if (fType === ft.lov) {
      const lovValue = value as LovValue | undefined;
      if (f.object) {
        return (
          <Typeahead {...sharedFieldProps} entity={f.object} value={lovValue} />
        );
      }
      const opts = f.list
        ? f.list.map((item) => createOption(item.id, item.text))
        : [
            createOption(lovValue?.id || "na", lovValue?.name),
            createOption(-1, "Error: list not found"),
          ];
      return (
        <select {...sharedFieldProps} value={lovValue?.id || ""}>
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
      return (
        <FieldDate
          id={f.id}
          value={value as string | Date | null}
          onChange={onChange}
        />
      );
    }
    if (fType === ft.time) {
      return (
        <input
          {...sharedFieldProps}
          type="time"
          value={(value as string) || ""}
        />
      );
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
          value={value as string}
        />
      );
    }
    if (fType === ft.email || fType === ft.money || fType === ft.url) {
      const inputType = fType === ft.money ? "number" : "text";
      return (
        <div className="input-group">
          <span className="input-group-addon">{fSymbols[fType]}</span>
          <input
            {...sharedFieldProps}
            type={inputType}
            value={(value as string) || ""}
          />
        </div>
      );
    }
    let inputType = "text";
    if (fType === ft.int || fType === ft.dec) {
      inputType = "number";
      sharedFieldProps.step = fType === ft.int ? "1" : "0.1";
    }
    return (
      <input
        {...sharedFieldProps}
        type={inputType}
        value={(value as string) || ""}
      />
    );
  },
);

export default FieldElemEdit;
