import config from "../config";

const { useCache, cacheDuration } = config;

let cacheObj = {};

export const setCache = (key, value, seconds = cacheDuration) => {
  if (useCache) {
    cacheObj[key] = value;
    setTimeout(() => {
      delCache(key);
    }, seconds * 1000);
  }
};

export const getCache = (key) => cacheObj[key];

export const delCache = (key) => delete cacheObj[key];

export const clearCache = (prefix) => {
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

export const cacheKeys = () => Object.keys(cacheObj);

const cache = {
  setCache,
  getCache,
  delCache,
  clearCache,
  cacheKeys,
};

export default cache;
