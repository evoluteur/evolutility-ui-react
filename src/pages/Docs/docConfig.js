const configOptions = [
  {
    name: "apiPath",
    description:
      "Path to GraphQL API (can use &quot;proxy&quot; from package.json).",
    example: "https://localhost:2000/v1/graphql",
  },
  {
    name: "pageSize",
    description: "Page size in pagination.",
    example: "50",
  },
  {
    name: "filesUrl",
    description: "Path to upload files to (not implemented yet).",
    example: "http://localhost:3000/pix/",
  },
  {
    name: "withActivity",
    description:
      "Tracks and shows records activity (last visited and most visited).",
    example: "true",
  },
  {
    name: "withTimestamp",
    description:
      'Tracks and shows timestamp for creation date and last update for every record. The DB tables need timestamp columns "u_date" and "c_date" for the feature to work.',
    example: "true",
  },
];

export default configOptions;
