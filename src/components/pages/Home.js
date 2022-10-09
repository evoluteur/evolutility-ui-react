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
  if (m.active) {
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
          <span className="utility">utility</span>-UI-React{" "}
          <span className="version">v{pkg.version}</span>{" "}
        </h1>
        <h2 className="tBlue">
          Toolkit to build CRUD UIs with models rather than code
        </h2>
      </section>
      <section>
        <div>
          Evolutility provides an integrated set of model-driven React
          components for CRUD UIs using GraphQL. No hand-coding necessary. For
          each application, all views, form validation, and API calls are
          defined in a single model.
        </div>
        <div>With it, you can build UIs like these:</div>
        <DemosList />
        <div>
          ... simply by making models like{" "}
          <a
            href="https://github.com/evoluteur/evolutility-ui-react/tree/master/src/models/organizer"
            target="jsm"
            rel="noopener noreferrer"
            className="extlink"
          >
            these JSON files
          </a>
          .
        </div>
      </section>

      <section>
        <p>
          Evolutility-UI-React can use GraphQL with{" "}
          <a
            href="https://hasura.io"
            target="h"
            rel="noopener noreferrer"
            className="extlink"
          >
            Hasura
          </a>{" "}
          or REST with{" "}
          <a
            href="https://github.com/evoluteur/evolutility-server-node"
            target="esn"
            rel="noopener noreferrer"
            className="extlink"
          >
            Evolutility-Server-Node
          </a>
          .
        </p>
        <p>
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
            href="https://github.com/evoluteur/evolutility-ui-react/blob/master/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="extlink"
          >
            MIT license
          </a>
          .
        </p>
      </section>
      <div className="text-center">
        <img src="pix/react.png" alt="React" />
        <img src="pix/graphql.png" alt="GraphQL" />
      </div>
    </div>
  );
};

export default Home;
