import config from "config";

const { useCache, cacheDuration } = config;

let cacheObj: Record<string, any> = {};

export const setCache = (
  key: string,
  value: any,
  seconds: number = cacheDuration,
): void => {
  if (useCache) {
    cacheObj[key] = value;
    setTimeout(() => {
      delCache(key);
    }, seconds * 1000);
  }
};

export const getCache = (key: string): any => cacheObj[key];

export const delCache = (key: string): boolean => delete cacheObj[key];

export const clearCache = (prefix?: string): void => {
  if (prefix) {
    cacheKeys().forEach((k) => {
      if (k.startsWith(prefix)) {
        delCache(k);
      }
    });
  } else {
    cacheObj = {};
  }
};

export const cacheKeys = (): string[] => Object.keys(cacheObj);

const cache = {
  setCache,
  getCache,
  delCache,
  clearCache,
  cacheKeys,
};

export default cache;
