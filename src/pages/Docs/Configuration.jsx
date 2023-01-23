/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import configOptions from "./docConfig";

import "./Doc.scss";

const Configuration = () => (
  <div className="evo-doc-setup">
    <h1>Configuration</h1>

    <p>
      Configurations options are specified in the file{" "}
      <a
        target="config"
        href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/config.js"
      >
        /src/config.js
      </a>
      . They apply to all apps (app specific options are specified in models).
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
          <tr>
            <td>{c.name}</td>
            <td>{c.description}</td>
            <td>{c.example}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Configuration;
