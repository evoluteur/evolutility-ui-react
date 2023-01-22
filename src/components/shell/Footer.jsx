import React from "react";
import packageInfo from "../../../package.json";

import "./Footer.scss";

const { version } = packageInfo;
const currentYear = new Date().getFullYear();

const Footer = () => (
  <div className="evo-footer" role="contentinfo">
    <div>
      <a
        className="copyright"
        target="ui"
        rel="noopener noreferrer"
        href="https://github.com/evoluteur/evolutility-ui-react"
      >
        Evolutility-UI-React
      </a>{" "}
      v{version}
      &nbsp; is made in California with <div className="heart">♥</div>
    </div>
    <div>
      &copy; {currentYear}{" "}
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
