const sortById = (a, b) => a.id.localeCompare(b.id);
const filterOnlyUI = (p) => p.ui;

export const objectMeta = {
  id: 1,
  icon: "/designer/object.png",
  name: "object",
  namePlural: "objects",
  title: "Object",
  props: [
    {
      id: "id",
      description:
        "Unique key to identify the entity (used in routes and APIs).",
      ui: true,
      db: true,
    },
    {
      id: "icon",
      description: 'Icon file name for the entity (example: "cube.gif").',
      ui: true,
      db: false,
    },
    // {
    //   id: "world",
    //   description: 'Application the object belongs to (e.g. "organizer").',
    //   ui: true,
    //   db: true,
    // },
    {
      id: "name",
      description: 'Object name (singular) (e.g.: "contact").',
      ui: true,
      db: false,
    },
    {
      id: "namePlural",
      description: 'Object name (plural) (e.g.: "contacts").',
      ui: true,
      db: false,
    },
    {
      id: "title",
      description: 'Application name (e.g.: "Addressbook").',
      ui: true,
      db: true,
    },
    {
      id: "fields",
      description: 'Array of <a href="#Field">fields</a>.',
      ui: true,
      db: true,
    },
    {
      id: "groups",
      description:
        'Array of <a href="#Field_Group">groups</a>. If not provided a single group will be used.',
      ui: true,
      db: false,
    },
    {
      id: "collections",
      description:
        'Array of <a href="#Collection">collections</a> (displayed as Lists).',
      ui: true,
      db: true,
    },
    {
      id: "titleField",
      description:
        'Id of the field which value is used as record title. Use "titleFunction" to use a calculation on the record data instead.',
      ui: true,
      db: true,
    },
    {
      id: "titleFunction",
      description:
        'Function to calculate the record title based it\'s data. Example: titleFunction = (d) => d.firstname + " " + d.lastname;',
      ui: true,
      db: true,
    },
    {
      id: "table",
      description:
        'Driving database table name (there are secondary tables for fields of type "lov").',
      db: true,
    },
    // {
    //   id: "pKey",
    //   description:
    //     'Name of the Primary key column (single column of type serial). Default to "id". In the data the key is always called "id".',
    //   db: true,
    // },
    {
      id: "defaultViewMany",
      description:
        'Default view for Many records (possible values: "list" or "cards").',
      ui: true,
      db: false,
    },
    {
      id: "defaultViewOne",
      description:
        'Default view for One record (possible values "browse" or "edit").',
      ui: true,
      db: false,
    },
  ]
    .filter(filterOnlyUI)
    .sort(sortById),
};

