// Evolutility-UI-React :: format.js

// Helpers for string, numbers, and date formats

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React from "react";
import numeral from "numeral";
import moment from "moment";
import { isObject } from "underscore";

import { locale } from "../i18n/i18n";
// include locale support for other languages
// import 'moment/locale/fr'
// import 'moment/locale/es'

import config from "../config";

export let { filesUrl, baseName = "/" } = config;
if (!baseName.endsWith("/")) {
  baseName += "/";
}

export const pixPath = baseName + "pix/";

moment.locale(
  locale || window.navigator.userLanguage || window.navigator.language
);

const decimalFormat = "0,0.00";
const integerFormat = "0,0";
const moneyFormat = "$0,0.00";

const typeFormats = {
  decimal: decimalFormat,
  integer: integerFormat,
  money: moneyFormat,
};

const offSet = new Date().getTimezoneOffset();
const offSetx60000 = offSet * 60000;

const offsetTime = (() => {
  const num2Digits = (n) => ("0" + n).slice(-2);
  const os60 = Math.abs(offSet / 60);
  const os60int = parseInt(os60, 10);
  return (
    (offSet > 0 ? "+" : "-") +
    num2Digits(os60int) +
    ":" +
    num2Digits(os60 - os60int)
  );
})();

export const xItemsCount = (count, nameSingular, namePlural) =>
  count === 0
    ? "No " + namePlural
    : count === 1
      ? "1 " + nameSingular
      : count + " " + namePlural;

export const numString = (d) =>
  Number.isInteger(d) ? integerString(d) : decimalString(d);

export const nullOrUndefined = (v) => v === null || v === undefined;

const mFormat = (d, format) =>
  nullOrUndefined(d) ? "" : moment(d).format(format);
export const numFormat = (d, format) =>
  nullOrUndefined(d) ? "" : numeral(d).format(format);

// --- date formats ---
export const trueDate = (d) => {
  if (!d) {
    return null;
  }
  const d1 = new Date(d);
  return new Date(d1.getTime() + offSetx60000);
};

export const dateTZ = (d) => (d !== null ? `"${d.toISOString()}"` : "null");
export const timeTZ = (timeString) => {
  if (!timeString) {
    return "null";
  }
  return `"${timeString}${offsetTime}"`;
};

export const dateString = (d) => mFormat(d, "L");
export const timeString = (d) =>
  d ? mFormat(moment(d, "HH:mm:ss"), "hh:mm A") : null;
export const datetimeString = (d) => mFormat(d, "L hh:mm A");

export const image = (d) =>
  d === null ? null : <img src={d} className="img-thumbnail" alt="" />;

//const intFormatter = new Intl.NumberFormat(locale);
export const integerString = (d) => numFormat(d, integerFormat);
export const decimalString = (d) => numFormat(d, decimalFormat);
export const moneyString = (d) => numFormat(d, moneyFormat);
export const jsonString = (value) =>
  isObject(value) ? JSON.stringify(value, null, 2) : value || "";

export const numFieldValue = (f, value) =>
  numFormat(value, f.format ? f.format : typeFormats[f.type] || null);

export const capitalize = (word) => {
  // TODO: maybe use _.string.capitalize(word);
  if (word?.length > 0) {
    return word.substring(0, 1).toUpperCase() + word.substring(1); // .toLowerCase();
  }
  return "";
};

const formatLib = {
  // config to override browser
  locale: moment.locale(),
  dateString,
  timeString,
  datetimeString,
  decimalString,
  moneyString,
  jsonString,
  numFieldValue,
};

export default formatLib;
