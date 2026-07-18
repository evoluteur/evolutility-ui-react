// Evolutility-UI-React :: format.tsx

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
import type { Field } from "types/model";

export const { filesUrl } = config;
let { baseName = "/" } = config;
if (!baseName.endsWith("/")) {
  baseName += "/";
}
export { baseName };

export const pixPath = baseName + "pix/";

export const evoPath = "demos";

dayjs.locale(locale || navigator.language);

const _locale = locale || undefined;
const numFormatters: Record<string, Intl.NumberFormat> = {
  integer: new Intl.NumberFormat(_locale, { maximumFractionDigits: 0 }),
  decimal: new Intl.NumberFormat(_locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  money: new Intl.NumberFormat(_locale, {
    style: "currency",
    currency: "USD",
  }),
  // legacy numeral format strings used in field definitions
  "0,0": new Intl.NumberFormat(_locale, { maximumFractionDigits: 0 }),
  "0,0.00": new Intl.NumberFormat(_locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  "$0,0.00": new Intl.NumberFormat(_locale, {
    style: "currency",
    currency: "USD",
  }),
  "0000": new Intl.NumberFormat(_locale, {
    minimumIntegerDigits: 4,
    useGrouping: false,
    maximumFractionDigits: 0,
  }),
};

const offSet = new Date().getTimezoneOffset();
const offSetx60000 = offSet * 60000;

const offsetTime = (() => {
  const num2Digits = (n: number) => ("0" + n).slice(-2);
  const os60 = Math.abs(offSet / 60);
  const os60int = Math.trunc(os60);
  return (
    (offSet > 0 ? "+" : "-") +
    num2Digits(os60int) +
    ":" +
    num2Digits(os60 - os60int)
  );
})();

export const xItemsCount = (
  count: number,
  nameSingular: string,
  namePlural: string,
): string =>
  count === 0
    ? "No " + namePlural
    : count === 1
      ? "1 " + nameSingular
      : count + " " + namePlural;

export const nullOrUndefined = (v: unknown): v is null | undefined =>
  v === null || v === undefined;

export const integerString = (d: unknown): string =>
  nullOrUndefined(d) ? "" : numFormatters.integer.format(d as number);
export const decimalString = (d: unknown): string =>
  nullOrUndefined(d) ? "" : numFormatters.decimal.format(d as number);
export const moneyString = (d: unknown): string =>
  nullOrUndefined(d) ? "" : numFormatters.money.format(d as number);

export const numString = (d: number): string =>
  Number.isInteger(d) ? integerString(d) : decimalString(d);

const mFormat = (d: unknown, format: string): string =>
  nullOrUndefined(d) ? "" : dayjs(d as string | Date).format(format);
export const numFormat = (d: unknown, format: string): string =>
  nullOrUndefined(d)
    ? ""
    : (numFormatters[format] ?? numFormatters.integer).format(d as number);

// --- date formats ---
export const trueDate = (d: string | Date | null | undefined): Date | null => {
  if (!d) {
    return null;
  }
  const d1 = new Date(d);
  return new Date(d1.getTime() + offSetx60000);
};

export const dateTZ = (d: Date | null): string =>
  d !== null ? `"${d.toISOString()}"` : "null";
export const timeTZ = (timeString: string | null | undefined): string => {
  if (!timeString) {
    return "null";
  }
  return `"${timeString}${offsetTime}"`;
};

export const dateString = (d: unknown): string => mFormat(d, "L");
export const timeString = (d: string | null | undefined): string | null =>
  d ? dayjs(d, "HH:mm:ss").format("hh:mm A") : null;
export const datetimeString = (d: unknown): string => mFormat(d, "L hh:mm A");

export const image = (d: string | null): React.ReactElement | null =>
  d === null ? null : <img src={d} className="img-thumbnail" alt="" />;

export const jsonString = (value: unknown): string =>
  value !== null && typeof value === "object"
    ? JSON.stringify(value, null, 2)
    : ((value as string) ?? "");

export const numFieldValue = (f: Field, value: unknown): string =>
  numFormat(value, f.format || f.type);

export const capitalize = (word: string | null | undefined): string => {
  // TODO: maybe use _.string.capitalize(word);
  if (word && word.length > 0) {
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
