import React from "react";
import classnames from "classnames";
import { Link, useParams } from "react-router-dom";
import Icon from "react-crud-icons";
import { i18n_nav } from "../../../i18n/i18n";
import { demosMenu, docMenus } from "./appMenus";
import { pixPath } from "../../../utils/format";

import demoSVG from "./svg/eye.svg";
import docSVG from "./svg/book.svg";

import "./SideBar.scss";

// #region ------- Helpers ---------
const iconViews = (mid) => (
  <div className="x-icons">
    <Link to={`/${mid}/edit/0`}>
      <Icon name="add2" size="small" theme="none" />
    </Link>
    <Link to={`/${mid}/list`}>
      <Icon name="list" size="small" theme="none" />
    </Link>
  </div>
);

const sLink = (label, url, icon, css) => (
  <Link to={url} key={url}>
    <img className={css} src={icon} alt="" />
    <span>{label}</span>
  </Link>
);
const hDemos = sLink("Demos", "demos", demoSVG);
const hDocs = sLink("Documentation", "docs", docSVG);
//#endregion

const SideBar = ({ onClickToggle }) => {
  const { entity, view } = useParams();

  const menuLink = (menu) => (
    <li className={classnames({ active: menu.id === entity })} key={menu.id}>
      {sLink(
        menu.text,
        `/${menu.id}/${menu.defaultViewMany || "list"}`,
        pixPath + menu.icon,
        "e-icon"
      )}
      {iconViews(menu.id, menu)}
    </li>
  );

  const menuLinkDoc = (menu) => (
    <li className={classnames({ active: menu.id === view })} key={menu.id}>
      <Link to={`docs/${menu.id}`}>
        <img className="e-icon" src={pixPath + menu.icon} alt="" />
        <span>{menu.text}</span>
      </Link>
    </li>
  );

  let title = null;
  let links = null;
  let menus = [];

  if (entity === "") {
    links = [hDemos, hDocs];
  } else if (entity === "docs") {
    title = hDocs;
    menus = docMenus.map(menuLinkDoc);
    links = hDemos;
  } else {
    title = hDemos;
    menus = demosMenu.map(menuLink);
    links = hDocs;
  }

  return (
    <nav className="evo-sidebar" role="navigation">
      <a className="skipNav" href="#afterNav">
        {i18n_nav.skip}
      </a>
      <span className="nav-toggle">
        <Icon name="chevron-down" theme="none" onClick={onClickToggle} />
      </span>
      <div className="sections-links">{title}</div>
      <ul>{menus}</ul>
      <br />
      <div className="sections-links">{links}</div>
      <div id="afterNav" />
    </nav>
  );
};

export default SideBar;
