import React from "react";
import PropTypes from "prop-types";
import Badge from "../../widgets/Badge/Badge";
import ViewsNavIcons from "./ViewsNavIcons";
import { getSearchText } from "../../../utils/url";

import "./PageTitle.scss";

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
        {count > 0 && <Badge text={count} />}
        {comments > 0 && <Badge text={comments} />}
        {search && <Badge text={`Search "${search}"`} />}
        {text && <span className="h-txt">{text}</span>}
      </h1>
      <div>{ViewsNavIcons(entity, cardinality, id, view, model)}</div>
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
  /** Family of view ("0"=comfort, "1"=one, "n"=many) */
  cardinality: PropTypes.oneOf(["0", "1", "n"]),
};

PageTitle.defaultProps = {
  view: null,
  count: null,
  comments: null,
  text: null,
};
