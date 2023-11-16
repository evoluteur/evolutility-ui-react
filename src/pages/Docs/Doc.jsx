/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2023 Olivier Giulieri
*/

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectBadges from "./components/ProjectBadges";
import { docMenus } from "../../components/shell/SideBar/appMenus";

import "./Doc.scss";

const Doc = () => {
  useEffect(() => {
    document.title = "Documentation";
    window.scrollTo(0, 0);
  });

  return (
    <div className="evo-doc">
      <div className="doc-title cols-2">
        <h1>Documentation</h1>
        <ProjectBadges />
      </div>

      <section>
        <p>
          Evolutility is a model-driven UI for GraphQL. With it you can easily
          build modern SPAs by writing models rather than code.
        </p>
        <h3 id="table-of-contents">Table of Contents</h3>
        <ol style={{ listStyleType: "decimal" }}>
          {docMenus.map((m) => (
            <li key={m.id}>
              <Link to={m.id}>{m.text}</Link>
            </li>
          ))}
        </ol>
        <p>
          <br />
        </p>
        <p>
          It's still a work in progress. To suggest a feature or report a bug:{" "}
          <a
            href="https://github.com/evoluteur/evolutility-ui-react/issues"
            target="gbr"
            rel="noopener noreferrer"
            className="extlink"
          >
            https://github.com/evoluteur/evolutility-ui-react/issues
          </a>
        </p>
        <p>
          Evolutility-UI-React is released under the{" "}
          <a
            href="http://github.com/evoluteur/evolutility-ui-react/blob/main/LICENSE"
            target="agpl"
            rel="noopener noreferrer"
            className="extlink"
          >
            AGPL license
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Doc;
