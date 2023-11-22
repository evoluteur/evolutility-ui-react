import config from "config";
import { lcWrite, lcRead, lcRemove } from "./localStorage";

// TODO: do not show deleted records
// TODO: persist in DB?
const { withActivity, activityListSize } = config;

export const logActivity = (modelId, recordId, recordTitle, actionId) => {
  if (withActivity) {
    if (recordTitle && modelId && recordId) {
      const key = `${modelId}-activity`;
      const now = new Date();
      const date =
        now.toLocaleDateString() +
        " " +
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
    }
  }
  return null;
};

const mostViewed = (activity, max = 5) =>
  activity
    .filter((a) => a.visits > 1)
    .sort((a, b) => b.visits - a.visits)
    .slice(0, max);

export const getActivity = (modelId) => {
  const key = `${modelId}-activity`;
  let activity = lcRead(key);
  if (activity) {
    activity = JSON.parse(activity);
    return {
      lastViewed: activity,
      mostViewed: mostViewed(activity),
      firstActivityDate: activity[0]?.date || null,
      lastActivityDate: activity[activity.length - 1]?.date || null,
    };
  }
  return null;
};

export const clearActivity = (modelId) => {
  lcRemove(`${modelId}-activity`);
};
