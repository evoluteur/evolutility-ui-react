import React from "react";
import { Link } from "react-router-dom";

import "./Designer.scss";

const ghLink = (key2) =>
  // key2 example "organizer/todo"
  `https://github.com/evoluteur/evolutility-models/blob/master/models/${key2}.js`;

const Designer = () => (
  <div className="evo-designer">
    <h1>Evolutility Designer</h1>

    <p>Models can be stored in the database or in JSON.</p>

    <div className="row-2-cols">
      <div>
        <h3>Models in the DB</h3>

        <p>
          The App Designer is simply an app to manage Objects and Fields in apps
          models (treating metadata like data).
        </p>
        <div className="row-2-cols">
          <ul className="evo-links">
            <li>
              <Link to="/object/list">Objects</Link>
            </li>
            <li>
              <Link to="/field/list">Fields</Link>
            </li>
            <li>
              <Link to="/collection/list">Collections</Link>
            </li>
          </ul>
          <ul className="evo-links">
            <li>
              <Link to="/object/browse/1">To-Do list</Link>
            </li>
            <li>
              <Link to="/object/browse/2">Address book</Link>
            </li>
            <li>
              <Link to="/object/browse/4">Restaurant</Link>
            </li>
            <li>
              <Link to="/object/browse/3">Graphic novels</Link>
            </li>
            <li>
              <Link to="/object/browse/5">Wine cellar</Link>
            </li>
            <li>
              <Link to="/object/browse/6">Wine tasting</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h3>Models in JSON files</h3>

        <p>
          Models are stored with the code. The demos get their models from JSON
          files.
        </p>
        <ul className="evo-links">
          <li>
            <a
              target="todo"
              className="extlink"
              href={ghLink("organizer/todo")}
            >
              To-Do list
            </a>
          </li>
          <li>
            <a
              target="contact"
              className="extlink"
              href={ghLink("organizer/contact")}
            >
              Address book
            </a>
          </li>
          <li>
            <a
              target="resto"
              className="extlink"
              href={ghLink("organizer/restaurant")}
            >
              Restaurants
            </a>
          </li>
          <li>
            <a
              target="gn"
              className="extlink"
              href={ghLink("organizer/comics")}
            >
              Graphic novels
            </a>
          </li>
          <li>
            <a
              target="wnc"
              className="extlink"
              href={ghLink("organizer/winecellar")}
            >
              Wine cellar
            </a>
          </li>
          <li>
            <a
              target="wnct"
              className="extlink"
              href={ghLink("organizer/winetasting")}
            >
              Wine tasting
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Designer;
