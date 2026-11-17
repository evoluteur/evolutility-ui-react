/*
  Evolutility-UI-React :: dao/mapping.ts

  Conversion between the REST payloads and the shapes expected by the views.

  Records: the API returns fields of type "lov" as 3 flat columns
  ("category", "category_txt", "category_icon") while the UI expects
  a single object value ({ id, name, icon }).

  https://github.com/evoluteur/evolutility-ui-react
  (c) 2026 Olivier Giulieri
*/

import { fieldTypes as ft, fieldIsText } from "utils/dico";
import { decimalString } from "utils/format";
import type {
  ChartDatum,
  Field,
  LovValue,
  Model,
  RecordData,
} from "types/model";
import type { ModelDef, StatsData } from "types/api";
import type { ModelInput } from "types/model";

//#region  ----- Records ----------------------------

const lovValue = (row: RecordData, f: Field): LovValue | null => {
  const id = row[f.id];
  if (id === null || id === undefined || id === "") {
    return null;
  }
  const value: LovValue = {
    id,
    name: row[f.id + "_txt"],
  };
  if (f.lovIcon && row[f.id + "_icon"]) {
    value.icon = row[f.id + "_icon"];
  }
  return value;
};

// - convert one record from the API into the shape used by the views
export const restToRecord = (
  fields: (Field | string)[] | undefined,
  row: RecordData,
): RecordData => {
  const record: RecordData = { ...row };
  delete record._full_count;
  (fields as Field[])?.forEach((f) => {
    if (f?.type === ft.lov) {
      record[f.id] = lovValue(row, f);
      delete record[f.id + "_txt"];
      delete record[f.id + "_icon"];
    }
  });
  return record;
};

export const restToRecords = (
  fields: (Field | string)[] | undefined,
  rows: RecordData[] | null | undefined,
): RecordData[] => (rows || []).map((row) => restToRecord(fields, row));

const toJsonValue = (value: unknown): unknown => {
  if (value === null || value === "") {
    return null;
  }
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
};

const toDateValue = (value: unknown): string | null => {
  if (!value) {
    return null;
  }
  const date = value instanceof Date ? value : new Date(value as string);
  return isNaN(date.getTime()) ? null : date.toISOString();
};

// - convert a record (or a partial record) from the views into an API payload
export const recordToRest = (
  model: Model,
  data: RecordData,
): Record<string, unknown> => {
  const payload: Record<string, unknown> = {};
  model.fields.forEach((f) => {
    const value = data[f.id];
    if (value === undefined || f.readOnly) {
      return;
    }
    switch (f.type) {
      case ft.lov:
        payload[f.id] = (value as LovValue)?.id ?? null;
        break;
      case ft.bool:
        payload[f.id] = !!value;
        break;
      case ft.date:
        payload[f.id] = toDateValue(value);
        break;
      case ft.time:
        payload[f.id] = value || null;
        break;
      case ft.json:
        payload[f.id] = toJsonValue(value);
        break;
      case ft.int:
      case ft.dec:
      case ft.money:
        payload[f.id] = value === "" ? null : value;
        break;
      default:
        payload[f.id] = value;
    }
  });
  return payload;
};
//#endregion

//#region  ----- Analytics ----------------------------

// - the chart end-point returns rows of { id, label, value }
export const restToChart = (rows: RecordData[] | null): ChartDatum[] =>
  (rows || [])
    .filter((row) => row.label !== null && row.label !== undefined)
    .map((row) => ({
      id: row.id ?? row.label,
      label: String(row.label),
      value: Number(row.value),
    }))
    .filter((datum) => datum.value > 0);

const decimalStats = ["avg", "stddev", "variance"] as const;
const rawStats = ["min", "max", "sum"] as const;
const lengthStats = ["minLength", "maxLength"] as const;

// - the stats end-point returns one object per field (w/ the nulls count),
//   the view expects one object per field starting w/ the nulls count
export const restToStats = (model: Model, data: StatsData): StatsData => {
  const stats: StatsData = {};
  model.fields.forEach((f) => {
    const aggregations = data?.[f.id];
    const fieldStats: Record<string, unknown> = {
      nulls: aggregations?.nulls ?? 0,
    };
    // - string fields: min and max length
    lengthStats.forEach((stat) => {
      const value = aggregations?.[stat];
      if (value !== undefined && value !== null) {
        fieldStats[stat] = value;
      }
    });
    if (aggregations && (!fieldIsText(f) || f.type === ft.time)) {
      rawStats.forEach((stat) => {
        const value = aggregations[stat];
        if (value !== undefined && value !== null) {
          fieldStats[stat] = value;
        }
      });
      decimalStats.forEach((stat) => {
        const value = aggregations[stat];
        if (value !== undefined && value !== null) {
          fieldStats[stat] = value === 0 ? value : decimalString(value);
        }
      });
    }
    stats[f.id] = fieldStats;
  });
  stats.count = data?.count || 0;
  stats.nb_comments = data?.nb_comments;
  stats.updated_at_max = data?.u_date_max;
  stats.updated_at_week_count = data?.u_date_week_count;
  stats.created_at_min = data?.c_date_min;
  return stats;
};
//#endregion

//#region  ----- Models ----------------------------

// - value of a property path in a record ("wine.name")
const pathValue = (data: RecordData, path: string): unknown =>
  path
    .split(".")
    .reduce<unknown>(
      (v, p) => (v && typeof v === "object" ? (v as RecordData)[p] : undefined),
      data,
    );

// - "{firstname} {lastname}" => (d) => d.firstname + " " + d.lastname
export const templateToFunction =
  (template: string) =>
  (data: RecordData): string =>
    template.replace(/\{([\w.]+)\}/g, (_, path: string) => {
      const v = pathValue(data, path);
      if (v === null || v === undefined) return "";
      if (typeof v === "object") {
        return String((v as { name?: unknown }).name ?? "");
      }
      return String(v);
    });

// - convert a model from the API (full model) into a UI model
export const restToModel = (def: ModelDef): ModelInput => {
  const m: Record<string, unknown> = structuredClone(def);
  delete m._version;
  delete m._updatedAt;
  m.fields = (def.fields || []).filter((f) => !f.onlyDB);
  if (typeof def.titleFunction === "string" && def.titleFunction) {
    m.titleFunction = templateToFunction(def.titleFunction);
  } else {
    delete m.titleFunction;
  }
  return m as unknown as ModelInput;
};
//#endregion

const mapping = {
  restToModel,
  templateToFunction,
  restToRecord,
  restToRecords,
  recordToRest,
  restToChart,
  restToStats,
};

export default mapping;
