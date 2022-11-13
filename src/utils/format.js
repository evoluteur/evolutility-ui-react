// Evolutility-UI-React :: format.js

// Helpers for string, numbers, and date formats

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React from "react";
import numeral from "numeral";
import moment from "moment";

// include locale support for a few chosen countries -- add more as needed
// import 'moment/locale/en-gb'
// import 'moment/locale/en-au'
// import 'moment/locale/fr'
// import 'moment/locale/de'
// import 'moment/locale/es'

import { filesUrl, locale } from "../config";
import { fieldTypes as ft } from "./dico";

// const isFunction = (x) => typeof x === "function";

const nullOrUndefined = (v) => v === null || v === undefined;
const mFormat = (d, format) =>
  nullOrUndefined(d) ? "" : moment(d).format(format);
const numFormat = (d, format) =>
  nullOrUndefined(d) ? "" : numeral(d).format(format);

// --- date formats ---
export const dateTZ = (d) => (d ? d.toISOString() : null);
export const dateString = (d) => mFormat(d, "L");
// const timeString = d => mFormat(moment(d, 'HH:mm:ss'), 'LTS')
const timeString = (d) => mFormat(moment(d, "HH:mm:ss"), "hh:mm A");
const datetimeString = (d) => mFormat(d, "L hh:mm A");
function dateOpt(d, type) {
  if (type === ft.time) {
    return timeString(d);
  }
  // if (type === ft.datetime) {
  //   return dateString(d);
  // }
  return dateString(d);
}

const decimalString = (d) => numFormat(d, d > 1 ? "0.00" : "0.000");
const moneyString = (d) => numFormat(d, "$0,0.00");
const jsonString = (js) => (js ? JSON.stringify(js, null, "\t") : "");

export function image(d) {
  if (d === null) {
    return null;
  }
  return <img src={d} className="img-thumbnail" alt="" />;
}

export function fieldValue(f, d, abbr) {
  if (f.type === ft.bool) {
    return d ? <i className="glyphicon glyphicon-ok" /> : "";
  }
  if (f.type === ft.email && d) {
    return <a href={`mailto:${d}`}>{d}</a>;
  }
  if (f.type === ft.json && d) {
    return jsonString(d);
  }
  if (f.type === ft.dec && d) {
    return decimalString(d);
  }
  if (f.type === ft.money && d) {
    return moneyString(d);
  }
  if (f.type === ft.lov) {
    return (
      <>
        {f.lovIcon && <img src={d.icon} alt=""></img>}
        {d}
      </>
    );
  }
  if (f.type === ft.date) {
    return dateString(d);
  }
  if (f.type === ft.time) {
    return timeString(d);
  }
  if (f.type === ft.datetime) {
    return datetimeString(d);
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
          {!abbr && d ? <span>{d}</span> : null}
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
}

export const dataTitle = (m, data, isNew) => {
  if (m) {
    let f,
      title = "";
    if (isNew) {
      title = `New ${m.name || "item"}`;
    } else if (m.titleFunction) {
      // Note: would this be unsecure?
      // title = m.titleFunction(data, m);
      title = m.titleFunction(Object.assign({}, data));
    } else if (m.titleField) {
      title = data[m.titleField];
    } else {
      const tf = m.titleField + "";
      f = m.fieldsH[tf];
      if (!f) {
        f = m.fields[0];
      }
      if (f && data) {
        title = fieldValue(f, data[f.id]);
      }
    }
    return title;
  }
  return "New item";
};

// Set the locale from the browser -- which may need to be configured
moment.locale(
  locale || window.navigator.userLanguage || window.navigator.language
);

export function capitalize(word) {
  // TODO: maybe use _.string.capitalize(word);
  if (word && word.length > 0) {
    return word.substring(0, 1).toUpperCase() + word.substring(1); // .toLowerCase();
  }
  return "";
}

export function doc(d, path) {
  if (nullOrUndefined(d)) {
    return null;
  }
  return (
    <a href={encodeURI(path + d)} target="_blank" rel="noopener noreferrer">
      {d}
    </a>
  );
}

export function urlJoin(u1, u2) {
  const slashu2 = u2[0] === "/";
  const slashu1 = u1[u1.length - 1] === "/";
  if (slashu2 && slashu1) {
    return u1 + u2.substring(1);
  }
  if (!slashu2 && !slashu1) {
    return `${u1}/${u2}`;
  }
  return u1 + u2;
}

const formatLib = {
  // config to override browser
  locale: moment.locale(),

  now: () => moment(),

  fieldValue,
  image,
  doc,

  // --- date formats ---
  dateOpt,
  dateString,
  timeString,
  datetimeString,
  decimalString,
  moneyString,
  jsonString,

  urlJoin,

  capitalize,
};

export default formatLib;
