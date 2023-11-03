import config from "../config";
import { i18n_actions } from "../i18n/i18n";

const { withActivity } = config;
export const views = {
  browse: {
    id: "browse",
    label: i18n_actions.browse,
    icon: "browse",
    n: "1",
  },
  edit: {
    id: "edit",
    label: i18n_actions.edit,
    icon: "edit",
    n: "1",
  },
  list: { id: "list", label: i18n_actions.list, icon: "list", n: "n" },
  cards: { id: "cards", label: i18n_actions.cards, icon: "cards", n: "n" },
  charts: {
    id: "charts",
    label: i18n_actions.charts,
    icon: "dashboard",
    n: "n",
  },
  // scatter: {id:'scatter', label: i18n_actions.bScatter, icon:'certificate',n:'n'},
  stats: { id: "stats", label: i18n_actions.stats, icon: "stats", n: "n" },
  activity: {
    id: "activity",
    label: i18n_actions.activity,
    icon: "history",
    n: "n",
  },
  // overview: { id: "overview", label: "Overview", icon: "home-circle", n: "n" },
};

export const modelViewsAnalytics = (model) => {
  const vs = [];
  if (!model.noCharts) {
    vs.push(views.charts);
  }
  if (!model.noStats) {
    vs.push(views.stats);
  }
  return vs;
};

export const modelViewsMany = (model, all) => {
  const vs = [views.list, views.cards];
  if (all) {
    const va = modelViewsAnalytics(model);
    if (va.length) {
      vs.push(...va);
    }
    if (withActivity && !model.noActivity) {
      vs.push(views.activity);
    }
  }
  return vs;
};

export default views;