export const fieldMeta = {
  id: 2,
  icon: "/designer/field.png",
  name: "field",
  namePlural: "fields",
  title: "Field",
  props: [
    {
      id: "id",
      description:
        "Unique key for the field (can be the same as column but doesn't have to be).",
      ui: true,
      db: true,
    },
    {
      id: "type",
      description:
        "Field type to show in the UI. Possible field types: <ul><li>boolean (yes/no)</li><li>date</li><li>datetime</li><li>decimal</li><li>document</li><li>email</li><li>image</li><li>integer</li><li>json</li><li>list (multiselect)</li><li>lov (list of values)</li><li>money</li><li>text</li><li>textmultiline</li><li>time</li><li>url</li></ul>",
      ui: true,
      db: true,
    },
    {
      id: "label",
      description:
        "Field title (displayed with an asterisk for required fields).",
      ui: true,
      db: false,
    },
    {
      id: "labelShort",
      description:
        "Optional shorter version of the labels (used in List and Cards views).",
      ui: true,
      db: false,
    },
    {
      id: "required",
      description: "Determines if the field is required for saving.",
      ui: true,
      db: true,
    },
    {
      id: "readOnly",
      description: "Field value cannot be changed. ",
      ui: true,
      db: true,
    },
    {
      id: "defaultValue",
      description: "Default field value for new records.",
      ui: true,
      db: true,
    },
    // {
    //   id: "hideIfEmpty",
    //   description: "Hide field when empty in Browse view.",
    //   ui: true,
    //   db: false,
    // },
    {
      id: "dependentField",
      description:
        'ID of an optional dependent field. Used when selecting in one list changes the content of dependant list (among 2 fields of type "lov").records.',
      ui: true,
      db: true,
    },
    {
      id: "max",
      description: "Maximum value allowed (only applies to numeric fields).",
      ui: true,
      db: true,
    },
    {
      id: "min",
      description: "Minimum value allowed (only applies to numeric fields).",
      ui: true,
      db: true,
    },
    {
      id: "maxLength",
      description: "Maximum length allowed (only applies to text fields).",
      ui: true,
      db: true,
    },
    {
      id: "minLength",
      description: "Minimum length allowed (only applies to text fields).",
      ui: true,
      db: true,
    },
    {
      id: "regExp",
      description: "Regular expression used to validate the field value.",
      ui: true,
      db: true,
    },
    {
      id: "inMany",
      description:
        "Determines if the field is present (by default) in lists of records.",
      ui: true,
      db: true,
    },
    {
      id: "inSearch",
      description: "Determine if the field is used in text searches.",
      db: true,
    },
    {
      id: "height",
      description:
        'For fields of type "textmultiline", number of lines used in the field (in Browse and Edit views).',
      ui: true,
      db: false,
    },
    {
      id: "width",
      description:
        "Field width in Browse and Edit views (in percent of parent width). Default: 100%",
      ui: true,
      db: false,
    },
    {
      id: "help",
      description: "Optional help on the field.",
      ui: true,
      db: false,
    },
    // {
    //   id: "chartType",
    //   description:
    //     'Default charts type used for the field ("Bars", "Pie", or "Table"). The default value is "Bars".',
    //   ui: true,
    //   db: false,
    // },
    {
      id: "noFilter",
      description:
        'Exclude field from filters (only applies to fields of type integer, decimal, money, boolean, list of values which are "chartable").',
      ui: true,
      db: true,
    },
    {
      id: "noCharts",
      description:
        'Exclude field from charts (only applies to fields of type integer, decimal, money, boolean, list of values which are "chartable").',
      ui: true,
      db: true,
    },
    {
      id: "noStats",
      description: "Exclude field from stats.",
      ui: true,
      db: true,
    },
    {
      id: "column",
      description: "Database column name for the field.",
      db: true,
    },
    {
      id: "pii",
      description: "Flag for personally identifiable information.",
      ui: true,
      db: true,
    },
    {
      id: "lovTable",
      description:
        'Table to join to for field value (only for fields of "lov" type).',
      ui: true,
      db: true,
    },
    {
      id: "lovColumn",
      description:
        'Column name (in the lovTable) for field value (only for fields of "lov" type).',
      db: true,
    },
    {
      id: "lovIcon",
      description: 'LOV items have icons (only for fields of "lov" type).',
      ui: true,
      db: true,
    },
    {
      id: "deleteTrigger",
      description:
        "Deleting records in the lovTable will trigger a cascade delete (this property is only used for creating the database).",
      db: true,
    },
    {
      id: "object",
      description:
        'Model id for the object to link to (only for fields of "lov" type).',
      ui: true,
      db: true,
    },
    {
      id: "unique",
      description: "Requires value to be unique (not implemented yet).",
      ui: true,
      db: true,
    },
  ]
    .filter(filterOnlyUI)
    .sort(sortById),
};

export const collecMeta = {
  id: 3,
  icon: "/designer/collection.png",
  name: "collection",
  namePlural: "collections",
  title: "Collection",
  props: [
    {
      id: "id",
      description: "Unique key for the collection.",
      ui: true,
      db: true,
    },
    {
      id: "title",
      description: "Collection title.",
      ui: true,
      db: false,
    },
    {
      id: "table",
      description: "Table to query for the details list.",
      db: true,
    },
    {
      id: "column",
      description: "Column in the details table to match against object's id. ",
      db: true,
    },
    {
      id: "object",
      description:
        'Model id for the object to link to. When specified, "column" and "table" can be omitted.',
      ui: true,
      db: true,
    },
    // {
    //   id: "hideIfEmpty",
    //   description:
    //     "Hide Collection when it is empty in Edit view (always hidden when empty in Browse view).",
    //   ui: true,
    // },
    {
      id: "order",
      description: 'Direction to order by "asc" or "desc".',
      ui: true,
      db: true,
    },
    {
      id: "orderBy",
      description: 'SQL where clause, e.g. { orderBy="id" }.',
      db: true,
    },
    {
      id: "fields",
      description:
        "Array of fields (objects or ids). Fields in collections can be field objects or just ids of fields in the collection's object.",
      ui: true,
      db: true,
    },
    { id: "help", description: "Optional help tooltip text.", ui: true },
    {
      id: "header",
      description: "Text to be displayed at the top of the collection.",
      ui: true,
      db: false,
    },
    {
      id: "footer",
      description: "Text to be displayed below the collection.",
      ui: true,
      db: false,
    },
  ]
    .filter(filterOnlyUI)
    .sort(sortById),
};

