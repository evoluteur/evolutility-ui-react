import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "react-crud-icons";
import { getModel } from "utils/moMa";
import { views, modelViewsAnalytics } from "utils/dicoViews";

const ViewsNavIcons = ({ id, view, entity, params }) => {
  let iconViews = [];
  if (view === "overview" || view === "activity") {
    return null;
  }
  if (view === "edit" || view === "browse") {
    if (!id || id === "0") {
      return null;
    } else {
      iconViews = [views.edit, views.browse];
    }
  } else if (view === "stats" || view === "charts") {
    const model = getModel(entity);
    iconViews = modelViewsAnalytics(model);
    // } else if (view === "list" || view === "cards") {
  } else {
    iconViews = [views.list, views.cards];
  }

  const urlFrag = (id ? "/" + id : "") + params;
  const iconLink = (ico) => (
    <Link
      key={ico.id}
      to={`../${entity}/${ico.id}${urlFrag}`}
      aria-label={ico.label}
      className={view === ico.id ? "active" : ico.id}
    >
      <Icon name={ico.icon || ico.id} tooltip={ico.label} theme="light" />
    </Link>
  );

  return <div className="title-icons">{iconViews?.map(iconLink)}</div>;
};

ViewsNavIcons.propTypes = {
  /** Model id */
  entity: PropTypes.string.isRequired,
  /** Active view */
  view: PropTypes.string,
  /** Record id */
  id: PropTypes.string,
  // Extra parameters (url search)
  params: PropTypes.string,
};

ViewsNavIcons.defaultProps = {
  view: null,
  id: null,
  params: "",
};

export default ViewsNavIcons;
