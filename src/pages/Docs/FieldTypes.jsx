/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2023 Olivier Giulieri
*/

import React, { useEffect } from "react";

import "./Doc.scss";

const Doc = () => {
  useEffect(() => {
    document.title = "Evolutility";
    window.scrollTo(0, 0);
  });

  return (
    <div className="evo-doc-ftypes">
      <h1>Field types</h1>
      <section>
        <p>
          <a name="Models"></a>
        </p>
        <div>
          Field type to show in the UI. Possible field types:
          <ul>
            <li>boolean (yes/no)</li>
            <li>date</li>
            <li>datetime</li>
            <li>decimal</li>
            <li>document</li>
            <li>email</li>
            <li>image</li>
            <li>integer</li>
            <li>json</li>
            <li>lov (list of values)</li>
            <li>list (multiselect)</li>
            <li>money</li>
            <li>text</li>
            <li>textmultiline</li>
            <li>time</li>
            <li>url</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Doc;
