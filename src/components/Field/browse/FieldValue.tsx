import { memo, type ReactNode } from "react";
import Icon from "components/ui/Icon/Icon";
import {
  pixPath,
  filesUrl,
  dateString,
  timeString,
  jsonString,
  image,
  numFieldValue,
} from "utils/format";
import { fieldTypes as ft } from "utils/dico";
import type { Field, LovValue } from "types/model";

import "../Field.scss";

export interface FieldValueProps {
  fieldDef: Field;
  value?: unknown;
  compact?: boolean;
}

const FieldValue = memo(({ fieldDef, value, compact }: FieldValueProps) => {
  const f = fieldDef;
  const fType = f.type;

  if (fType === ft.bool) {
    return value ? <Icon className="checkbox" name="check" theme="none" /> : "";
  }
  if (fType === ft.int || fType === ft.dec || fType === ft.money) {
    return numFieldValue(f, value);
  }
  if (fType === ft.email && value) {
    return <a href={`mailto:${value}`}>{value as string}</a>;
  }
  if (fType === ft.json && value) {
    return jsonString(value);
  }
  if (fType === ft.lov) {
    const lovValue = value as LovValue | undefined;
    return (
      <span className="lov-wicon">
        {f.lovIcon && lovValue?.icon && (
          <img id={lovValue.icon} src={pixPath + lovValue.icon} alt=""></img>
        )}
        {lovValue?.name}
      </span>
    );
  }
  if (fType === ft.date) {
    return dateString(value);
  }
  if (fType === ft.time) {
    return timeString(value as string);
  }
  if (fType === ft.color) {
    const colorValue = value as string;
    return (
      <div>
        <div
          className="evo-color-box"
          id={f.id}
          style={{ backgroundColor: colorValue }}
          title={colorValue}
        >
          {!compact && colorValue && <span>{colorValue}</span>}
        </div>
      </div>
    );
  }
  if (fType === ft.image && value) {
    return image(filesUrl + (value as string));
  }
  if (fType === ft.url && value) {
    return (
      <a href={value as string} target="_blank" rel="noopener noreferrer">
        {value as string}
      </a>
    );
  }
  return value as ReactNode;
});

export default FieldValue;
