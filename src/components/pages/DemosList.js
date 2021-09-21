import React from "react";
import { Link } from "react-router-dom";
import { getModel } from "../../utils/moMa";

import "./DemosList.scss";

const titleElem = (label, url, showTitle) =>
  showTitle ? (
    <h3>
      <img alt={label} src={url} />
      {label}
    </h3>
  ) : null;

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

export default class DemosList extends React.PureComponent {
  render = () => {
    const showTitle = this.props.title || false;
    const { view } = this.props;

    return (
      <div className="d-worlds">
        <div>
          {titleElem("Organizer", "/svg/briefcase.svg", showTitle)}
          <div className="demoLinks">
            {itemLink(1, "todo", view)}
            {itemLink(2, "contact", view)}
            {itemLink(4, "restaurant", view)}
          </div>
          <div className="demoLinks">
            {itemLink(3, "comics", view)}
            {itemLink(5, "winecellar", view)}
            {itemLink(6, "winetasting", view)}
          </div>
        </div>
        <div>
          {titleElem("Music", "/svg/music.svg", showTitle)}
          <div className="demoLinks">
            {itemLink(8, "artist", view)}
            {itemLink(7, "album", view)}
            {itemLink(9, "track", view)}
          </div>
        </div>
      </div>
    );
  };
}
