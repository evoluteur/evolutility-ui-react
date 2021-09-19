import React from "react";
import { Route, Link } from "react-router-dom";
import Icon from "react-crud-icons";
import { i18n_nav } from "../../i18n/i18n";
import AppMenus from "../../AppMenus";
import url from "../../utils/url";
import GitHub from "./GitHub";
import models from "../../models/all_models";

import "./Nav.scss";

const item2Group_Map = {};
const sections = {};
const setup = () =>
  AppMenus.forEach((menuGroup) => {
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
  <div className="mIcons">
    {vwIcons(models[mid] || []).map((menu) =>
      f.url ? null : (
        <Link to={"/" + mid + menu.id} key={menu.id}>
          <Icon name={menu.icon} size="small" theme="none" />
        </Link>
      )
    )}
  </div>
);

const MenuLink = ({ menu }) => (
  <Route
    path={"/" + menu.id}
    exact={false}
    children={({ match }) => (
      <li className={match ? "active" : ""}>
        <Link
          to={
            "/" +
            menu.id +
            "/" +
            (menu.defaultViewMany ? menu.defaultViewMany : "list")
          }
        >
          <img className="evol-many-icon" src={"/pix/" + menu.icon} alt="" />
          {menu.text}
        </Link>
        {iconViews(menu.id, menu)}
      </li>
    )}
  />
);

const MenuLinkSimple = ({ menu }) => (
  <Route
    path={"/" + menu.id}
    exact={false}
    children={({ match }) => (
      <li className={match ? "active" : ""}>
        <Link
          to={
            "/" +
            menu.id +
            "/" +
            (menu.defaultViewMany ? menu.defaultViewMany : "list")
          }
        >
          <img className="evol-many-icon" src={"/pix/" + menu.icon} alt="" />
        </Link>
      </li>
    )}
  />
);

export default class Nav extends React.Component {
  state = {
    navOpened: true,
  };

  render() {
    setup();
    const navOpened = this.state.navOpened;
    const urlw = this.props.match ? this.props.match.url : "";
    const w = url.getUrlMap(urlw);
    const g = item2Group_Map[w.entity];
    let footer;

    let menus = [];
    if (g === "designer") {
      menus = [sections.designer];
      footer = <Link to="/">Home</Link>;
    } else if (g === "organizer" || g === "music" || w.entity === "demo") {
      menus = [sections.organizer, sections.music];
      //menus = [sections.organizer, sections.music, sections.test]
      //footer = <Link to="/world/list">Designer</Link>
    } else {
      if (w.entity === "test") {
        menus = []; //[sections.test]
      } else {
        menus = [];
      }
      footer = (
        <>
          <Link to="/demo">
            <img alt="Demos" src="/pix/cup.png" /> Demos
          </Link>
          <br />
        </>
      );
      // <Link to="/designer"><img alt="Designer" src={'/pix/bricks.png'} /> Designer</Link>
    }

    const link = navOpened
      ? (menu) => <MenuLink menu={menu} key={menu.id} />
      : (menu) => <MenuLinkSimple menu={menu} key={menu.id} />;
    const MenuLinks = ({ menus }) => menus.map((menu) => link(menu));

    const Section = (section) =>
      section ? (
        <li className={section.id === g ? "active-li" : ""} key={section.id}>
          {navOpened && section.title ? (
            <div>
              <img
                alt={section.title}
                src={"/svg/" + section.icon + ".svg"}
                className="cpnSvg"
              />
              {section.title}
            </div>
          ) : null}
          <ul className="nav-l2">
            <MenuLinks menus={section.menus} />
          </ul>
        </li>
      ) : null;

    return (
      <nav className="Nav">
        <a className="skipNav" href="#afterNav">
          {i18n_nav.skip}
        </a>
        <div className="navTop">
          <Icon
            id="navToggle"
            name="list"
            theme="light"
            onClick={this.toggleNav}
          />
          <span className="embossed">Evolutility</span>
        </div>
        <ul>{menus.map(Section)}</ul>
        <div className="footLinks">{footer}</div>
        <div id="afterNav" />
        <GitHub />
      </nav>
    );
  }

  toggleNav = () => {
    const opened = !this.state.navOpened;
    const nav = document.getElementsByClassName("Nav")[0];
    const c = document.getElementsByClassName("pageContent")[0];

    if (opened) {
      nav.style.width = "180px";
      c.style.marginLeft = "180px";
    } else {
      nav.style.width = "50px";
      c.style.marginLeft = "50px";
    }
    this.setState({
      navOpened: opened,
    });
  };
}
