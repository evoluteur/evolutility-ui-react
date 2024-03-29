/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2023 Olivier Giulieri
*/

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import pkg from "../../../package.json";
import { pixPath } from "utils/format";
import { modelsArray } from "utils/moMa";
import ModelLinks from "components/views/comfort/ModelLinks";
import Gallery from "./Gallery";

import "./Home.scss";

const logoPath = pixPath + "logos/";
const orgIcons = [];
const musicIcons = [];

modelsArray.forEach((m) => {
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
          <span className="evol">Evol</span>
          <span className="utility">utility</span>
          <span className="rest">-UI-</span>
          <span className="ns">
            <span className="rest">React</span>{" "}
            <span className="version">v{pkg.version}</span>
          </span>
        </h1>
        <h2 className="tBlue text-center">
          Toolkit to build modern CRUD SPAs with models rather than code
        </h2>
      </section>
      <section>
        <div>
          Evolutility provides{" "}
          <strong>
            a set of <Link to="docs/views">model-driven Views</Link>
          </strong>{" "}
          (Overview, List, Cards, Browse, Edit, Dashboard...) and a minimalist{" "}
          <strong>
            <Link to="docs/metamodel">metamodel</Link>
          </strong>{" "}
          (model structure) to define UI models. With it you can easily build
          modern CRUD UIs for GraphQL without writing any code.
        </div>

        <Gallery />

        <div>With Evolutility, you get React UIs like these examples:</div>
        <div className="home-demos">
          <ModelLinks />
        </div>
        <div>
          ... simply by making models like these{" "}
          <Link to="docs/models">sample models</Link>.
        </div>
        <div>
          <br />
          For each application, all views, form validation, and GraphQL queries
          are generated at run-time from a single model. No hand-coding
          necessary!
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
          <img src={logoPath + "hasura.png"} alt="Hasura" />
        </a>
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
    </div>
  );
};

export default Home;
