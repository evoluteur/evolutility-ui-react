import React, { memo } from "react";
import PropTypes from "prop-types";
import Badge from "../../widgets/Badge/Badge";
import ViewsNavIcons from "./ViewsNavIcons";

import "./ViewHeader.scss";

const operators = {
  eq: "=",
  gt: ">",
  lt: "<",
};

const SearchLabel = memo(({ params }) => {
  if (!params) {
    return null;
  }
  // TODO: use model to get it right
  const ps = params.slice(1).split("&");
  const filters = ps.map((p) => {
    const [field, cond] = p.split("=");
    const idx = cond.indexOf(".");
    if (idx > 0) {
      const op = operators[cond.substring(0, idx)];
      const v = cond.substring(idx + 1);
      return field + op + v;
    }
    return `${field}="${cond}"`;
  });
  const fs = filters.join(" and ");
  return <Badge text={`Filter: ${fs}`} type="info" />;
});

// TODO: make charts work w/ search & filters (and switch comment below)
const ViewHeader = memo(
  ({ entity, title, id, view, count, comments, text, params }) => {
    const search = (view === "list" || view === "cards") && (
      <SearchLabel params={params} />
    );
    return (
      <div className="evo-page-header">
        <h1 className="page-title">
          <span id="itemTitle">{title}</span>
          {count > 0 && <Badge text={count} />}
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
  count: PropTypes.number,
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
