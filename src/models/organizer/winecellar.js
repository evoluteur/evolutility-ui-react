/*
  Evolutility UI model for Wine cellar
  https://github.com/evoluteur/evolutility-ui-react
*/

const model = {
  id: "winecellar",
  qid: "wine",
  title: "Wine cellar",
  world: "demos",
  name: "wine",
  namePlural: "wines",
  icon: "wine-bottle.png",
  defaultViewMany: "cards",
  titleField: "name",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      maxLength: 150,
      inMany: true,
      inSearch: true,
      width: 62,
      help: "Name of the wine as indicated on the label.",
    },
    {
      id: "vintage",
      type: "integer",
      label: "Vintage",
      required: true,
      max: 2023,
      min: 1900,
      maxLength: 4,
      inMany: true,
      width: 38,
      format: "0000",
      help: "Year the wine was produced.",
    },
    {
      id: "winery",
      type: "text",
      label: "Winery",
      required: true,
      maxLength: 100,
      inMany: true,
      inSearch: true,
      width: 62,
      help: "The establishment where this wine is made.",
    },
    {
      id: "bsize",
      type: "lov",
      label: "Bottle Size",
      labelShort: "Bottle",
      width: 38,
    },
    {
      id: "grape",
      type: "lov",
      label: "Grape",
      inMany: false,
      width: 62,
    },
    {
      id: "type",
      type: "lov",
      label: "Type",
      lovIcon: true,
      inMany: true,
      width: 38,
    },
    {
      id: "appellation",
      type: "text",
      label: "Appellation",
      width: 100,
      help: "An appellation is a legally defined and protected geographical indication used to identify where the grapes for a wine were grown.",
    },
    {
      id: "country",
      type: "lov",
      label: "Country",
      lovIcon: true,
      width: 32,
    },
    {
      id: "region",
      type: "text",
      label: "Region",
      maxLength: 100,
      width: 30,
    },
    {
      id: "area",
      type: "text",
      label: "Area",
      maxLength: 100,
      width: 38,
    },
    {
      id: "label_img",
      type: "image",
      label: "Label",
      maxLength: 200,
      inMany: true,
      width: 100,
    },
    {
      id: "buying_date",
      type: "date",
      label: "Buying Date",
      width: 40,
    },
    {
      id: "price",
      type: "money",
      label: "Price",
      inMany: true,
      width: 30,
    },
    {
      id: "value",
      type: "money",
      label: "Value",
      width: 30,
    },
    {
      id: "purchased",
      type: "integer",
      min: 0,
      label: "Bottles Purchased",
      maxLength: 10,
      labelShort: "Purchased",
      width: 40,
    },
    {
      id: "remaining",
      type: "integer",
      label: "Remaining",
      min: 0,
      maxLength: 10,
      width: 60,
    },
    {
      id: "notes",
      type: "textmultiline",
      label: "Notes",
      maxLength: 150,
      width: 100,
      height: 2,
    },
    {
      id: "drink_from",
      type: "integer",
      label: "Drink from (year)",
      format: "0000",
      max: 2100,
      min: 1900,
      maxLength: 10,
      labelShort: "Drink",
      width: 50,
    },
    {
      id: "drink_to",
      type: "integer",
      label: "to",
      format: "0000",
      max: 2100,
      min: 1900,
      maxLength: 4,
      width: 50,
    },
    {
      id: "peak_from",
      type: "integer",
      label: "Peak from",
      format: "0000",
      max: 2100,
      min: 1900,
      maxLength: 4,
      width: 50,
    },
    {
      id: "peak_to",
      type: "integer",
      label: "to",
      format: "0000",
      max: 2100,
      min: 1900,
      maxLength: 4,
      width: 50,
    },
    {
      id: "meal",
      type: "textmultiline",
      label: "Meal",
      maxLength: 200,
      width: 100,
      height: 2,
    },
    {
      id: "score",
      type: "lov",
      label: "Score",
      list: [
        {
          id: 1,
          text: "*",
        },
        {
          id: 2,
          text: "**",
        },
        {
          id: 3,
          text: "***",
        },
        {
          id: 4,
          text: "****",
        },
        {
          id: 5,
          text: "*****",
        },
      ],
      width: 100,
    },
    {
      id: "score_parker",
      type: "integer",
      label: "Parker",
      max: 100,
      min: 50,
      maxLength: 3,
      width: 100,
    },
    {
      id: "score_winespectator",
      type: "integer",
      label: "Wine Spectator",
      max: 100,
      min: 0,
      maxLength: 3,
      width: 100,
    },
    {
      id: "comments",
      type: "textmultiline",
      label: "Comments",
      maxLength: 500,
      width: 100,
      height: 8,
    },
  ],
  groups: [
    {
      type: "panel",
      label: "Wine",
      width: 80,
      fields: [
        "name",
        "vintage",
        "winery",
        "bsize",
        "grape",
        "type",
        "appellation",
        "country",
        "region",
        "area",
      ],
    },
    {
      type: "panel",
      label: "Bottle Label",
      width: 20,
      fields: ["label_img"],
    },
    {
      type: "panel",
      label: "Purchase",
      width: 100,
      fields: [
        "buying_date",
        "price",
        "value",
        "purchased",
        "remaining",
        "notes",
      ],
    },
    {
      type: "panel",
      label: "Drinking",
      width: 62,
      fields: ["drink_from", "drink_to", "peak_from", "peak_to", "meal"],
    },
    {
      type: "panel",
      label: "Score",
      width: 38,
      fields: ["score", "score_parker", "score_winespectator"],
    },
    {
      type: "panel",
      label: "Comments",
      width: 100,
      fields: ["comments"],
    },
  ],
  collections: [
    {
      id: "wine_tastings",
      title: "Degustations",
      object: "winetasting",
      fields: ["drink_date", "robe", "nose", "taste", "notes"],
    },
  ],
};

export default model;
