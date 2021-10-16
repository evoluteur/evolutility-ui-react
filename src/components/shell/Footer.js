import React from "react";
// import { Link } from "react-router-dom";
import { version, copyright } from "../../../package.json";

import "./Footer.scss";

const Footer = () => (
  <div className="Footer" role="contentinfo">
    <a
      className="copyright"
      target="ui"
      rel="noopener noreferrer"
      href="https://github.com/evoluteur/evolutility-ui-react"
    >
      <span>Evolutility-UI-React v{version}</span>
    </a>
    <div>
      &copy; {copyright.substring(4, 9)}
      <a href="https://evoluteur.github.io/" target="og">
        Olivier Giulieri
      </a>
    </div>
  </div>
);
/*
            <div className="Footer-links">
            	Evolutility{' = '}
            	<a target="m" rel="noopener noreferrer" href="https://github.com/evoluteur/evolutility-models">Models</a>
                {' + '}
            	<a target="ui" rel="noopener noreferrer" href="https://github.com/evoluteur/evolutility-ui-react">UI</a>
                {' + '}
            	<a target="db" rel="noopener noreferrer" href="https://github.com/evoluteur/evolutility-server-node">Server</a>
            </div>

    */

export default Footer;
