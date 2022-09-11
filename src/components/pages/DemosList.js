import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { demoModelIds, getModel } from "../../utils/moMa";

import "./DemosList.scss";
/*
const titleElem = (label, url, showTitle) =>
  showTitle ? (
    <h3>
      <img alt={label} src={url} />
      {label}
    </h3>
  ) : null;
*/
const itemLink = (id, mid, view) => {
  const m = getModel(mid);
  if (view === "api") {
    return (
      <Link to={`/${mid}/api`}>
        <img src="/pix/designer/api.png" alt={m.title} title={m.title} />
        {m.title}
      </Link>
    );
  }
  if (view === "model") {
    return (
      <Link to={`/object/browse/${id}`}>
        <img src="/pix/designer/object.png" alt={m.title} title={m.title} />
        {m.title}
      </Link>
    );
  }
  return (
    <Link to={`/${mid}/${m.defaultViewMany || "list"}`}>
      <img src={`/pix/${m.icon}`} alt={m.title} title={m.title} />
      {m.title}
    </Link>
  );
};

const DemosList = ({ view }) => {
  const columnBreakIdx = parseInt(demoModelIds.length / 2) + 1;

  return (
    <div className="d-worlds">
      <div className="demoLinks">
        {demoModelIds
          .slice(0, columnBreakIdx)
          .map((id) => itemLink(1, id, view))}{" "}
      </div>
      <div className="demoLinks">
        {demoModelIds
          .slice(parseInt(columnBreakIdx))
          .map((id) => itemLink(1, id, view))}
      </div>
    </div>
  );
};
// {titleElem("Demo", "/svg/human-greeting.svg", showTitle)}

export default DemosList;

DemosList.propTypes = {
  view: PropTypes.string,
};

DemosList.defaultProps = {
  view: "list",
};
