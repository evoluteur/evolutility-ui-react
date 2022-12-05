import React from "react";
import packageInfo from "../../../package.json";

import "./Footer.scss";

const { version, copyright } = packageInfo;

const Footer = () => (
  <div className="Footer" role="contentinfo">
    <div>
      <a
        className="copyright"
        target="ui"
        rel="noopener noreferrer"
        href="https://github.com/evoluteur/evolutility-ui-react"
      >
        Evolutility-UI-React v{version}
      </a>
      &nbsp; is made in California with <div className="heart">♥</div>
    </div>
    <div>
      &copy; {copyright.substring(4, 9)}
      <a
        href="https://evoluteur.github.io/"
        target="og"
        rel="noopener noreferrer"
      >
        Olivier Giulieri
      </a>
    </div>
  </div>
);

export default Footer;
