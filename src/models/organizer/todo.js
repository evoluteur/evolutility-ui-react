/*
  Evolutility UI model for To-Do List
  https://github.com/evoluteur/evolutility-ui-react
*/

const model = {
  id: "todo",
  qid: "task",
  oid: 1,
  title: "To-Do List",
  world: "demos",
  name: "task",
  namePlural: "tasks",
  icon: "todo.gif",
  active: true,
  position: 1,
  titleField: "title",
  fields: [
    {
      id: "title",
      type: "text",
      label: "Title",
      required: true,
      maxLength: 255,
      inMany: true,
      inSearch: true,
      width: 100,
    },
    {
      id: "duedate",
      type: "date",
      label: "Due Date",
      inMany: true,
      width: 38,
    },
    {
      id: "category",
      type: "lov",
      label: "Category",
      list: [
        {
          id: 1,
          text: "Home",
        },
        {
          id: 2,
          text: "Work",
        },
        {
          id: 3,
          text: "Fun",
        },
        {
          id: 4,
          text: "Others",
        },
        {
          id: 5,
          text: "Misc.",
        },
      ],
      inMany: true,
      width: 62,
    },
    {
      id: "priority",
      type: "lov",
      label: "Priority",
      required: true,
      list: [
        {
          id: 1,
          text: "1 - ASAP",
        },
        {
          id: 2,
          text: "2 - Urgent",
        },
        {
          id: 3,
          text: "3 - Important",
        },
        {
          id: 4,
          text: "4 - Medium",
        },
        {
          id: 5,
          text: "5 - Low",
        },
      ],
      defaultValue: 4,
      inMany: true,
      width: 100,
    },
    {
      id: "complete",
      type: "boolean",
      label: "Complete",
      inMany: true,
      width: 100,
    },
    {
      id: "description",
      type: "textmultiline",
      label: "Description",
      maxLength: 1000,
      inMany: false,
      inSearch: true,
      height: 3,
    },
  ],
  groups: [
    {
      id: "p1",
      type: "panel",
      label: "Task",
      width: 62,
      fields: ["title", "duedate", "category"],
    },
    {
      id: "p2",
      type: "panel",
      label: "Status",
      width: 38,
      fields: ["priority", "complete"],
    },
    {
      id: "p3",
      type: "panel",
      label: "Task Description",
      width: 100,
      fields: ["description"],
    },
  ],
};

export default model;
