/*
  Evolutility-UI-React :: dao/api.ts

  Low level access to the REST API (see "src/dao/openapi.json").

  https://github.com/evoluteur/evolutility-ui-react
  (c) 2026 Olivier Giulieri
*/

import config from "config";

// - API path always ends with a "/" ("http://localhost:2000/api/v1/")
export const apiPath = config.apiPath.endsWith("/")
  ? config.apiPath
  : config.apiPath + "/";

export interface InvalidField {
  id: string;
  value: unknown;
  condition: string;
}

// - Error thrown by all DAO functions (HTTP errors and network errors)
export class ApiError extends Error {
  status: number;
  invalids?: InvalidField[];

  constructor(message: string, status = 0, invalids?: InvalidField[]) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.invalids = invalids;
  }
}

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

// - build the url for an end-point w/ its query parameters
export const apiUrl = (path: string, params?: QueryParams): string => {
  const url = apiPath + path;
  if (!params) {
    return url;
  }
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      search.append(key, String(value));
    }
  });
  const queryString = search.toString();
  return queryString ? `${url}?${queryString}` : url;
};

export interface RequestOptions {
  params?: QueryParams;
  body?: unknown;
  signal?: AbortSignal;
}

const jsonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const errorMessage = async (response: Response): Promise<string> => {
  try {
    const body = await response.json();
    if (body?.error) {
      return body.invalids?.length
        ? `${body.error}: ${body.invalids
            .map((i: InvalidField) => `${i.id} (${i.condition})`)
            .join(", ")}.`
        : String(body.error);
    }
  } catch {
    // - response body is not JSON
  }
  return `${response.status} ${response.statusText}.`;
};

async function request<T>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, body, signal } = options;
  let response: Response;
  try {
    response = await fetch(apiUrl(path, params), {
      method,
      headers: jsonHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if ((err as Error)?.name === "AbortError") {
      throw err;
    }
    throw new ApiError((err as Error).message + ".");
  }
  if (!response.ok) {
    throw new ApiError(await errorMessage(response), response.status);
  }
  if (response.status === 204) {
    return null as T;
  }
  return (await response.json()) as T;
}

export const apiGet = <T>(path: string, options?: RequestOptions) =>
  request<T>("GET", path, options);

export const apiPost = <T>(path: string, options?: RequestOptions) =>
  request<T>("POST", path, options);

export const apiPatch = <T>(path: string, options?: RequestOptions) =>
  request<T>("PATCH", path, options);

export const apiPut = <T>(path: string, options?: RequestOptions) =>
  request<T>("PUT", path, options);

export const apiDelete = <T>(path: string, options?: RequestOptions) =>
  request<T>("DELETE", path, options);

const api = {
  apiPath,
  apiUrl,
  apiGet,
  apiPost,
  apiPatch,
  apiPut,
  apiDelete,
  ApiError,
};

export default api;
