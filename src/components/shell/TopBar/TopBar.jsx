import React from "react";
import { Link, useLocation } from "react-router-dom";

import Icon from "react-crud-icons";
import logoEvol from "./evologo.gif";
import { modelViewsMany } from "../../../utils/dicoViews";
import { getModel } from "../../../utils/moMa";
import ViewActions from "./ViewActions";
import GitHubLink from "../GitHubLink";

import "./TopBar.scss";

const TopBar = () => {
  const loc = useLocation();
  const path = loc.pathname?.split("/");
  if (path.length > 1) {
    if (path[0] === "") {
      path.splice(0, 1);
    }
  }
  const [e, vw, id] = path;
  const model = getModel(e);
  const entityLink = `/${e}/`;
  return (
    <nav className="TopBar" role="banner">
      <Link to="/">
        <img src={logoEvol} className="evo-logo" alt="" />
      </Link>
      {model && (
        <div className="evo-toolbar views">
          <ul className="navlinks evo-nav-pills pull-left">
            <Link to={entityLink}>
              <Icon name="home-circle" tooltip="Overview" theme="dark" />
            </Link>
            {modelViewsMany(model, true).map((v) => (
              <Link to={entityLink + v.id} key={v.id}>
                <Icon name={v.icon} tooltip={v.label} theme="dark" />
              </Link>
            ))}
          </ul>
          <ViewActions id={id} entity={e} view={vw} />
        </div>
      )}
      <GitHubLink />
    </nav>
  );
};

export default TopBar;
