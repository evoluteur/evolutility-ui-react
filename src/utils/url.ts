import queryString from "query-string";

export function querySearch(
  query: Record<string, string | number | undefined> | null | undefined,
): string {
  // - make uri params string from query object
  // - example: {a:1, b: 'bbb'} => "a=1&b=bbb"
  const urlParams: string[] = [];
  for (const prop in query) {
    const v = query[prop];
    if (v !== "" && v !== undefined) {
      urlParams.push(prop + "=" + encodeURI(String(v)));
    }
  }
  return urlParams.join("&");
}

export const parseQuery = (
  qString: string | null | undefined,
): queryString.ParsedQuery | null => {
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
