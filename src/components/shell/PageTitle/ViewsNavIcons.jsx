import React from "react";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";
import { queryUrl } from "../../../utils/url";

const iconH = {
  n: {
    list: { id: "list", icon: "list", label: "List" },
    cards: { id: "cards", icon: "cards", label: "Cards" },
    charts: { id: "charts", icon: "dashboard", label: "Dashboard" },
    stats: { id: "stats", icon: "stats", label: "Stats" },
    overview: { id: "overview", icon: "stats", label: "Overview" },
  },
  1: {
    edit: { id: "edit", icon: "edit", label: "Edit" },
    browse: { id: "browse", icon: "browse", label: "Browse" },
    // 'json': {id: 'json',  icon: 'json', label: 'JSON', option: true},
  },
  0: {
    activity: { id: "activity", icon: "history", label: "Activity" },
  },
};

const getIcons = (cardinality, model) => {
  const iconsMap = iconH[cardinality];
  if (cardinality === "1") {
    return [iconsMap.edit, iconsMap.browse];
  }
  const cardiIcons = [iconsMap.list, iconsMap.cards];
  if (model) {
    if (!model.noCharts) {
      cardiIcons.push(iconsMap.charts);
    }
    if (!model.noStats) {
      cardiIcons.push(iconsMap.stats);
    }
  }
  return cardiIcons;
};

const ViewsNavIcons = (mid, cardinality, id, view, model) => {
  if (cardinality === "0") {
    return null;
  }
  if (cardinality === "1" && (!id || id === "0")) {
    return null;
  }
  const urlFrag = (id ? "/" + id : "") + queryUrl();
  const iconLink = (ico) => (
    <Link
      key={ico.id}
      to={`/${mid}/${ico.id}${urlFrag}`}
      className={view === ico.id ? "active" : ico.id}
    >
      <Icon name={ico.icon} tooltip={ico.label} theme="light" />
    </Link>
  );

  return (
    <div className="hIcons">{getIcons(cardinality, model)?.map(iconLink)}</div>
  );
};

export default ViewsNavIcons;
