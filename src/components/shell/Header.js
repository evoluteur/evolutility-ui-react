import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";

import { queryUrl, getSearchText } from "../../utils/url";

import { isREST } from "../../utils/dao";

import "./Header.scss";
import "@szhsin/react-menu/dist/index.css";

const iconH = {
  n: {
    list: { id: "list", icon: "list", label: "List" },
    cards: { id: "cards", icon: "cards", label: "Cards" },
    // charts: { id: "charts", icon: "dashboard", label: "Dashboard" },
    stats: { id: "stats", icon: "stats", label: "Stats" },
  },
  1: {
    edit: { id: "edit", icon: "edit", label: "Edit" },
    browse: { id: "browse", icon: "browse", label: "Browse" },
    // 'json': {id: 'json',  icon: 'json', label: 'JSON', option: true},
  },
};
if (isREST) {
  iconH.n.charts = { id: "charts", icon: "dashboard", label: "Dashboard" };
}

function getIcons(cardinality, model) {
  const ih = iconH[cardinality];
  if (cardinality === "1") {
    return [ih.edit, ih.browse];
  }
  const cardiIcons = [ih.list, ih.cards];
  if (model) {
    if (isREST && !model.noCharts) {
      cardiIcons.push(ih.charts);
    }
    if (!model.noStats) {
      cardiIcons.push(ih.stats);
    }
  }
  return cardiIcons;
}

function iconViews(mid, cardinality, id, view, model) {
  if (cardinality === "1" && id === "0") {
    return null;
  }
  const urlFrag = (id ? "/" + id : "") + queryUrl();

  return (
    <div className="hIcons">
      {getIcons(cardinality, model).map((ico) => (
        <Link
          to={"/" + mid + "/" + ico.id + urlFrag}
          className={view === ico.id ? "active" : ico.id}
          key={ico.id}
        >
          <Icon name={ico.icon} tooltip={ico.label} theme="light" />
        </Link>
      ))}
    </div>
  );
}

const Header = ({
  title,
  count,
  comments,
  entity,
  cardinality,
  id,
  view,
  model,
}) => {
  // TODO: make charts work w/ search & filters (and switch comment below)
  // const m = models[this.props.entity]
  const search = view === "charts" ? null : getSearchText();

  if (comments) {
    comments += comments === 1 ? " comment" : " comments";
  }

  return (
    <div className="evo-page-header">
      <h2 className="page-title">
        <span id="itemTitle">{title}</span>
        {search ? <span className="evo-badge">Search "{search}"</span> : null}
        {count ? <span className="evo-badge">{count}</span> : null}
        {comments ? <span className="evo-badge">{comments}</span> : null}
      </h2>
      <div>{iconViews(entity, cardinality, id, view, model)}</div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string,
  model: PropTypes.object.isRequired,
  view: PropTypes.string,
  count: PropTypes.string,
  comments: PropTypes.number,
};
Header.defaultProps = {
  view: null,
  count: null,
  comments: null,
};
