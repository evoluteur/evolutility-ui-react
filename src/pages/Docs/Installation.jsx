/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

import "./Doc.scss";

const Installation = () => (
  <div className="evo-doc-setup">
    <h1>Installation</h1>
    <p>
      <a href="https://github.com/evoluteur/evolutility-ui-react/archive/master.zip">
        <strong>Download</strong>
      </a>{" "}
      or <strong>clone</strong> from{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/">GitHub</a>.
    </p>
    <p>To get the latest stable version, use git from the command line.</p>
    <div className="code">
      git clone https://github.com/evoluteur/evolutility-ui-react
    </div>

    <p>
      or use the{" "}
      <a href="https://www.npmjs.com/package/evolutility-ui-react">
        npm package
      </a>
      :
    </p>
    <div className="code">npm install evolutility-ui-react</div>
    <p>
      In the Evolutility-UI-React directory, use the command line to type the
      following:
    </p>
    <div className="code">
      <div>cd evolutility-ui-react</div>
      <div>npm install </div>
      <div>npm run start</div>
    </div>
    <p>
      In a web browser, go to the url{" "}
      <a href="http://localhost:3000/">http://localhost:3000/</a>.
    </p>
    <h2>Backend setup</h2>
    <p>Setup Hasura, create DB, add relationships...</p>
    <p>Change the "adminSecret" in the config.js file.</p>
  </div>
);

export default Installation;
