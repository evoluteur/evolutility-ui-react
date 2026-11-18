/* Evolutility config options */

interface Config {
  // - Path to the REST API
  apiPath: string;

  // - prefix run app in sub-directory (also define as "homepage" in package.json)
  baseName?: string;

  // - Path to uploaded files
  filesUrl: string;

  // - View shown at the object root url (ex: "/demos/todo/")
  entityRoot: "list" | "overview";

  // - Pagination
  pageSize: number;

  // - Language
  locale: string;

  // - Data Caching
  useCache: boolean;
  cacheDuration: number; // time in seconds

  // - Timestamp columns updated_at and created_at w/ date of record creation and last update
  withTimestamp: boolean;
  // - "WhoIs" columns updated_by and created_by w/ userid of creator and last modifier
  withWhoIs: boolean;
  // - Track last viewed record names in localstorage
  withActivity: boolean;
  // max number of activity records tracked
  activityListSize: number;

  // - Comments & Ratings (community feature)
  withComments: boolean; // not implemented yet
  withRating: boolean; // not implemented yet
}

const config: Config = {
  // - Path to the REST API (evolutility-server-node)
  apiPath: "http://localhost:2000/api/v1/",

  // - prefix run app in sub-directory (also define as "homepage" in package.json)
  // baseName: "/evodemo/",

  // - Path to uploaded files
  filesUrl: "/pix/",

  // - View shown at the object root url (ex: "/demos/todo/"): "list" or "overview"
  entityRoot: "list",

  // - Pagination
  pageSize: 50,

  // - Language
  locale: "en",

  // - Data Caching
  useCache: true,
  cacheDuration: 180, // time in seconds

  // - Timestamp columns updated_at and created_at w/ date of record creation and last update
  withTimestamp: true,
  // - "WhoIs": show who created and last updated records (the server fills
  //   the columns created_by and updated_by w/ the logged-in user)
  withWhoIs: true,
  // - Track last viewed record names in localstorage
  withActivity: false,
  // max number of activity records tracked
  activityListSize: 50,

  // - Comments & Ratings (community feature)
  withComments: false, // not implemented yet
  withRating: false, // not implemented yet
};

export default config;
