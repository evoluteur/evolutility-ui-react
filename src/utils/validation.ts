// Evolutility-UI-React :: utils/validation.ts

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

// TODO: use Yup instead of this code
import { locale, i18n_validation as i18n } from "i18n/i18n";
import { fieldTypes as ft, fieldIsNumber } from "./dico";
import type { Field, Model, RecordData, LovValue } from "types/model";

const valRegExp: Record<string, RegExp> = {
  email: /^[\w.-]+@[\w.-]+\.[\w.-]+$/,
  integer: /^[-+]?\d+$/, // /^[0-9]*/,
  decimal_en: /(\+|-)?(\d*\.\d*)?$/,
  decimal_fr: /(\+|-)?(\d*,\d*)?$/,
  //decimalDA: /(\+|-)?(\d*\,\d*)?$/,
};

export const validateField = (f: Field, v: unknown): string => {
  const isNumberField = fieldIsNumber(f);
  const fieldLabel = (f: Field) => f.label || f.labelShort;
  const formatMsg = (msg: string, r2?: unknown, r3?: unknown): string => {
    let vMsg = msg.replace("{0}", fieldLabel(f) || "");
    if (r2 !== undefined) vMsg = vMsg.replace("{1}", String(r2));
    if (r3 !== undefined) vMsg = vMsg.replace("{2}", String(r3));
    return vMsg;
  };

  if (!f.readOnly) {
    // Check required and empty
    if (
      f.required &&
      (v === null ||
        v === "" ||
        v === undefined ||
        (isNumberField && isNaN(v as number)) ||
        (f.type === ft.lov && !(v as LovValue)?.id)) //||
      //(f.type===ft.color && v==='#000000')
    ) {
      return formatMsg(i18n.empty);
    } else if (v !== undefined) {
      // Check field type
      if (!(isNumberField && isNaN(v as number))) {
        if (v !== null && v !== "" && !Array.isArray(v)) {
          switch (f.type) {
            case ft.int:
            case ft.email:
              if (!valRegExp[f.type].test(v as string)) {
                return formatMsg(i18n[f.type]);
              }
              break;
            case ft.dec:
            case ft.money: {
              const regex =
                valRegExp["decimal_" + locale] || valRegExp.decimal_en;
              if (!regex.test(v as string)) {
                return formatMsg(i18n[f.type]);
              }
              break;
            }
            case ft.date:
            case ft.time:
              if (v !== "" && !(new Date(v as string) instanceof Date)) {
                return formatMsg(i18n[f.type]);
              }
              break;
            case ft.json: {
              let obj;
              if (v !== null && typeof v === "object") {
                obj = v;
              } else {
                try {
                  obj = JSON.parse(v as string);
                } catch {
                  // - leave obj undefined
                }
              }
              if (obj === undefined) {
                return formatMsg(i18n[f.type]);
              }
              break;
            }
            default:
              // do nothing
              break;
          }
        }
      }

      // Check regexp
      if (f.regExp !== null && f.regExp !== undefined) {
        const rg = new RegExp(f.regExp);
        if (!(v as string).match(rg)) {
          return formatMsg(i18n.regExp, fieldLabel(f));
        }
      }

      // Check min & max & number type
      if (isNumberField) {
        if (isNaN(v as number)) {
          return i18n.invalid;
        }
        if (v !== "") {
          if (f.max && parseFloat(v as string) > f.max) {
            return formatMsg(i18n.max, f.max);
          }
          if (f.min && parseFloat(v as string) < f.min) {
            return formatMsg(i18n.min, f.min);
          }
        }
      }
    }

    // Check custom validation
    if (f.fnValidate) {
      const fValid = f.fnValidate(f, v);
      if (fValid !== "") {
        return formatMsg(fValid);
      }
    }

    // Check minLength and maxLength
    if (typeof v === "string" && !isNumberField) {
      const len = v.length,
        badMax = f.maxLength ? len > f.maxLength : false,
        badMin = f.minLength ? len < f.minLength : false;
      if (badMax || badMin) {
        if (f.maxLength && f.minLength) {
          return formatMsg(i18n.minMaxLength, f.minLength, f.maxLength);
        } else if (f.maxLength) {
          return formatMsg(i18n.maxLength, f.maxLength);
        } else {
          return formatMsg(i18n.minLength, f.minLength);
        }
      }
    }
  }
  return "";
};

export interface ValidationResult {
  isValid: boolean;
  messages: string[];
  invalids: Record<string, string>;
}

export const validate = (model: Model, data: RecordData): ValidationResult => {
  const messages: string[] = [];
  const invalids: Record<string, string> = {};
  model.fields?.forEach((f) => {
    const cMsg = validateField(f, data[f.id]);
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

export const diffData = (
  model: Model,
  data: RecordData | null,
  userData: RecordData | null,
): Record<string, unknown> | null => {
  const diffs: Record<string, unknown> = {};
  model.fields.forEach((f) => {
    const fid = f.id;
    if (data?.[fid] !== userData?.[fid]) {
      diffs[fid] = userData?.[fid];
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
