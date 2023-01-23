import config from "../config";
import { i18n_actions } from "../i18n/i18n";

const { withActivity } = config;
export const viewsOne = {
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
};

export const viewsMany = {
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
};

export const views = { ...viewsOne, ...viewsMany };

export const modelViewsMany = (model) => {
  const vs = {
    list: views.list,
    cards: views.cards,
  };
  if (!model.noCharts) {
    vs.charts = views.charts;
  }
  if (!model.noStats) {
    vs.stats = views.stats;
  }
  if (withActivity && !model.noActivity) {
    vs.activity = views.activity;
  }
  return vs;
};

export default views;
