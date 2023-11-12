import React, { memo } from "react";
import PropTypes from "prop-types";
import Badge from "../../widgets/Badge/Badge";

import "./ViewHeader.scss";

const operators = {
  eq: "=",
  gt: ">",
  lt: "<",
};

const FilterTags = memo(({ params }) => {
  if (!params) {
    return null;
  }
  const ps = params.slice(1).split("&");
  const filters = [];
  ps.forEach((p) => {
    const [field, cond] = p.split("=");
    if (!["order", "page", "pageSize"].includes(field)) {
      if (field === "search") {
        filters.push(field + "=" + cond);
      }
      const idx = cond.indexOf(".");
      if (idx > 0) {
        const op = operators[cond.substring(0, idx)] || " ";
        const v = cond.substring(idx + 1);
        // TODO: use model to get correct field label
        filters.push(field + op + v);
      }
    }
  });
  if (filters.length > 0) {
    return filters.map((filter) => (
      <Badge key={filter} text={`${filter}`} type="info" />
    ));
  }
  return null;
});

export default FilterTags;

FilterTags.propTypes = {
  /** filters and search (as in location search) */
  params: PropTypes.string,
};

FilterTags.defaultProps = {
  params: "",
};
