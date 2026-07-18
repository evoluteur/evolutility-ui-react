import config from "config";
import { lcWrite, lcRead, lcRemove } from "./localStorage";

// TODO: do not show deleted records
// TODO: persist in DB?
const { withActivity, activityListSize } = config;

export interface ActivityRecord {
  id: number | string;
  title: string;
  action: string;
  date: string;
  visits: number;
}

export interface ActivitySummary {
  lastViewed: ActivityRecord[];
  mostViewed: ActivityRecord[];
  firstActivityDate: string | null;
  lastActivityDate: string | null;
}

export const logActivity = (
  modelId: string,
  recordId: number | string,
  recordTitle: string,
  actionId: string,
): null => {
  if (withActivity) {
    if (recordTitle && modelId && recordId) {
      const key = `${modelId}-activity`;
      const now = new Date();
      const date =
        now.toLocaleDateString() +
        " " +
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const v: ActivityRecord = {
        id: recordId,
        title: recordTitle,
        action: actionId,
        date,
        visits: 1,
      };
      const stored = lcRead(key);
      let activity: ActivityRecord[];
      if (stored) {
        activity = JSON.parse(stored) as ActivityRecord[];
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

const mostViewed = (activity: ActivityRecord[], max = 5): ActivityRecord[] =>
  activity
    .filter((a) => a.visits > 1)
    .sort((a, b) => b.visits - a.visits)
    .slice(0, max);

export const getActivity = (modelId: string): ActivitySummary | null => {
  const key = `${modelId}-activity`;
  const stored = lcRead(key);
  if (stored) {
    const activity = JSON.parse(stored) as ActivityRecord[];
    return {
      lastViewed: activity,
      mostViewed: mostViewed(activity),
      firstActivityDate: activity[0]?.date || null,
      lastActivityDate: activity[activity.length - 1]?.date || null,
    };
  }
  return null;
};

export const clearActivity = (modelId: string): void => {
  lcRemove(`${modelId}-activity`);
};
