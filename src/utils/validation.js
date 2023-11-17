// Evolutility-UI-React :: utils/validation.js

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// TODO: use Yup instead of this code
import { isUndefined, isObject, isArray, isDate, isString } from "underscore";
import { fieldTypes as ft, fieldIsNumber } from "./dico";
import { locale, i18n_validation } from "../i18n/i18n";

const valRegExp = {
  email: /^[\w.-]+@[\w.-]+\.[\w.-]+$/,
  integer: /^[-+]?\d+$/, // /^[0-9]*/,
  decimal_en: /(\+|-)?(\d*\.\d*)?$/,
  decimal_fr: /(\+|-)?(\d*,\d*)?$/,
  //decimalDA: /(\+|-)?(\d*\,\d*)?$/,
};

export const validateField = (f, v) => {
  const isNumberField = fieldIsNumber(f);
  const formatMsg = (fLabel, msg, r2, r3) =>
    msg.replace("{0}", fLabel).replace("{1}", r2).replace("{2}", r3);

  const fieldLabel = (f) => f.label || f.labelShort;

  if (!f.readOnly) {
    // Check required and empty
    if (
      f.required &&
      (v === null ||
        v === "" ||
        isUndefined(v) ||
        (isNumberField && isNaN(v)) ||
        (f.type === ft.lov && !v.id) ||
        (f.type === ft.list && v && !v.length)) //||
      //(f.type===ft.color && v==='#000000')
    ) {
      return formatMsg(f.label, i18n_validation.empty);
    } else if (!isUndefined(v)) {
      // Check field type
      if (!(isNaN(v) && isNumberField)) {
        if (v !== null && v !== "" && !isArray(v)) {
          switch (f.type) {
            case ft.int:
            case ft.email:
              if (!valRegExp[f.type].test(v)) {
                return formatMsg(fieldLabel(f), i18n_validation[f.type]);
              }
              break;
            case ft.dec:
            case ft.money:
              const regex =
                valRegExp["decimal_" + locale] || valRegExp.decimal_en;
              if (!regex.test(v)) {
                return formatMsg(fieldLabel(f), i18n_validation[f.type]);
              }
              break;
            case ft.date:
            case ft.time:
              if (v !== "" && !isDate(new Date(v))) {
                return formatMsg(fieldLabel(f), i18n_validation[f.type]);
              }
              break;
            case ft.json:
              let obj;
              if (isObject(v)) {
                obj = v;
              } else {
                try {
                  obj = JSON.parse(v);
                } catch (err) {}
              }
              if (isUndefined(obj)) {
                return formatMsg(fieldLabel(f), i18n_validation[f.type]);
              }
              break;
            default:
              // do nothing
              break;
          }
        }
      }

      // Check regexp
      if (f.regExp !== null && !isUndefined(f.regExp)) {
        const rg = new RegExp(f.regExp);
        if (!v.match(rg)) {
          return formatMsg(
            fieldLabel(f),
            i18n_validation.regExp,
            fieldLabel(f)
          );
        }
      }

      // Check min & max & number type
      if (isNumberField) {
        if (isNaN(v)) {
          return i18n_validation.invalid;
        }
        if (v !== "") {
          if (f.max && parseFloat(v) > f.max) {
            return formatMsg(fieldLabel(f), i18n_validation.max, f.max);
          }
          if (f.min && parseFloat(v) < f.min) {
            return formatMsg(fieldLabel(f), i18n_validation.min, f.min);
          }
        }
      }
    }

    // Check custom validation
    if (f.fnValidate) {
      const fValid = f.fnValidate(f, v);
      if (fValid !== "") {
        return formatMsg(fieldLabel(f), fValid);
      }
    }

    // Check minLength and maxLength
    if (isString(v) && !isNumberField) {
      const len = v.length,
        badMax = f.maxLength ? len > f.maxLength : false,
        badMin = f.minLength ? len < f.minLength : false;
      if (badMax || badMin) {
        if (f.maxLength && f.minLength) {
          return formatMsg(
            fieldLabel(f),
            i18n_validation.minMaxLength,
            f.minLength,
            f.maxLength
          );
        } else if (f.maxLength) {
          return formatMsg(
            fieldLabel(f),
            i18n_validation.maxLength,
            f.maxLength
          );
        } else {
          return formatMsg(
            fieldLabel(f),
            i18n_validation.minLength,
            f.minLength
          );
        }
      }
    }
  }
  return "";
};

export const validate = (model, data) => {
  const messages = [];
  const invalids = {};
  let cMsg;
  model.fields?.forEach((f) => {
    cMsg = validateField(f, data[f.id]);
    if (cMsg) {
      messages.push(cMsg);
      invalids[f.id] = cMsg;
    }
  });
  return {
    isValid: messages.length < 1,
    messages,
    invalids,
  };
};

export const diffData = (model, data, userData) => {
  const diffs = {};
  model.fields.forEach((f) => {
    const fid = f.id;
    if (data[fid] !== userData[fid]) {
      diffs[fid] = userData[fid];
    }
  });
  if (Object.keys(diffs).length) {
    return diffs;
  }
  return null;
};

const validation = {
  validateField,
  diffData,
};

export default validation;
