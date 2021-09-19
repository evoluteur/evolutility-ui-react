/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2021 Olivier Giulieri
*/

import React from "react";
import pkg from "../../../package.json";
import { modelIds, getModel } from "../../utils/moMa";
import DemosList from "./DemosList.js";

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
        icon: "pix/" + m.icon,
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

export default class Home extends React.PureComponent {
  componentDidMount() {
    document.title = "Evolutility";
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="evo-home">
        <h1 className="siteTitle">
          <span>Evol</span>
          <span className="navy">utility</span>{" "}
          <span style={{ fontSize: ".5em" }}>v{pkg.version}</span>{" "}
        </h1>
        <h2 className="tBlue">
          Toolkit for building CRUD applications with models rather than code
        </h2>

        <section>
          <div>
            Evolutility is simple Low-Code platform for CRUD applications. It is
            so DRY that all views (List, Cards, Browse, Edit...) are driven from
            a single model.
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
            No hand-coding necessary. All views, validation code, and API calls
            are derived from the models. It works with REST using{" "}
            <a
              href="https://github.com/evoluteur/evolutility-server-node"
              target="esn"
              rel="noopener noreferrer"
              className="extlink"
            >
              Evolutility-Server-Node
            </a>{" "}
            or GraphQL using{" "}
            <a
              href="https://hasura.io"
              target="h"
              rel="noopener noreferrer"
              className="extlink"
            >
              Hasura
            </a>
            .
          </p>
          <p>
            Code and documentation available at{" "}
            <a
              href="https://github.com/evoluteur/evolutility-ui-react"
              target="_blank"
              rel="noopener noreferrer"
              className="extlink"
            >
              GitHub
            </a>{" "}
            with MIT license.
          </p>
        </section>
      </div>
    );
  }
}
