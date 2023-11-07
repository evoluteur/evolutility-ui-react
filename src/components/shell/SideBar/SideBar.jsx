/* eslint-disable no-unused-vars */
import React from "react";
import classnames from "classnames";
import { Link, NavLink, useParams } from "react-router-dom";
import Icon from "react-crud-icons";
import { i18n_nav } from "../../../i18n/i18n";
import appMenus from "./appMenus";
import { getUrlMap } from "../../../utils/url";
import { modelIds } from "../../../utils/moMa";

import "./SideBar.scss";

// #region ------- Helpers ---------
const item2Group_Map = {};
const sections = { doc: [] };

appMenus.forEach((menuGroup) => {
  const groupId = menuGroup.id;
  sections[groupId] = menuGroup;
  menuGroup.menus.forEach((menuItem) => {
    item2Group_Map[menuItem.id] = groupId;
  });
});

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
const hDemos = sLink("Demos", "/demos", "./svg/eye.svg");
const hDocs = sLink("Documentation", "/docs", "./svg/book.svg");

const MenuLink = ({ menu, active }) => (
  <li className={classnames({ active })}>
    {sLink(
      menu.text,
      `/${menu.id}/${menu.defaultViewMany || "list"}`,
      "/pix/" + menu.icon,
      "e-icon"
    )}
    {iconViews(menu.id, menu)}
  </li>
);

const MenuLinkDoc = ({ menu, active }) => (
  <li className={classnames({ active })} key={menu.id}>
    <Link to={`docs/${menu.id}`}>
      <img className="e-icon" src={"/pix/" + menu.icon} alt="" />
      <span>{menu.text}</span>
    </Link>
  </li>
);
//#endregion

const SideBar = ({ onClickToggle }) => {
  const params = useParams(); // Keep for forcing render
  const { entity, view } = getUrlMap();
  // console.log(params, entity, view);

  const g = item2Group_Map[entity];
  let links = null;
  let menus = [];

  if (entity === "demos" || modelIds.includes(entity)) {
    menus = [sections.demos];
    links = hDocs;
  } else if (entity === "docs") {
    menus = [sections.docs];
    links = hDemos;
  } else {
    links = [hDemos, hDocs];
  }

  const MenuLinks = ({ menus }) =>
    menus.map((m) => <MenuLink menu={m} key={m.id} active={m.id === entity} />);

  const MenuLinksDoc = ({ menus }) =>
    menus.map((m) => (
      <MenuLinkDoc menu={m} key={m.id} active={m.id === view} />
    ));

  const Section = (section) =>
    section && (
      <li className={section.id === g ? "active-li" : ""} key={section.id}>
        {section.title && (
          <div>
            <NavLink to={"/" + section?.id}>
              <img alt={section.title} src={`/svg/${section.icon}.svg`} />
              <span>{section.title}</span>
            </NavLink>
          </div>
        )}
        <ul
          className={classnames("nav-l2", { "nav-doc": section.id === "docs" })}
        >
          {section.id === "docs" ? (
            <MenuLinksDoc menus={section.menus} activeEntity={entity} />
          ) : (
            <MenuLinks menus={section.menus} activeEntity={entity} />
          )}
        </ul>
      </li>
    );

  return (
    <nav className="evo-sidebar" role="navigation">
      <a className="skipNav" href="#afterNav">
        {i18n_nav.skip}
      </a>
      <span className="nav-toggle">
        <Icon name="chevron-down" theme="none" onClick={onClickToggle} />
      </span>
      <ul>{menus.map(Section)}</ul>
      <div className="sections-links">{links}</div>
      <div id="afterNav" />
    </nav>
  );
};

export default SideBar;
