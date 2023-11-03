/* Evolutility config options */

const config = {
  // - Path to GraphQL API
  apiPath: "https://bds.hasura.app/v1/graphql",
  adminSecret: "ENTER-SECRET-HERE",

  // - Path to uploaded files
  filesUrl: "/pix/",

  // - get models from server at startup (and add/replace json models)
  queryModels: false,

  // - Pagination
  pageSize: 50,

  // - Language
  locale: "en",

  // - Data Caching
  useCache: true,
  cacheDuration: 180, // time in seconds

  // - Timestamp columns u_date and c_date w/ date of record creation and last update
  withTimestamp: true,
  // - "WhoIs" columns u_uid and c_uid w/ userid of creator and last modifier
  withWhoIs: false,
  // - Track last viewed record names in localstorage
  withActivity: false,
  // max number of activity records tracked
  activityListSize: 50,

  // - Comments & Ratings (community feature)
  withComments: false, // not implemented yet
  withRating: false, // not implemented yet
};

export default config;
