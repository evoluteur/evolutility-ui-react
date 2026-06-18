// Evolutility-UI-React :: format.js

// Helpers for string, numbers, and date formats

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

import { locale } from "i18n/i18n";
// include locale support for other languages
// import 'dayjs/locale/fr'
// import 'dayjs/locale/es'

import config from "config";

export let { filesUrl, baseName = "/" } = config;
if (!baseName.endsWith("/")) {
  baseName += "/";
}

export const pixPath = baseName + "pix/";

export const evoPath = "demos";

dayjs.locale(
  locale || window.navigator.userLanguage || window.navigator.language,
);

const _locale = locale || undefined;
const numFormatters = {
  integer:   new Intl.NumberFormat(_locale, { maximumFractionDigits: 0 }),
  decimal:   new Intl.NumberFormat(_locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  money:     new Intl.NumberFormat(_locale, { style: "currency", currency: "USD" }),
  // legacy numeral format strings used in field definitions
  "0,0":     new Intl.NumberFormat(_locale, { maximumFractionDigits: 0 }),
  "0,0.00":  new Intl.NumberFormat(_locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  "$0,0.00": new Intl.NumberFormat(_locale, { style: "currency", currency: "USD" }),
  "0000":    new Intl.NumberFormat(_locale, { minimumIntegerDigits: 4, useGrouping: false, maximumFractionDigits: 0 }),
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
  nullOrUndefined(d) ? "" : dayjs(d).format(format);
export const numFormat = (d, format) =>
  nullOrUndefined(d) ? "" : (numFormatters[format] ?? numFormatters.integer).format(d);

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
  d ? dayjs(d, "HH:mm:ss").format("hh:mm A") : null;
export const datetimeString = (d) => mFormat(d, "L hh:mm A");

export const image = (d) =>
  d === null ? null : <img src={d} className="img-thumbnail" alt="" />;

export const integerString = (d) => nullOrUndefined(d) ? "" : numFormatters.integer.format(d);
export const decimalString = (d) => nullOrUndefined(d) ? "" : numFormatters.decimal.format(d);
export const moneyString = (d) => nullOrUndefined(d) ? "" : numFormatters.money.format(d);
export const jsonString = (value) =>
  value !== null && typeof value === "object"
    ? JSON.stringify(value, null, 2)
    : value || "";

export const numFieldValue = (f, value) =>
  numFormat(value, f.format || f.type);

export const capitalize = (word) => {
  // TODO: maybe use _.string.capitalize(word);
  if (word?.length > 0) {
    return word.substring(0, 1).toUpperCase() + word.substring(1); // .toLowerCase();
  }
  return "";
};

const formatLib = {
  // config to override browser
  locale: dayjs.locale(),
  dateString,
  timeString,
  datetimeString,
  decimalString,
  moneyString,
  jsonString,
  numFieldValue,
};

export default formatLib;
