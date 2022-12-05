/*
    Evolutility-UI-React Localized strings in ENGLISH
    (c) 2022 Olivier Giulieri
    https://github.com/evoluteur/evolutility-ui-react
*/

export const i18n_nav = {
  loading: "Loading...",
  longLoading: "Still loading...",
  skip: "Skip navigation",
};

// --- toolbar & buttons for actions ---
export const i18n_actions = {
  browse: "Browse",
  edit: "Edit",
  // login: 'Login',
  new: "New",
  newEntity: "New {0}", // 'New Item',
  // search: 'Search',
  // newSearch: 'New Search',
  // searchRes: 'Search Result',
  // selection: 'Selection',
  // selections: 'Selections',
  export1: "Export",
  // import: 'Import',
  // massUpdate: 'Mass Update',
  expend: "Expend",
  collapse: "Collapse",
  delete1: "Delete",
  // bAll: 'All',
  list: "List",
  cards: "Cards",
  // bJSON: 'JSON',
  filter: "Filter",
  // bScatter:'Scatter',
  charts: "Dashboard", // 'Charts',
  // refresh: 'Refresh',
  // print: 'Print',
  stats: "Stats",
  activity: "Activity",
  save: "Save",
  // saveAdd: 'Save and Add Another',
  ok: "OK",
  cancel: "Cancel",

  // --- navigation/pagination ---
  prev: "Previous",
  next: "Next",

  dropFile: "Drop the file here, or click to select the file to upload.",
  // dropFiles: 'Drop files here, or click to select files to upload.',
  remove_image: "Remove image",
  remove_document: "Remove document",

  deleted: "{0} deleted.",
  updated: "{0} updated.",
  added: "New {0} added.",
  downloadingCSV: "Downloading CSV export.",
};

// --- status ---
export const i18n_msg = {
  nodata: "No {0} found.", // 0=entities
  nodataSearch: 'No {0} found in search for "{1}".',
  addTheFirst: "Add the first {0}",
  loading: "Loading data...",
  confirmLeave: "Your work is not saved! Are you sure you want to leave?",
  range: "{0} to {1} of {2} {3}", // 0=rangeBegin, 1=rangeEnd, 2=mSize, 3=entities'
  aToBOfC: "{0} of {1} {2}", // 0=mSize, 1=totSize, 2=entities'
  // sgn_money: '$', // indicator for money
  // sgn_email: '@', // indicator for email
  added: 'New {0} "{1}" added.',
  updated: '{0} "{1}" updated.',
  deleted: '{0} "{1}" deleted.',
  // error: 'Error',
  noUpdate: "No update necessary.",
  // deleteSelectionConfirmation: 'Do you really want to delete the selected {0}?',
  deleteConfirmation: 'Do you really want to delete the {0} "{1}"?',
  delete: "Delete {0}?",
};

// --- validation ---
export const i18n_validation = {
  incomplete: "Incomplete or invalid information.",
  invalid: "Invalid format.",
  // invalidList: '{0} values in "{1}" are invalid.',
  // invalidList1: '1 value in "{1}" is invalid.',
  empty: '"{0}" must have a value.',
  email: '"{0}" must be a valid email formatted like "name@domain.com".',
  integer: '"{0}" must only use numbers.',
  decimal: '"{0}" must be a valid decimal numbers.',
  money: '"{0}" must be a valid number.',
  date: '"{0}" must be a valid date, format must be "MM/DD/YYYY" like "12/24/2017".',
  datetime:
    '"{0}" must be a valid date/time, format must be "MM/DD/YYYY hh:mm AM/PM" like "12/24/2017 10:30 AM".',
  time: '"{0}" must be a valid date/time, format must be "hh:mm AM/PM" like "10:30 AM".',
  json: '"{0}" must be a valid JSON expression like "{"a": 1}".',
  max: '"{0}" must be smaller or equal to {1}.',
  min: '"{0}" must be greater or equal to {1}.',
  maxLength: '"{0}" must be {1} characters long maximum.',
  minLength: '"{0}" must be at least {1} characters long.',
  minMaxLength: '"{0}" must be between {1} and {2} characters long.',
  regExp: '"{0}" is not of the expected format.',
};

// --- charts ---
export const i18n_charts = {
  dash: "{0} Dashboard",
  nocharts: "No default charts, the object doesn't have numeric fields.",
  total: "Total",
  noData: "No data",
  objectByField: "{0} by {1}",
  emptyData: "The query returned no results.",
  pie: "Pie",
  bars: "Bars",
  table: "Table",
  percentage: "Percentage",
  count: "Count",
};

// --- comments ---
export const i18n_comments = {
  comment: "comment",
  comments: "comments",
};

export const i18n_stats = {
  metaCount: "{0} records, {1} fields",
  collecsCount: ", {0} collections",
  statsTitle: "{0} Stats",
  weekUpdates: " records added or updated this week",
  lastUpdate: "Last update",
  firstInsert: "First insert",
  totalComments: "Number of comments",
  total: "Total",
  avg: "Average",
  stddev: "Std. Deviation",
  variance: "Variance",
  min: "Minimum",
  max: "Maximum",
  sum: "Sum", // "Total", ?
  noFit: "The data doesn't have any numeric fields necessary for stats.",
  noData: "No data",
  emptyData: "The query returned no results.",
};

export const i18n_activity = {
  activitySince: "My {0} activity since {1}.", // {0} = model.namePlural, {1} = startDate
  lastViewed: "Last viewed {0}",
  mostViewed: "Most viewed {0}",
  noActivity: "No activity recorded yet.",
  views0: "never viewed",
  views1: "1 view",
  viewsN: `{0} views`,
};

export const i18n_errors = {
  badId: 'No data found for id="{0}".',
  badEntity: 'Invalid parameter: entity="{0}".',
  badChart: "Couldn't retrieve charts data.",
  badUpload: "Error uploading file.",
};
/*
    i18n_login: {
        title: 'Login',
        user: 'User',
        password: 'Password',
        btnLogin: 'Login',
        invalid: 'Invalid username/password combination.',
    },
*/

export const locale = "en";
export const language = "English";

const allStrings = {
  locale,
  language,
  i18n_nav,
  i18n_actions,
  i18n_msg,
  i18n_validation,
  i18n_charts,
  i18n_comments,
  i18n_stats,
  i18n_activity,
  i18n_errors,
  // i18n_login,
};

export default allStrings;
