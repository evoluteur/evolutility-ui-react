// Evolutility-UI-React :: format.js

// Helpers for string, numbers, and date formats

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React from "react";
import Icon from "react-crud-icons";
import numeral from "numeral";
import moment from "moment";

import { locale } from "../i18n/i18n";
// include locale support for other languages
// import 'moment/locale/fr'
// import 'moment/locale/es'

import config from "../config";
import { fieldTypes as ft } from "./dico";

export let { filesUrl, baseName = "/" } = config;
if (!baseName.endsWith("/")) {
  baseName += "/";
}
export const pixPath = baseName + "pix/";

// Set the locale from the browser -- which may need to be configured
moment.locale(
  locale || window.navigator.userLanguage || window.navigator.language
);

const f_decimal = "0,0.00";
const f_integer = "0,0";
const f_money = "$0,0.00";

const offSet = new Date().getTimezoneOffset();
const offSetx60000 = offSet * 60000;

export const xItemsCount = (count, nameSingular, namePlural) =>
  count === 0
    ? "No " + namePlural
    : count === 1
    ? "1 " + nameSingular
    : count + " " + namePlural;

// const isFunction = (x) => typeof x === "function";
export const numString = (d) =>
  Number.isInteger(d) ? integerString(d) : decimalString(d);

export const nullOrUndefined = (v) => v === null || v === undefined;
const mFormat = (d, format) =>
  nullOrUndefined(d) ? "" : moment(d).format(format);
const numFormat = (d, format) =>
  nullOrUndefined(d) ? "" : numeral(d).format(format);

// --- date formats ---
export const trueDate = (d) => {
  if (!d) {
    return null;
  }
  const d1 = new Date(d);
  return new Date(d1.getTime() + offSetx60000);
};
export const dateTZ = (d) => (d !== null ? d.toISOString() : null);
export const dateString = (d) => mFormat(d, "L");
// const timeString = d => mFormat(moment(d, 'HH:mm:ss'), 'LTS')
export const timeString = (d) => mFormat(moment(d, "HH:mm:ss"), "hh:mm A");
export const datetimeString = (d) => mFormat(d, "L hh:mm A");
const dateOpt = (d, type) => {
  if (type === ft.time) {
    return timeString(d);
  }
  return dateString(d);
};

export const image = (d) => {
  if (d === null) {
    return null;
  }
  return <img src={d} className="img-thumbnail" alt="" />;
};
//const intFormatter = new Intl.NumberFormat(locale);
export const integerString = (d) => numFormat(d, f_integer);
export const decimalString = (d) => numFormat(d, f_decimal);
export const moneyString = (d) => numFormat(d, f_money);
const jsonString = (js) => (js ? JSON.stringify(js, null, "\t") : "");

export const fieldValue = (f, d, abbr) => {
  if (f.type === ft.bool) {
    return d ? <Icon className="checkbox" name="check" theme="none" /> : "";
  }
  if (f.type === ft.int) {
    return numFormat(d, f.format ? f.format : f_integer);
  }
  if (f.type === ft.dec) {
    return numFormat(d, f.format ? f.format : f_decimal);
  }
  if (f.type === ft.money) {
    return numFormat(d, f.format ? f.format : f_money);
  }
  if (f.type === ft.email && d) {
    return <a href={`mailto:${d}`}>{d}</a>;
  }
  if (f.type === ft.json && d) {
    return jsonString(d);
  }
  if (f.type === ft.lov) {
    return (
      <span className="lov-wicon">
        {f.lovIcon && d?.icon && (
          <img id={d.icon} src={pixPath + d.icon} alt=""></img>
        )}
        {d?.name}
      </span>
    );
  }
  if (f.type === ft.date) {
    return dateString(d);
  }
  if (f.type === ft.time) {
    return timeString(d);
  }
  if (f.type === ft.color) {
    return (
      <div>
        <div
          className="evo-color-box"
          id={f.id}
          style={{ backgroundColor: d }}
          title={d}
        >
          {!abbr && d && <span>{d}</span>}
        </div>
      </div>
    );
  }
  if (f.type === ft.image && d) {
    return image(filesUrl + d);
  }
  if (f.type === ft.url && d) {
    return (
      <a href={d} target="_blank" rel="noopener noreferrer">
        {d}
      </a>
    );
  }
  return d;
};

export const capitalize = (word) => {
  // TODO: maybe use _.string.capitalize(word);
  if (word && word.length > 0) {
    return word.substring(0, 1).toUpperCase() + word.substring(1); // .toLowerCase();
  }
  return "";
};

const formatLib = {
  // config to override browser
  locale: moment.locale(),
  now: () => moment(),
  fieldValue,
  dateOpt,
  dateString,
  timeString,
  datetimeString,
  decimalString,
  moneyString,
  jsonString,
};

export default formatLib;
