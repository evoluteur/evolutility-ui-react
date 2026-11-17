import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import Icon from "components/ui/Icon/Icon";
import { i18n_nav, i18n_designer } from "i18n/i18n";
import { useModelsVersion } from "utils/moMa";
import {
  getDemosMenu,
  docMenus,
  type DemoMenuItem,
  type DocMenuItem,
} from "./appMenus";
import { evoPath, pixPath } from "utils/format";

import demoSVG from "./svg/eye.svg";
import docSVG from "./svg/book.svg";

import "./SideBar.scss";

// #region ------- Helpers ---------
const ShortCuts = ({ entity }: { entity: string }) => (
  <div className="x-icons">
    <Link to={`/${evoPath}/${entity}/edit/0`} aria-label="Add">
      <Icon name="add2" size="small" theme="none" />
    </Link>
    <Link to={`/${evoPath}/${entity}/list`} aria-label="List">
      <Icon name="list" size="small" theme="none" />
    </Link>
    <Link to={`/designer/${entity}`} aria-label={i18n_designer.editModel}>
      <Icon name="edit" size="small" theme="none" />
    </Link>
  </div>
);

const sLink = (
  label: string | undefined,
  url: string,
  icon: string,
  css?: string,
) => (
  <Link to={url} key={url}>
    <img className={css} src={icon} alt="" />
    <span>{label}</span>
  </Link>
);
const hDemos = sLink("Demos", `/${evoPath}`, demoSVG);
const hDocs = sLink("Documentation", "/docs", docSVG);
const hDesigner = sLink(
  i18n_designer.title,
  "/designer",
  pixPath + "doc/model.png",
  "e-icon",
);
//#endregion

export interface SideBarProps {
  onClickToggle?: () => void;
}

const SideBar = ({ onClickToggle }: SideBarProps) => {
  // const { entity, view } = useParams(); // not  outside of evolutility routes
  const [entity, view] = useLocation().pathname.slice(1).split("/");
  useModelsVersion(); // - re-render when models change
  const menuLinkDemo = (menu: DemoMenuItem) => (
    <li className={classnames({ active: menu.id === entity })} key={menu.id}>
      {sLink(
        menu.text,
        `/${evoPath}/${menu.id}/${menu.defaultViewMany || "list"}`,
        pixPath + menu.icon,
        "e-icon",
      )}
      <ShortCuts entity={menu.id} />
    </li>
  );

  const menuLinkDoc = (menu: DocMenuItem) => (
    <li className={classnames({ active: menu.id === view })} key={menu.id}>
      <Link to={`/docs/${menu.id}`}>
        <img className="e-icon" src={pixPath + menu.icon} alt="" />
        <span>{menu.text}</span>
      </Link>
    </li>
  );

  let title, links, menus;
  if (!entity) {
    links = [hDemos, hDocs, hDesigner];
  } else if (entity === "docs") {
    title = hDocs;
    menus = docMenus.map(menuLinkDoc);
    links = [hDemos, hDesigner];
  } else {
    title = hDemos;
    menus = getDemosMenu().map(menuLinkDemo);
    links = entity === "designer" ? hDocs : [hDocs, hDesigner];
  }

  return (
    <nav className="evo-sidebar" role="navigation" data-testid="sidebar">
      <a className="skipNav" href="#afterNav">
        {i18n_nav.skip}
      </a>
      <span className="nav-toggle">
        <Icon name="chevron-down" theme="none" onClick={onClickToggle} />
      </span>
      {title && (
        <>
          <div className="sections-links">{title}</div>
          <ul>{menus}</ul>
          <br />
        </>
      )}
      <div className="sections-links">{links}</div>
      <div id="afterNav" />
    </nav>
  );
};

export default SideBar;
