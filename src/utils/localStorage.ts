// Wrapper for localStorage
const prefix = "evol-";

export const lcWrite = (key: string, value: string): void =>
  localStorage.setItem(prefix + key, value);

export const lcRead = (key: string): string | null =>
  localStorage.getItem(prefix + key) || null;

export const lcRemove = (key: string): void =>
  localStorage.removeItem(prefix + key);
