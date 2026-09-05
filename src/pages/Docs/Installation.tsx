import { useEffect } from "react";

import "./Doc.scss";

const Installation = () => {
  useEffect(() => {
    document.title = "Doc > Installation";
    window.scrollTo(0, 0);
  });

  return (
    <div className="evo-doc-setup">
      <h1>Installation</h1>
      <p>
        <a href="https://github.com/evoluteur/evolutility-ui-react/archive/master.zip">
          <strong>Download</strong>
        </a>{" "}
        or <strong>clone</strong> Evolutility-UI-React from{" "}
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
      <p>
        You will need the REST API of{" "}
        <a
          href="https://github.com/evoluteur/evolutility-server-node"
          target="evol-server"
          rel="noopener noreferrer"
          className="extlink"
        >
          Evolutility-Server-Node
        </a>{" "}
        (Node.js, Express, and PostgreSQL) with the Evolutility demo database.
      </p>
      <ol>
        <li>
          Clone or download{" "}
          <a
            href="https://github.com/evoluteur/evolutility-server-node"
            target="evol-server"
            rel="noopener noreferrer"
            className="extlink"
          >
            evolutility-server-node
          </a>
          .
        </li>
        <li>Create a PostgreSQL database.</li>
        <li>
          In the server&apos;s ./config.ts file, set the
          &quot;connectionString&quot; and the &quot;schema&quot; to access your
          new database.
        </li>
        <li>
          In the command line, from the server directory, type the following:
          <div className="code">
            <div>npm install</div>
            <div>npm run makedb</div>
            <div>npm start</div>
          </div>
          It creates the demo tables, populates them with sample data, and runs
          the REST API on{" "}
          <a
            href="http://localhost:2000/api/v1/"
            target="api"
            rel="noopener noreferrer"
            className="extlink"
          >
            http://localhost:2000/api/v1/
          </a>
          .
        </li>
        <li>
          In Evolutility-UI-React, set the &quot;apiPath&quot; to the REST API
          url in the ./src/config.ts file.
        </li>
      </ol>
    </div>
  );
};

export default Installation;
