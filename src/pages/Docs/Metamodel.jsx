/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2023 Olivier Giulieri
*/

import React, { useEffect } from "react";
import metadoc from "./docMetadata";

import "./Doc.scss";

const propsTable = (props) => (
  <table className="table">
    <thead>
      <tr className="header">
        <th>Property</th>
        <th>Meaning</th>
      </tr>
    </thead>
    <tbody>{props.map(obj)}</tbody>
  </table>
);

const obj = (m) => (
  <tr key={m.id}>
    <td>{m.id}</td>
    <td dangerouslySetInnerHTML={{ __html: m.description }}></td>
  </tr>
);

const section = (info, intro, footer) => (
  <section>
    <div className="anchor">
      <a name={info.title.replaceAll(" ", "_")}></a>
    </div>
    <h2>{info.title}</h2>
    {intro && <div className="m-intro">{intro}</div>}
    {propsTable(info.props)}
    {footer && <div className="m-footer">{footer}</div>}
  </section>
);

const Metamodel = () => {
  useEffect(() => {
    document.title = "Metamodel";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="evo-doc-metamodel">
      <h1>Metamodel</h1>

      <p>
        The metamodel (model of models) is the language to describe application
        models.
      </p>
      <p>
        Each model describe an object and its list of fields with enough UI
        metadata to render all views of that object.
      </p>
      <p>
        For any object, all UI views (Browse, Edit, List, Cards, Charts...)
        share the same model. All Fields are present in the Edit and Browse
        views. Fields can be flagged with &quot;inMany&quot; to be included in
        the List and Cards views, or &quot;noCharts&quot; and
        &quot;noStats&quot; to be excluded from the Charts or Stats views.
      </p>

      {section(metadoc.objectMeta)}

      {section(
        metadoc.fieldMeta,
        <p>
          Objects have fields (or properties). Fields are displayed as form
          fields in Edit view, text in Browse view, and as columns in List view.
        </p>
      )}

      {section(
        metadoc.fieldGroupMeta,
        <p>
          Groups are used to separate Fields into panels in the Edit and Browse
          views.
        </p>,
        <p>
          Notes: Groups are optional. By default a single group holds all
          fields. Groups are positioned based on their &quot;width&quot;
          property the same way than fields are positioned inside groups.
        </p>
      )}

      {section(
        metadoc.collecMeta,
        <p>
          Multiple details tables can be specified with &quot;collections&quot;.
        </p>,
        <p>
          Sample model using collections:{" "}
          <a
            target="wcm"
            rel="noopener noreferrer"
            href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/models/organizer/winecellar.js"
          >
            Wine Cellar
          </a>
          .
        </p>
      )}
    </div>
  );
};

export default Metamodel;
