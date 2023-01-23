/*
  Evolutility UI model for Restaurants
  https://github.com/evoluteur/evolutility-ui-react
*/

const model = {
  id: "restaurant",
  qid: "restaurant",
  oid: 4,
  title: "Restaurants",
  world: "demos",
  name: "restaurant",
  namePlural: "restaurants",
  icon: "resto.gif",
  active: true,
  position: 30,
  titleField: "name",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      inMany: true,
      inSearch: true,
      width: 62,
    },
    {
      id: "cuisine",
      type: "lov",
      label: "Cuisine",
      list: [
        {
          id: "1",
          text: "French",
        },
        {
          id: "2",
          text: "Vietnamese",
        },
        {
          id: "3",
          text: "Chinese",
        },
        {
          id: "4",
          text: "Fusion",
        },
        {
          id: "5",
          text: "Japanese",
        },
        {
          id: "6",
          text: "Thai",
        },
        {
          id: "7",
          text: "Mexican",
        },
        {
          id: "8",
          text: "Mediterranean",
        },
        {
          id: "9",
          text: "American",
        },
        {
          id: "10",
          text: "Indian",
        },
        {
          id: "11",
          text: "Korean",
        },
        {
          id: "12",
          text: "Italian",
        },
        {
          id: "13",
          text: "Spanish",
        },
        {
          id: "14",
          text: "Others",
        },
      ],
      inMany: true,
      width: 38,
    },
    {
      id: "price",
      type: "lov",
      label: "Price",
      list: [
        {
          id: "1",
          text: "$",
        },
        {
          id: "2",
          text: "$$",
        },
        {
          id: "3",
          text: "$$$",
        },
        {
          id: "4",
          text: "$$$$",
        },
        {
          id: "5",
          text: "$$$$$",
        },
      ],
      inMany: true,
      width: 38,
    },
    {
      id: "web",
      type: "url",
      label: "web",
      width: 100,
    },
    {
      id: "yelp",
      type: "url",
      label: "Yelp",
      width: 62,
    },
    {
      id: "favorite",
      type: "textmultiline",
      label: "Favorite dish",
      maxLength: 2000,
      width: 62,
      height: 2,
    },
    {
      id: "hours",
      type: "textmultiline",
      label: "Hours",
      width: 38,
      height: 2,
    },
    {
      id: "notes",
      type: "textmultiline",
      label: "Notes",
      maxLength: 2000,
      width: 100,
      height: 3,
    },
    {
      id: "phone",
      type: "text",
      label: "Phone",
      maxLength: 20,
      width: 100,
    },
    {
      id: "address",
      type: "textmultiline",
      label: "Address",
      maxLength: 150,
      width: 100,
      height: 2,
    },
    {
      id: "city",
      type: "text",
      label: "City",
      maxLength: 100,
      inMany: true,
      inSearch: true,
      width: 50,
    },
    {
      id: "state",
      type: "text",
      label: "State",
      width: 15,
    },
    {
      id: "zip",
      type: "text",
      label: "Zip",
      maxLength: 12,
      width: 20,
    },
  ],
  groups: [
    {
      id: "pResto",
      type: "panel",
      label: "Restaurant",
      width: 62,
      fields: [
        "name",
        "cuisine",
        "schedule",
        "yelp",
        "price",
        "favorite",
        "hours",
        "notes",
      ],
    },
    {
      id: "pContact",
      type: "panel",
      label: "Contact",
      width: 38,
      fields: ["phone", "web", "address", "city", "state", "zip"],
    },
  ],
  collections: [],
  noStats: true,
};

export default model;
