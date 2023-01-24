import React from "react";
import classnames from "classnames";
import { Link, NavLink, useParams } from "react-router-dom";
import Icon from "react-crud-icons";
import { i18n_nav } from "../../i18n/i18n";
import appMenus from "../../appMenus";
import { getUrlMap } from "../../utils/url";
import { models, modelIds } from "../../utils/moMa";

import "./SideBar.scss";

// TODO: need rewrite

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

const vwIcons = (m) => {
  const mm = [
    { id: "/edit/0", icon: "add2" },
    { id: "/list", icon: "list" },
  ];
  return mm;
};

const iconViews = (mid, f) => (
  <div className="x-icons">
    {vwIcons(models[mid] || []).map(
      (menu) =>
        !f.url && (
          <Link to={`/${mid}${menu.id}`} key={menu.id}>
            <Icon name={menu.icon} size="small" theme="none" />
          </Link>
        )
    )}
  </div>
);

const sLink = (label, url, icon) => (
  <Link to={url}>
    <img alt="" src={`/svg/${icon}.svg`} />
    <span>{label}</span>
  </Link>
);

const MenuLink = ({ menu, activeEntity }) => (
  <li className={classnames({ active: menu.id === activeEntity })}>
    <Link
      to={`/${menu.id}/${menu.defaultViewMany ? menu.defaultViewMany : "list"}`}
    >
      <img className="e-icon" src={"/pix/" + menu.icon} alt="" />
      <span>{menu.text}</span>
    </Link>
    {iconViews(menu.id, menu)}
  </li>
);
//#endregion

const SideBar = ({ onClickToggle }) => {
  // TODO: clean this
  const params = useParams(); // Keep for forcing render
  const { entity, view } = getUrlMap();
  console.log(params, entity, view);

  const g = item2Group_Map[entity];
  let links = [];
  let menus = [];

  const MenuLinkDoc = ({ menu }) => (
    <li className={classnames({ active: menu.id === view })}>
      <Link to={`docs/${menu.id}`}>
        <img className="e-icon" src={"/pix/" + menu.icon} alt="" />
        <span>{menu.text}</span>
      </Link>
    </li>
  );

  if (entity === "demos" || modelIds.includes(entity)) {
    menus = [sections.demos]; // [sections.organizer, sections.music, sections.test]
    links = sLink("Documentation", "/docs", "book");
  } else if (entity === "docs") {
    menus = [sections.docs];
    links = sLink("Demos", "/demos", "eye");
  } else {
    links = (
      <>
        {sLink("Demos", "/demos", "eye")}
        {sLink("Documentation", "/docs", "book")}
      </>
    );
  }

  const link = (menu) => (
    <MenuLink menu={menu} key={menu.id} activeEntity={entity} />
  );

  const MenuLinks = ({ menus }) => menus.map(link);
  const MenuLinksDoc = ({ menus }) =>
    menus.map((m) => <MenuLinkDoc menu={m} key={m.id} />);

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
