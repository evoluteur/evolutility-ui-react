export interface ConfigOption {
  name: string;
  description: string;
  example: string;
}

const configOptions: ConfigOption[] = [
  {
    name: "apiPath",
    description: "Path to the REST API.",
    example: '"http://localhost:2000/api/v1/"',
  },
  {
    name: "useCache",
    description: "Enable/disable data caching.",
    example: "true",
  },
  {
    name: "cacheDuration",
    description: "Cache duration in seconds.",
    example: "120 (for 2 minutes)",
  },
  {
    name: "pageSize",
    description: "Page size in pagination.",
    example: "50",
  },
  {
    name: "filesUrl",
    description: "Path to upload files to (not implemented yet).",
    example: '"/pix/"',
  },
  {
    name: "withActivity",
    description:
      "Tracks and shows records activity (last visited and most visited). Currently implemented w/ the browser's localStorage, it will be moved to the server later.",
    example: "true",
  },
  {
    name: "withTimestamp",
    description:
      'Tracks and shows timestamp for creation date and last update for every record. The DB tables need timestamp columns "updated_at" and "created_at" for the feature to work.',
    example: "true",
  },
];

export default configOptions;
