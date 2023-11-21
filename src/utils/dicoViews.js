import config from "../config";
import { i18n_actions as i18n } from "../i18n/i18n";

const { withActivity } = config;
const view = (name) => ({
  id: name,
  label: i18n[name],
  icon: name,
});

export const views = {
  browse: view("browse"),
  edit: view("edit"),
  list: view("list"),
  cards: view("cards"),
  charts: {
    id: "charts",
    label: i18n.charts,
    icon: "dashboard",
  },
  // scatter: {id:'scatter', label: i18n.bScatter, icon:'certificate'},
  stats: view("stats"),
  activity: {
    id: "activity",
    label: i18n.activity,
    icon: "history",
  },
  overview: {
    id: "overview",
    label: i18n.overview,
    icon: "home-circle",
  },
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
