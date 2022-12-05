/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2022 Olivier Giulieri
*/

import React, { useEffect } from "react";
import pkg from "../../../package.json";
import { modelIds, getModel } from "../../utils/moMa";
import DemosList from "./DemosList";

import "./Home.scss";

const orgIcons = [];
const musicIcons = [];

modelIds.forEach((mid) => {
  const m = getModel(mid);
  if (m && m.active) {
    if (m.world === "organizer" || m.world === "music") {
      const menuItem = {
        id: m.id,
        oid: m.oid,
        world: m.world,
        icon: `pix/${m.icon}`,
        label: m.title || m.label,
      };
      if (m.world === "organizer") {
        orgIcons.push(menuItem);
      } else if (m.world === "music") {
        musicIcons.push(menuItem);
      }
    }
  }
});

const Home = () => {
  useEffect(() => {
    document.title = "Evolutility";
    window.scrollTo(0, 0);
  });

  return (
    <div className="evo-home">
      <section className="co-splash">
        <h1 className="siteTitle text-center">
          <span>Evol</span>
          <span className="utility">utility</span>-UI-
          <span className="ns">
            React <span className="version">v{pkg.version}</span>
          </span>
        </h1>
        <h2 className="tBlue">
          Toolkit to build CRUD UIs with models rather than code
        </h2>
      </section>
      <section>
        <div>
          Evolutility provides a <strong>metamodel</strong> (model structure) to
          define your models and <strong>a set of model-driven Views</strong>{" "}
          (Browse, Edit, List, Cards, Dashboards...) to give them life without
          writing code.
        </div>
        <div>With it, you can build UIs like these:</div>
        </div>
        <DemosList />
        <div>
          ... simply by making models like{" "}
          <a
            href="https://github.com/evoluteur/evolutility-ui-react/tree/main/src/models/organizer"
            target="jsm"
            rel="noopener noreferrer"
            className="extlink"
          >
            these JSON files
          </a>
          .
        </div>
        <div>
          <br />
          No hand-coding necessary. For each application, all views, form
          validation, and API calls are defined in a single model.
        </div>
      </section>

      <div className="text-center tech-logos">
        <a href="https://reactjs.org/" target="react" rel="noopener noreferrer">
          <img src="pix/react.png" alt="React" />
        </a>
        <a
          href="https://graphql.org/"
          target="graphql"
          rel="noopener noreferrer"
        >
          <img src="pix/graphql.png" alt="GraphQL" />
        </a>
        <a href="https://hasura.io" target="hasura" rel="noopener noreferrer">
          <img src="pix/hasura.png" alt="Hasura" className="hasura" />
        </a>
      </div>
      <section>
        <div>
          Evolutility is a React SPA using GraphQL on{" "}
          <a
            href="https://hasura.io"
            target="h"
            rel="noopener noreferrer"
            className="extlink"
          >
            Hasura
          </a>
          .
        </div>
        <div>
          Evolutility-UI-React is Open source. The code and documentation are
          available at{" "}
          <a
            href="https://github.com/evoluteur/evolutility-ui-react"
            target="_blank"
            rel="noopener noreferrer"
            className="extlink"
          >
            GitHub
          </a>{" "}
          with{" "}
          <a
            href="https://github.com/evoluteur/evolutility-ui-react/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="extlink"
          >
            MIT license
          </a>
          .
        </div>
      </section>
    </div>
  );
};

export default Home;
