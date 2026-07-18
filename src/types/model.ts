/*
  Evolutility-UI-React :: types/model.ts

  Types for the Evolutility metamodel (models, fields, groups, collections).
  https://github.com/evoluteur/evolutility-ui-react
*/

export type FieldType =
  | "text"
  | "textmultiline"
  | "boolean"
  | "integer"
  | "decimal"
  | "money"
  | "date"
  | "time"
  | "lov"
  | "email"
  | "image"
  | "document"
  | "url"
  | "color"
  | "json";

// - Value of a field of type "lov"
export interface LovValue {
  id: string | number;
  name?: string;
  icon?: string;
}

// - Item of a static (inlined) list of values
export interface LovListItem {
  id: string | number;
  text: string;
  icon?: string;
}

// - Generic record data (record shape is driven by the model, not known statically)
export type RecordData = Record<string, any> & { id?: number };

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  labelShort?: string;
  labelEdit?: string;
  labelCharts?: string;
  required?: boolean;
  readOnly?: boolean;
  defaultValue?: unknown;
  max?: number;
  min?: number;
  maxLength?: number;
  minLength?: number;
  regExp?: string;
  inMany?: boolean;
  inSearch?: boolean;
  height?: number;
  width?: number;
  format?: string;
  help?: string;
  noFilters?: boolean;
  noCharts?: boolean;
  noStats?: boolean;
  chartType?: "bars" | "pie" | "table";
  list?: LovListItem[];
  lovIcon?: boolean;
  lovColumn?: string;
  object?: string;
  chartObject?: string;
  aggregate?: string;
  fnValidate?: (field: Field, value: unknown) => string;
}

export interface FieldGroup {
  id?: string;
  type?: "panel";
  label?: string;
  title?: string;
  width?: number;
  help?: string;
  header?: string;
  footer?: string;
  fields: string[];
}

export interface Collection {
  id: string;
  title: string;
  object?: string;
  column?: string;
  order?: string;
  orderBy?: string;
  icon?: string;
  help?: string;
  header?: string;
  footer?: string;
  hideIfEmpty?: boolean;
  // - list of field ids, replaced in place w/ Field objects by moMaPrep
  fields: (string | Field)[];
}

export interface Model {
  id: string;
  qid?: string;
  title?: string;
  world?: string;
  name: string;
  namePlural: string;
  icon?: string;
  active?: boolean;
  position?: number;
  readOnly?: boolean;
  defaultViewMany?: "list" | "cards";
  defaultViewOne?: "browse" | "edit";
  titleField?: string;
  titleFunction?: (data: RecordData) => string;
  fields: Field[];
  groups?: FieldGroup[];
  collections?: Collection[];
  noCharts?: boolean;
  noStats?: boolean;
  noActivity?: boolean;

  // - computed at startup by utils/moMaPrep
  fieldsH: Record<string, Field>;
  _lovNoList?: string[];
  _prepared?: boolean;
  _preparedCollecs?: boolean;
}

// - Models as authored (before moMaPrep fills in fieldsH etc.)
export type ModelInput = Omit<Model, "fieldsH" | "titleField"> & {
  fieldsH?: Record<string, Field>;
  titleField?: string;
};

export interface ChartDatum {
  id: string | number;
  label: string;
  value: number;
}

// - Field editors report changes either as a native-like change event
//   ({ target: { id, value } }, e.g. <input>, FieldDate, FieldUpload)
//   or as a selected value + meta ({ value, label }, { name }, e.g. FieldObject typeahead)
export interface FieldChangeEvent {
  target: {
    id: string;
    value?: unknown;
    checked?: boolean;
  };
}

export interface FieldChangeValue {
  value: string | number;
  label?: unknown;
}

// - Structurally compatible with React's ChangeEvent<HTMLInputElement | ...>
//   (target.id/value/checked), so native <input onChange> handlers satisfy this too.
export type FieldChangeArg = FieldChangeEvent | FieldChangeValue;

export type FieldOnChange = (
  evt: FieldChangeArg,
  meta?: { name: string },
) => void;
