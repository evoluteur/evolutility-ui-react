import React, { memo } from "react";
import Icon from "react-crud-icons";
import {
  pixPath,
  filesUrl,
  dateString,
  timeString,
  jsonString,
  image,
  numFieldValue,
} from "utils/format";
import { fieldTypes as ft } from "../../../utils/dico";

import "../Field.scss";

const FieldValue = memo(({ fieldDef, value, compact }) => {
  const f = fieldDef;
  const fType = f.type;

  if (fType === ft.bool) {
    return value ? <Icon className="checkbox" name="check" theme="none" /> : "";
  }
  if (fType === ft.int || fType === ft.dec || fType === ft.money) {
    return numFieldValue(f, value);
  }
  if (fType === ft.email && value) {
    return <a href={`mailto:${value}`}>{value}</a>;
  }
  if (fType === ft.json && value) {
    return jsonString(value);
  }
  if (fType === ft.lov) {
    return (
      <span className="lov-wicon">
        {f.lovIcon && value?.icon && (
          <img id={value.icon} src={pixPath + value.icon} alt=""></img>
        )}
        {value?.name}
      </span>
    );
  }
  if (fType === ft.date) {
    return dateString(value);
  }
  if (fType === ft.time) {
    return timeString(value);
  }
  if (fType === ft.color) {
    return (
      <div>
        <div
          className="evo-color-box"
          id={f.id}
          style={{ backgroundColor: value }}
          title={value}
        >
          {!compact && value && <span>{value}</span>}
        </div>
      </div>
    );
  }
  if (fType === ft.image && value) {
    return image(filesUrl + value);
  }
  if (fType === ft.url && value) {
    return (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    );
  }
  return value;
});

export default FieldValue;
