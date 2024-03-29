import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "react-crud-icons";
import logoEvol from "./evologo.png";
import { views, modelViewsMany } from "utils/dicoViews";
import { getModel } from "utils/moMa";
import { evoPath } from "utils/format";
import ViewActions from "./ViewActions";
import GitHubLink from "./GitHubLink";

import "./TopBar.scss";

const ovw = views.overview;
const TopBar = () => {
  const loc = useLocation();
  const path = loc.pathname?.split("/");
  const [entity, view, id] = path.splice(2); // no access to useParams here
  const model = path[1] === evoPath ? getModel(entity) : null;
  const entityLink = `/${evoPath}/${entity}/`;
  return (
    <nav className="evo-topbar">
      <Link to="/" className="evo-logo" aria-label="Home">
        <img src={logoEvol} alt="" />
      </Link>
      {model && (
        <div className="topbar-icons">
          <div className="icons-always">
            <Link to={entityLink} aria-label={ovw.label}>
              <Icon name={ovw.icon} tooltip={ovw.label} theme="dark" />
            </Link>
            {modelViewsMany(model, true).map((v) => (
              <Link to={entityLink + v.id} key={v.id} aria-label={v.label}>
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
