import React, { memo } from "react";
import PropTypes from "prop-types";
import Badge from "components/widgets/Badge/Badge";
import ViewsNavIcons from "./ViewsNavIcons";
import FilterTags from "./FilterTags";

import "./ViewHeader.scss";

// TODO: make charts work w/ search & filters (and switch comment below)
const ViewHeader = memo(
  ({ entity, title, id, view, count, comments, text, params }) => {
    const search = (view === "list" || view === "cards") && (
      <FilterTags params={params} />
    );
    return (
      <div className="evo-page-header" data-testid="viewheader">
        <h1 className="page-title">
          <span className="title-txt">{title}</span>
          {count !== null && <Badge text={count} />}
          {comments > 0 && (
            <Badge
              text={comments + comments === 1 ? " comment" : " comments"}
            />
          )}
          {search}
          {text && <span className="h-txt">{text}</span>}
        </h1>
        <div>
          <ViewsNavIcons id={id} view={view} entity={entity} params={params} />
        </div>
      </div>
    );
  }
);

export default ViewHeader;

ViewHeader.propTypes = {
  /** Model id */
  entity: PropTypes.string.isRequired,
  /** Page title */
  title: PropTypes.string, //.isRequired,
  /** Record id */
  id: PropTypes.string,
  /** Active view */
  view: PropTypes.string,
  /** Number of records (for views "many") */
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Number of comments (for views "one") */
  comments: PropTypes.number,
  /** Extra text beside the title */
  text: PropTypes.string,
  /** extra parameters (filters in location search) */
  params: PropTypes.string,
};

ViewHeader.defaultProps = {
  view: null,
  count: null,
  comments: null,
  text: null,
  params: "",
};
