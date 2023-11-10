/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2023 Olivier Giulieri
*/

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import pkg from "../../../package.json";
import { pixPath } from "../../utils/format";
import Gallery from "./Gallery";
import { modelIds, getModel } from "../../utils/moMa";
import ModelsLinks from "../../components/views/comfort/ModelLinks";

import "./Home.scss";

const logoPath = pixPath + "logos/";
const orgIcons = [];
const musicIcons = [];

modelIds.forEach((mid) => {
  const m = getModel(mid);
  if (m && m.active) {
    if (m.world === "organizer" || m.world === "music") {
      const menuItem = {
        id: m.id,
        world: m.world,
        icon: pixPath + m.icon,
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
          Evolutility provides a{" "}
          <strong>
            <Link to="docs/metamodel">metamodel</Link>
          </strong>{" "}
          (model structure) to define UI models and{" "}
          <strong>
            a set of <Link to="docs/views">model-driven Views</Link>
          </strong>{" "}
          (Overview, List, Cards, Browse, Edit, Dashboard...) to build UIs for
          GraphQL with models rather than code.
        </div>

        <Gallery />

        <div>
          With it, you can build a React SPA for GraphQL like these examples:
        </div>
        <div className="home-demos">
          <ModelsLinks />
        </div>
        <div>
          ... simply by making models like these{" "}
          <Link to="docs/models">sample models</Link>.
        </div>
        <div>
          <br />
          For each application, all views, form validation, and API calls are
          generated at run-time from a single model. No hand-coding necessary!
        </div>
        <div>
          <br />
          Evolutility-UI-React is Open source. The code and documentation are
          available at{" "}
          <a
            href="https://github.com/evoluteur/evolutility-ui-react"
            target="_blank"
            rel="noopener noreferrer"
            className="extlink"
          >
            GitHub
          </a>
          .
        </div>
      </section>
      <div className="text-center tech-logos">
        <a href="https://reactjs.org/" target="react" rel="noopener noreferrer">
          <img src={logoPath + "react.png"} alt="React" />
        </a>
        <a
          href="https://graphql.org/"
          target="graphql"
          rel="noopener noreferrer"
        >
          <img src={logoPath + "graphql.png"} alt="GraphQL" />
        </a>
        <a href="https://hasura.io" target="hasura" rel="noopener noreferrer">
          <img src={logoPath + "hasura.png"} alt="Hasura" className="hasura" />
        </a>
      </div>
    </div>
  );
};

export default Home;
