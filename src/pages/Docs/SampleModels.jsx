/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2023 Olivier Giulieri
*/

import React, { useEffect } from "react";
import SampleModel from "./components/SampleModel";

import "./Doc.scss";

const SampleModels = () => {
  useEffect(() => {
    document.title = "Doc > Sample Models";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="evo-doc-metamodel">
      <h1>Sample Models</h1>

      <section>
        <p>Here are the models behind the demos on this site.</p>

        <SampleModel />
      </section>
    </div>
  );
};

export default SampleModels;
