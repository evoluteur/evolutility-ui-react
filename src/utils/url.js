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

export function parseQuery(qString) {
  if (qString) {
    const idx = qString.indexOf("?");
    return qString
      ? queryString.parse(idx ? qString.slice(idx) : qString)
      : null;
  }
  return null;
}

const urlModule = {
  querySearch,
  parseQuery,
};

export default urlModule;
