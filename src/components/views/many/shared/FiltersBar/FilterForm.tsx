// Evolutility-UI-React :: /views/many/shared/FiltersBar/FilterForm.tsx

// Form to add or edit one filter (field, condition, value).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useState, type FormEvent } from "react";
import { i18n_filters as i18n, i18n_actions } from "i18n/i18n";
import { fieldTypes as ft } from "utils/dico";
import {
  fieldOperators,
  needsValue,
  type Filter,
  type FilterOperator,
} from "utils/filters";
import type { Field, LovListItem } from "types/model";

export interface FilterFormProps {
  /** Fields which can be filtered */
  fields: Field[];
  /** Filter being edited (or initial values for a new one) */
  filter: Filter;
  /** Lists of values for lov fields */
  getList: (f: Field) => LovListItem[];
  onApply: (flt: Filter) => void;
  onCancel: () => void;
}

const inputType = (f: Field) => {
  switch (f.type) {
    case ft.int:
    case ft.dec:
    case ft.money:
      return "number";
    case ft.date:
      return "date";
    case ft.time:
      return "time";
    default:
      return "text";
  }
};

const FilterForm = ({
  fields,
  filter,
  getList,
  onApply,
  onCancel,
}: FilterFormProps) => {
  const [flt, setFlt] = useState<Filter>(filter);
  const field = fields.find((f) => f.id === flt.fieldId) || fields[0];
  const operators = field ? fieldOperators(field) : [];
  const hasValue = needsValue(flt.operator);
  const canApply = !!field && (!hasValue || flt.value !== "");

  const changeField = (fieldId: string) => {
    const f = fields.find((f) => f.id === fieldId);
    setFlt({
      fieldId,
      operator: f ? fieldOperators(f)[0] : "eq",
      value: "",
    });
  };

  const toggleItem = (id: string) => {
    const ids = flt.value ? flt.value.split(",") : [];
    const newIds = ids.includes(id)
      ? ids.filter((i) => i !== id)
      : [...ids, id];
    setFlt({ ...flt, value: newIds.join(",") });
  };

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (canApply) {
      onApply(hasValue ? flt : { ...flt, value: "" });
    }
  };

  const valueInput = () => {
    if (!field || !hasValue) {
      return null;
    }
    if (flt.operator === "in") {
      const list = getList(field);
      const ids = flt.value ? flt.value.split(",") : [];
      return (
        <div className="evo-filter-lov" role="group" aria-label={i18n.value}>
          {list.length
            ? list.map((li) => (
                <label key={li.id}>
                  <input
                    type="checkbox"
                    checked={ids.includes(String(li.id))}
                    onChange={() => toggleItem(String(li.id))}
                  />
                  {li.text}
                </label>
              ))
            : i18n.noValues}
        </div>
      );
    }
    return (
      <input
        className="form-control"
        type={inputType(field)}
        step={inputType(field) === "number" ? "any" : undefined}
        aria-label={i18n.value}
        placeholder={i18n.value}
        value={flt.value}
        autoFocus
        onChange={(evt) => setFlt({ ...flt, value: evt.target.value })}
      />
    );
  };

  return (
    <form
      className="evo-filter-form"
      onSubmit={onSubmit}
      data-testid="filterform"
    >
      <select
        className="form-control"
        aria-label={i18n.field}
        value={field?.id}
        onChange={(evt) => changeField(evt.target.value)}
      >
        {fields.map((f) => (
          <option key={f.id} value={f.id}>
            {f.labelShort || f.label}
          </option>
        ))}
      </select>
      <select
        className="form-control"
        aria-label={i18n.operator}
        value={flt.operator}
        onChange={(evt) =>
          setFlt({ ...flt, operator: evt.target.value as FilterOperator })
        }
      >
        {operators.map((op) => (
          <option key={op} value={op}>
            {i18n[op]}
          </option>
        ))}
      </select>
      {valueInput()}
      <div className="evo-filter-form-btns">
        <button type="submit" className="btn btn-primary" disabled={!canApply}>
          {i18n.apply}
        </button>
        <button type="button" className="btn btn-default" onClick={onCancel}>
          {i18n_actions.cancel}
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
