// Wrapper for localStorage
const prefix = "evol-";

export const lcWrite = (key, value) => {
  localStorage.setItem(prefix + key, value);
};

export const lcRead = (key) => localStorage.getItem(prefix + key) || null;

export const lcRemove = (key) => localStorage.removeItem(prefix + key);
