/* Evolutility config options */

const config = {
  // - Path to GraphQL API
  apiPath: "https://bds.hasura.app/v1/graphql",
  adminSecret: "ENTER-SECRET-HERE",

  // - prefix run app in sub-directory (also define as "homepage" in package.json)
  // baseName: "/evodemo/",

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

  // - Timestamp columns updated_at and created_at w/ date of record creation and last update
  withTimestamp: true,
  // - "WhoIs" columns updated_by and created_by w/ userid of creator and last modifier
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
