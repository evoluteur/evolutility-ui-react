import queryString from "query-string";

export function querySearch(query) {
  // - make uri params string from query object
  // - example: {a:1, b: 'bbb'} => "a=1&b=bbb"
  const urlParams = [];
  for (const prop in query) {
    if (query[prop] !== "") {
      urlParams.push(prop + "=" + encodeURI(query[prop]));
    }
  }
  return urlParams.join("&");
}

export const parseQuery = (qString) => {
  return qString ? queryString.parse(qString) : null;
};

// export const hasFilters = (qString) => {
//   if (!qString) {
//     return false;
//   }
//   let res = false;
//   qString
//     .slice(1)
//     .split("&")
//     .forEach((p) => {
//       if (
//         !(
//           p.startsWith("order=") ||
//           p.startsWith("page=") ||
//           p.startsWith("pageSize=")
//         )
//       ) {
//         res = true;
//         return;
//       }
//     });
//   return res;
// };

const urlModule = {
  querySearch,
  parseQuery,
  // hasFilters,
};

export default urlModule;
