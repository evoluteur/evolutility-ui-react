import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";

import { queryUrl, getSearchText } from "../../utils/url";

import "./PageTitle.scss";

const iconH = {
  n: {
    list: { id: "list", icon: "list", label: "List" },
    cards: { id: "cards", icon: "cards", label: "Cards" },
    charts: { id: "charts", icon: "dashboard", label: "Dashboard" },
    stats: { id: "stats", icon: "stats", label: "Stats" },
    overview: { id: "overview", icon: "stats", label: "Overview" }, // TODO: Home icon
  },
  1: {
    edit: { id: "edit", icon: "edit", label: "Edit" },
    browse: { id: "browse", icon: "browse", label: "Browse" },
    // 'json': {id: 'json',  icon: 'json', label: 'JSON', option: true},
  },
  0: {
    edit: { id: "activity", icon: "history", label: "Activity" },
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

const iconViews = (mid, cardinality, id, view, model) => {
  if (cardinality === "0") {
    return null;
  }
  if (cardinality === "1" && (!id || id === "0")) {
    return null;
  }
  const urlFrag = (id ? "/" + id : "") + queryUrl();

  return (
    <div className="hIcons">
      {getIcons(cardinality, model)?.map((ico) => (
        <Link
          key={ico.id}
          to={"/" + mid + "/" + ico.id + urlFrag}
          className={view === ico.id ? "active" : ico.id}
        >
          <Icon name={ico.icon} tooltip={ico.label} theme="light" />
        </Link>
      ))}
    </div>
  );
};

const PageTitle = ({
  id,
  view,
  model,
  title,
  count,
  comments,
  entity,
  cardinality,
  text,
}) => {
  // TODO: make charts work w/ search & filters (and switch comment below)

  const search = view !== "charts" ? getSearchText() : null;

  if (comments) {
    comments += comments === 1 ? " comment" : " comments";
  }

  return (
    <div className="evo-page-header">
      <h1 className="page-title">
        <span id="itemTitle">{title}</span>
        {count > 0 && <span className="evo-badge">{count}</span>}
        {comments > 0 && <span className="evo-badge">{comments}</span>}
        {search && <span className="evo-badge">Search "{search}"</span>}
        {text && <span className="h-txt">{text}</span>}
      </h1>
      <div>{iconViews(entity, cardinality, id, view, model)}</div>
    </div>
  );
};

export default PageTitle;

PageTitle.propTypes = {
  /** Page title */
  title: PropTypes.string, //.isRequired,
  model: PropTypes.object.isRequired,
  /** Active view */
  view: PropTypes.string,
  /** Number of records (for views "many") */
  count: PropTypes.number,
  /** Number of comments (for views "one") */
  comments: PropTypes.number,
  /** Extra text beside the title */
  text: PropTypes.string,
};

PageTitle.defaultProps = {
  view: null,
  count: null,
  comments: null,
  text: null,
};
