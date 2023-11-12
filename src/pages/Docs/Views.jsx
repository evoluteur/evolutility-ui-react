/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import { pixPath } from "utils/format";
import { viewDoc } from "./docMetadata";
import Icon from "react-crud-icons";

import "./Doc.scss";
import "./Views.scss";

const view = (v) => (
  <div key={v.id}>
    <div className="anchor">
      <a id={v.name} name={v.name}></a>
    </div>
    <div className="doc-view">
      <h3>
        {<Icon name={v.icon || v.id} theme="none" size="medium" />}
        {v.name}
      </h3>
      <p>{v.description}</p>
      <div>Route: "{v.route}"</div>
      <br />
      <div className="figure">
        <img
          src={`${pixPath}screenshots/${v.img}`}
          alt={v.name}
          className="shadowpix"
        />
      </div>
    </div>
  </div>
);

const viewsSet = (fam) => {
  const vs = viewDoc[fam];
  return <>{vs.map((v) => view(v, fam))}</>;
};

const Views = () => {
  useEffect(() => {
    document.title = "Doc > Views";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="evo-doc-views">
      <h1>Views</h1>
      <p>Evolutility-UI-React provides different types of view:</p>

      <p>
        For any object, a single model defines UI elements across views in a
        simple declarative way.
      </p>

      <section>
        <h3>
          Views for <strong>One</strong> object
        </h3>
        {viewsSet("one")}
      </section>

      <section>
        <h3>
          Views for <strong>Many</strong> objects
        </h3>
        {viewsSet("many")}
      </section>

      <section>
        <h3>"Comfort" Views</h3>
        {viewsSet("comfort")}
      </section>
    </div>
  );
};

export default Views;