export const fieldGroupMeta = {
  id: 4,
  icon: "designer/fieldgroup.png",
  name: "field group",
  namePlural: "field groups",
  title: "Field Group",
  props: [
    {
      id: "id",
      description: "Unique key for the group. It is optional.",
      ui: true,
      db: false,
    },
    {
      id: "type",
      description:
        'Type of group. Only "panel" is currently implemented ("tab" and "accordeon" will be added later).',
      ui: true,
    },
    {
      id: "label",
      description: "Group title as displayed to the user. ",
      ui: true,
      db: false,
    },
    {
      id: "fields",
      description: 'Array of <a href="#Field">field</a> ids.',
      ui: true,
      db: false,
    },
    {
      id: "width",
      description: "Width (in % of the container total width). ",
      ui: true,
      db: false,
    },
    { id: "help", description: "Optional help tooltip text.", ui: true },
    {
      id: "header",
      description:
        "Text to be displayed at the top of the group (just below the group title).",
      ui: true,
      db: false,
    },
    {
      id: "footer",
      description: "Text to be displayed below the group.",
      ui: true,
      db: false,
    },
  ]
    .filter(filterOnlyUI)
    .sort(sortById),
};

export const viewDoc = {
  one: [
    {
      id: "browse",
      name: "Browse",
      img: "one-browse.png",
      description:
        "Shows all fields for viewing (read only). Fields can be grouped into panels.",
      code: "/src/components/views/one/Browse.jsx",
      route: "/{entity}/browse/{id}",
    },
    {
      id: "edit",
      name: "Edit",
      img: "one-edit.png",
      description:
        "This view shows all fields for edition to create or update records. Fields can be grouped into panels. Form validation is performed automatically based on the field properties (type, min, max, maxLength...) specified in the model. ",
      code: "/src/components/views/one/Edit.jsx",
      route: "/{entity}/edit/{id}",
    },
  ],
  many: [
    {
      id: "list",
      name: "List",
      img: "many-list.png",
      description:
        'Gives a tabular view of a collection (with pagination). Only fields flagged as "inMany" are shown.',
      code: "/src/components/views/many/List.jsx",
      route: "/{entity}/list",
    },
    {
      id: "cards",
      name: "Cards",
      img: "many-cards.png",
      description: "Shows records side by side as cards (with pagination).",
      code: "/src/components/views/many/Cards.jsx",
      route: "/{entity}/cards",
    },
    {
      id: "charts",
      icon: "dashboard",
      name: "Dashboard",
      img: "many-charts.png",
      description:
        "Draws charts about the collection. Currently bars and pie charts are implemented, a list with count and percentages is also available. Only fields of type boolean, lov, integer, and decimal are presented.",
      code: "/src/components/views/charts/Charts.jsx",
      route: "/{entity}/charts",
    },
    {
      id: "stats",
      name: "Stats",
      img: "many-stats.png",
      description:
        'Display average, standard deviation, variance, min, max for numeric fields (similar to Kaggle.com); charts for "lov" and "boolean" fields.', //   If auditing, it will also show the last update, and the number of updates in the last week.
      code: "/src/components/views/many/Stats.jsx",
      route: "/{entity}/stats",
    },
  ],
  comfort: [
    {
      id: "overview",
      icon: "home-circle",
      img: "comfort-overview.png",
      name: "Overview",
      description:
        "Display a summary of the object and the latest activity on it.",
      code: "/src/components/views/comfort/Overview.jsx",
      route: "/{entity}/",
    },
    {
      id: "activity",
      icon: "history",
      img: "comfort-activity.png",
      name: "Activity",
      description:
        'Show list of "last visited" and "most visited" records for the object (stored in the browser\'s localStorage).',
      code: "/src/components/views/comfort/Activity.jsx",
      route: "/{entity}/activity",
    },
  ],
};

const metamodel = { objectMeta, fieldMeta, collecMeta, fieldGroupMeta };

export default metamodel;
