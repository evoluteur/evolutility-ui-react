/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import configOptions from "./docConfig";

import "./Doc.scss";

const Configuration = () => {
  useEffect(() => {
    document.title = "Doc > Configuration";
    window.scrollTo(0, 0);
  });

  return (
    <div className="evo-doc-setup">
      <h1>Configuration</h1>

      <p>
        Configurations options are specified in the{" "}
        <a
          className="extlink"
          target="config"
          rel="noopener noreferrer"
          href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/config.js"
        >
          /src/config.js
        </a>{" "}
        file. They apply to all apps (app specific options are specified in
        models).
      </p>
      <table className="table">
        <thead>
          <tr className="header">
            <th>Option</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {configOptions.map((c) => (
            <tr key={c.name}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>{c.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Configuration;
