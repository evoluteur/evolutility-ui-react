/*
  Evolutility UI model for Worlds
  https://github.com/evoluteur/evolutility-ui-react
*/

const modelWorld = {
  id: "world",
  qid: "evol_evol_world",
  title: "Worlds",
  world: "designer",
  name: "world",
  namePlural: "worlds",
  icon: "/designer/world.png",
  position: 50,
  defaultViewMany: "list",
  defaultViewOne: "browse",
  titleField: "name",
  noStats: true,
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      maxLength: 100,
      inMany: true,
      width: 85,
    },
    {
      id: "active",
      type: "boolean",
      label: "Active",
      inMany: true,
      width: 15,
    },
    {
      id: "description",
      type: "textmultiline",
      label: "Description",
      maxLength: 500,
      width: 85,
      height: 2,
    },
    {
      id: "position",
      type: "integer",
      label: "Position",
      maxLength: 3,
      width: 15,
      help: "Order of the field",
    },
  ],
  collections: [
    {
      id: "objects",
      title: "Objects",
      object: "object",
      fields: ["title", "icon", "active"],
    },
  ],
};

export default modelWorld;
