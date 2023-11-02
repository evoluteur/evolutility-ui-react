import React from "react";
import PropTypes from "prop-types";
import Badge from "../../widgets/Badge/Badge";
import ViewsNavIcons from "./ViewsNavIcons";
import { getSearchText } from "../../../utils/url";

import "./PageTitle.scss";

const PageTitle = ({ entity, title, id, view, count, comments, text }) => {
  // TODO: make charts work w/ search & filters (and switch comment below)
  const search = view !== "charts" ? getSearchText() : null;

  if (comments) {
    comments += comments === 1 ? " comment" : " comments";
  }

  return (
    <div className="evo-page-header">
      <h1 className="page-title">
        <span id="itemTitle">{title}</span>
        {count > 0 && <Badge text={count} />}
        {comments > 0 && <Badge text={comments} />}
        {search && <Badge text={`Search "${search}"`} />}
        {text && <span className="h-txt">{text}</span>}
      </h1>
      <div>
        <ViewsNavIcons id={id} view={view} entity={entity} />
      </div>
    </div>
  );
};

export default PageTitle;

PageTitle.propTypes = {
  /** Model id */
  entity: PropTypes.string.isRequired,
  /** Page title */
  title: PropTypes.string, //.isRequired,
  /** Record id */
  id: PropTypes.string,
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
