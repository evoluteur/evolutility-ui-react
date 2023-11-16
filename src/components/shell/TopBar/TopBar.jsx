import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "react-crud-icons";
import logoEvol from "./evologo.png";
import { views, modelViewsMany } from "../../../utils/dicoViews";
import { getModel } from "../../../utils/moMa";
import ViewActions from "./ViewActions";
import GitHubLink from "./GitHubLink";

import "./TopBar.scss";

const ovw = views.overview;
const TopBar = () => {
  const loc = useLocation();
  const path = loc.pathname?.split("/");
  if (path.length > 1) {
    if (path[0] === "") {
      path.splice(0, 1);
    }
  }
  const [entity, view, id] = path; // no access to useParams here
  const model = getModel(entity);
  const entityLink = `/${entity}/`;
  return (
    <nav className="TopBar" role="banner">
      <Link to="/">
        <img src={logoEvol} className="evo-logo" alt="" />
      </Link>
      {model && (
        <div className="evo-toolbar views">
          <div className="nav-links">
            <Link to={entityLink}>
              <Icon name={ovw.icon} tooltip={ovw.label} theme="dark" />
            </Link>
            {modelViewsMany(model, true).map((v) => (
              <Link to={entityLink + v.id} key={v.id}>
                <Icon name={v.icon} tooltip={v.label} theme="dark" />
              </Link>
            ))}
          </div>
          <ViewActions entity={entity} view={view} id={id} />
        </div>
      )}
      <GitHubLink />
    </nav>
  );
};

export default TopBar;
