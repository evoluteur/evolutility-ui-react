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
import { docMenus } from "../../appMenus";

import "./Doc.scss";

const Doc = () => {
  useEffect(() => {
    document.title = "Evolutility Documentation";
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
          Evolutility provides a{" "}
          <strong>
            <Link to="./metamodel">metamodel</Link>
          </strong>{" "}
          (model structure) to define your models and{" "}
          <strong>
            a set of <Link to="./views">model-driven Views</Link>
          </strong>{" "}
          (Browse, Edit, List, Cards, Dashboards...) to give them life without
          writing code.
        </p>
        <h3 id="table-of-contents">Table of Contents</h3>
        <ol style={{ listStyleType: "decimal" }}>
          {docMenus.map((m) => (
            <li>
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
          <br />
        </p>
        <p>
          Copyright (c) 2023{" "}
          <a
            href="https://evoluteur.github.io/"
            target="omg"
            rel="noopener noreferrer"
            className="extlink"
          >
            Olivier Giulieri
          </a>
          .
        </p>
        <p>
          Evolutility-UI-React is released under the{" "}
          <a
            href="http://github.com/evoluteur/evolutility-ui-react/blob/main/LICENSE"
            target="mit"
            rel="noopener noreferrer"
            className="extlink"
          >
            MIT license
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default Doc;
