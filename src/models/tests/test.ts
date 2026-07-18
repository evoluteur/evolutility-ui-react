/*
  Evolutility UI model for Test List
  https://github.com/evoluteur/evolutility-ui-react
*/
const lov = [
  {
    id: 1,
    text: "Vanilla",
  },
  {
    id: 2,
    text: "Chocolate",
  },
  {
    id: 3,
    text: "Strawberry",
  },
  {
    id: 4,
    text: "Green Tea",
  },
  {
    id: 5,
    text: "Lemon Cookie",
  },
];
const fields = [
  {
    id: "name",
    type: "text",
    label: "Title",
    required: true,
    inMany: true,
    width: 100,
    help: "Name of the object",
  },
  {
    id: "text",
    type: "text",
    label: "Text",
    inMany: true,
    width: 50,
  },
  {
    id: "textmultiline",
    type: "textmultiline",
    label: "Text multiline",
    width: 50,
    height: 3,
  },
  {
    id: "json",
    type: "json",
    label: "JSON",
    width: 100,
    height: 4,
  },
  {
    id: "lov",
    type: "lov",
    label: "List of Values",
    required: true,
    list: lov,
    inMany: true,
    width: 100,
  },
  {
    id: "parent",
    type: "lov",
    label: "Parent",
    object: "test",
    required: true,
    inMany: true,
    width: 100,
    help: "LOV ",
    chartType: "Pie",
  },
  {
    id: "lovlc",
    type: "lov",
    label: "Lemon Cookie",
    list: lov,
    defaultValue: 5,
    width: 100,
    help: 'List of Values with "Lemon Cookie" as default value.',
    chartType: "Table",
  },
  {
    id: "list",
    type: "list",
    label: "Multiselect",
    //"required": true,
    list: lov,
    inMany: true,
    width: 100,
  },
  {
    id: "date",
    type: "date",
    label: "Date",
    required: true,
    inMany: true,
    width: 100,
  },
  {
    id: "datetime",
    type: "datetime",
    label: "Date-Time",
    inMany: true,
    width: 100,
    help: "Date and time as a single field (not implemented yet).",
  },
  {
    id: "time",
    type: "time",
    label: "Time",
    inMany: true,
    width: 100,
    help: "Time field (not implemented yet).",
  },
  {
    id: "integer",
    type: "integer",
    label: "Integer",
    required: true,
    inMany: true,
    width: 100,
  },
  {
    id: "decimal",
    type: "decimal",
    label: "Decimal",
    width: 100,
  },
  {
    id: "money",
    type: "money",
    label: "Money",
    width: 100,
  },
  {
    id: "boolean",
    type: "boolean",
    label: "Boolean",
    inMany: true,
    width: 100,
  },
  {
    id: "email",
    type: "email",
    label: "email",
    inMany: true,
    width: 50,
  },
  {
    id: "url",
    type: "url",
    label: "url",
    width: 50,
  },
  {
    id: "document",
    type: "document",
    label: "Document",
    width: 100,
  },
  {
    id: "image",
    type: "image",
    label: "Image",
    inMany: true,
    width: 100,
  },
];

const modelTest = {
  id: "test",
  title: "Test List",
  name: "test",
  namePlural: "tests",
  icon: "car.png",
  titleField: "name",
  fields: fields,
  groups: [
    {
      id: "ptxt",
      type: "panel",
      label: "Text",
      width: 62,
      fields: ["name", "text", "textmultiline", "email", "url", "json"],
    },
    {
      id: "plist",
      type: "panel",
      label: "List of Values",
      width: 38,
      fields: ["parent", "lov", "lovlc", "list"],
    },
    {
      id: "pnum",
      type: "panel",
      label: "Numbers",
      width: 31,
      fields: ["integer", "decimal", "money", "boolean"],
    },
    {
      id: "pdate",
      type: "panel",
      label: "Date & Time",
      width: 31,
      fields: ["date", "datetime", "time"],
      header: "Not fully implemented yet.",
    },
    {
      id: "ppix",
      type: "panel",
      label: "Image & Document",
      width: 38,
      footer:
        "Uploaded images and documents are saved as files (use 'filesUrl' to specify the path).",
      fields: ["image", "document"],
    },
  ],
  collections: [
    {
      id: "children",
      title: "Children",
      object: "test",
      fields: fields.slice(0, 3),
    },
  ],
};

export default modelTest;
