// Wrapper for localStorage
import { wActivity, activityListSize } from "../config";

const prefix = "evol-";

export const lcWrite = (key, value) => {
  localStorage.setItem(prefix + key, value);
};

export const lcRead = (key) => localStorage.getItem(prefix + key) || null;

export const lcRemove = (key) => localStorage.removeItem(prefix + key);

export const logActivity = (modelId, recordId, recordTitle, actionId) => {
  if (wActivity) {
    if (recordTitle && modelId && recordId) {
      const key = `${modelId}-activity`;
      const now = new Date();
      const date = now.toLocaleDateString() + " " + now.toLocaleTimeString();
      const v = {
        id: recordId,
        title: recordTitle,
        action: actionId,
        date,
        visits: 1,
      };
      let activity = lcRead(key);
      if (activity) {
        activity = JSON.parse(activity);
        const prevActivity = activity.find((a) => a.id === recordId);
        const visits = prevActivity?.visits;
        if (visits) {
          v.visits += visits;
        }
        activity = activity.filter((a) => a.id !== recordId);
        activity.unshift(v);
        activity = activity.slice(0, activityListSize || 50);
      } else {
        activity = [v];
      }
      lcWrite(key, JSON.stringify(activity));
    } else {
      debugger;
    }
  }
  return null;
};

export const getActivity = (modelId) => {
  const key = `${modelId}-activity`;
  let activity = lcRead(key);
  if (activity) {
    return JSON.parse(activity);
  }
  return [];
};
