/*
  Evolutility-UI-React
  https://github.com/evoluteur/evolutility-ui-react
  (c) 2022 Olivier Giulieri
*/

import React, { useEffect } from "react";
import pkg from "../../../../package.json";
import Views from "./Views";

import "./Doc.scss";

const Doc = () => {
  useEffect(() => {
    document.title = "Evolutility";
    window.scrollTo(0, 0);
  });

  return (
    <div className="evo-doc">
      <h1>Documentation</h1>
      <p>Version {pkg?.version}</p>
      <section>
        <div
          id="evolutility-ui-react-github-license-npm-version"
          className="mit-npm"
        >
          <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/LICENSE">
            <img
              src="https://img.shields.io/github/license/evoluteur/evolutility-ui-react"
              alt="GitHub license"
            />
          </a>{" "}
          <a href="https://www.npmjs.com/package/evolutility-ui-react">
            <img
              src="https://img.shields.io/npm/v/evolutility-ui-react"
              alt="npm version"
            />
          </a>
        </div>
        <p>
          Evolutility-UI-React is a set of <strong>model-driven views</strong>{" "}
          to <a href="#Browse">Browse</a>, <a href="#Edit">Edit</a>,{" "}
          <a href="#List">List</a>, <a href="#Cards">Cards</a>,{" "}
          <a href="#Charts">Charts</a>, and <a href="#Stats">Stats</a>.
        </p>
        <p>
          With it you can easily build CRUD applications by writing models
          rather than code.
        </p>
        <p>
          It uses graphQL with <a href="https://hasura.io">Hasura</a>.
        </p>
        <h3 id="table-of-contents">Table of Contents</h3>
        <ol style={{ "list-style-type": "decimal" }}>
          <li>
            <a href="#Installation">Installation</a>
          </li>
          <li>
            <a href="#Configuration">Configuration</a>
          </li>
          <li>
            <a href="#Views">Views</a>: <a href="#ViewsOne">One</a> -{" "}
            <a href="#ViewsMany">Many</a>
          </li>
          <li>
            <a href="#Models">Models</a>
          </li>
          <li>
            <a href="#Backend">Backend</a>
          </li>
          <li>
            <a href="#License">License</a>
          </li>
        </ol>
        <p>
          <a name="Installation"></a>
          <h2>Installation</h2>
        </p>
        <p>
          <a href="https://github.com/evoluteur/evolutility-ui-react/archive/master.zip">
            <strong>Download</strong>
          </a>{" "}
          or <strong>clone</strong> from{" "}
          <a href="https://github.com/evoluteur/evolutility-ui-react/">
            GitHub
          </a>
          .
        </p>
        <pre className="sourceCode bash">
          <code className="sourceCode bash">
            <span className="co">
              # To get the latest stable version, use git from the command line.
            </span>
            <span className="kw">git</span> clone
            https://github.com/evoluteur/evolutility-ui-react
          </code>
        </pre>
        <p>
          or use the{" "}
          <a href="https://www.npmjs.com/package/evolutility-ui-react">
            npm package
          </a>
          :
        </p>
        <pre className="sourceCode bash">
          <code className="sourceCode bash">
            <span className="co">
              # To get the latest stable version, use npm from the command line.
            </span>
            <span className="kw">npm</span> install evolutility-ui-react
          </code>
        </pre>
        <p>
          In the Evolutility-UI-React directory, use the command line to type
          the following:
        </p>
        <pre className="sourceCode bash">
          <code className="sourceCode bash">
            <span className="co"># Install dependencies</span>
            <span className="kw">npm</span> install
            <span className="co"># Run the node.js server</span>
            <span className="kw">npm</span> start
          </code>
        </pre>
        <p>
          In a web browser, go to the url{" "}
          <a href="http://localhost:3000/">http://localhost:3000/</a>.
        </p>
        <p>
          For the REST endpoints, you also need to install and run{" "}
          <a href="https://github.com/evoluteur/evolutility-server-node">
            Evolutility-Server-Node
          </a>{" "}
          which provides the matching REST endpoints based on the same metadata.
        </p>
        <p>
          <a name="Configuration"></a>
        </p>
        <h2>Configuration</h2>
        <p>
          Configurations options are specified in the file{" "}
          <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/config.js">
            /src/config.js
          </a>
          . They apply to all apps (app specific options are specified in
          models).
        </p>
        <table className="table table-hover main">
          <thead>
            <tr className="header">
              <th align="left">Option</th>
              <th align="left">Description</th>
              <th align="left">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd">
              <td align="left">apiPath</td>
              <td align="left">
                Path to REST API (can use &quot;proxy&quot; from package.json).
              </td>
              <td align="left">&quot;http://localhost:2000/api/v1/&quot;</td>
            </tr>
            <tr className="even">
              <td align="left">apiPathGraphQL</td>
              <td align="left">Path to GraphQL API.</td>
              <td align="left">
                &quot;https://localhost:2000/v1/graphql&quot;
              </td>
            </tr>
            <tr className="odd">
              <td align="left">apiType</td>
              <td align="left">Type of API.</td>
              <td align="left">&quot;rest&quot; or &quot;graphql&quot;</td>
            </tr>
            <tr className="even">
              <td align="left">filesUrl</td>
              <td align="left">Path to upload files to.</td>
              <td align="left">&quot;http://localhost:3000/pix/&quot;</td>
            </tr>
            <tr className="odd">
              <td align="left">pageSize</td>
              <td align="left">Page size in pagination.</td>
              <td align="left">50</td>
            </tr>
            <tr className="even">
              <td align="left">locale</td>
              <td align="left">Date format (no translation yet).</td>
              <td align="left">en/fr</td>
            </tr>
            <tr className="odd">
              <td align="left">queryModels</td>
              <td align="left">
                Get models from JSON files or from the database through the API.
              </td>
            </tr>
            <tr className="even">
              <td align="left">wTimestamp</td>
              <td align="left">
                Add timestamp columns u_date and c_date to track record creation
                and update times.
              </td>
              <td align="left">true</td>
            </tr>
          </tbody>
        </table>
        <Views />
        <p>
          <a name="Models"></a>
        </p>{" "}
        <h2>Models</h2>
        <p>
          Each model describe an object and its list of fields. A single model
          is used for all views (Browse, Edit, List, Cards...).
        </p>
        <p>
          For any object, all UI views (List, Cards, Edit, Charts...) share the
          same model. All Fields are present in the Edit and Browse views.
          Fields can be flagged with &quot;inMany&quot; to be included in the
          List and Cards views, or &quot;noCharts&quot; and &quot;noStats&quot;
          to be excluded from the Charts or Stats views.
        </p>
        <h3 id="object">Object</h3>
        <table className="table table-hover main">
          <thead>
            <tr className="header">
              <th align="left">Property</th>
              <th align="left">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd">
              <td align="left">id</td>
              <td align="left">
                Unique key to identify the entity (used in route and as API
                parameter).
              </td>
            </tr>
            <tr className="even">
              <td align="left">qid</td>
              <td align="left">
                Entity ID used in GraphQL (may be different from id in route).
              </td>
            </tr>
            <tr className="odd">
              <td align="left">icon</td>
              <td align="left">
                Icon file name for the entity (example: &quot;cube.gif&quot;).
              </td>
            </tr>
            <tr className="even">
              <td align="left">name</td>
              <td align="left">Object name (singular).</td>
            </tr>
            <tr className="odd">
              <td align="left">namePlural</td>
              <td align="left">Object name (plural).</td>
            </tr>
            <tr className="even">
              <td align="left">title</td>
              <td align="left">Application name.</td>
            </tr>
            <tr className="odd">
              <td align="left">fields</td>
              <td align="left">
                Array of <a href="#Field">Fields</a>.
              </td>
            </tr>
            <tr className="even">
              <td align="left">groups</td>
              <td align="left">
                Array of <a href="#Group">Groups</a>. If not provided a single
                group will be used.
              </td>
            </tr>
            <tr className="odd">
              <td align="left">collections</td>
              <td align="left">
                Array of <a href="#Collection">Collections</a>.
              </td>
            </tr>
            <tr className="even">
              <td align="left">titleField</td>
              <td align="left">
                Field id for the column value used as record title. titleField
                can also be a function.
              </td>
            </tr>
            <tr className="odd">
              <td align="left">defaultViewOne</td>
              <td align="left">
                To have List and Cards link to Edit instead of Browse, set
                defaultViewOne=&quot;edit&quot;.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <a name="Field"></a> <h3>Field</h3>
        </p>
        <p>Objects have fields.</p>
        <table className="table table-hover main">
          <thead>
            <tr>
              <th>Property</th>
              <th>Meaning</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>id</td>
              <td>
                Unique key for the field (can be the same as column but doesn't
                have to be).
              </td>
            </tr>
            <tr>
              <td>type</td>
              <td>
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
              </td>
            </tr>
            <tr>
              <td>label</td>
              <td>
                Field description (displayed with an asterisk for required
                fields).
              </td>
            </tr>
            <tr>
              <td>labelShort</td>
              <td>
                Optional shorter version of the labels (used in List and Cards
                views).
              </td>
            </tr>
            <tr>
              <td>required</td>
              <td>Determines if the field is required for saving.</td>
            </tr>
            <tr>
              <td>readOnly</td>
              <td>If set to true, the field value cannot be changed.</td>
            </tr>
            <tr>
              <td>defaultValue </td>
              <td> Default field value for new records.</td>
            </tr>
            <tr>
              <td>max, min</td>
              <td>
                Maximum/Minimum value allowed (only applies to numeric fields).
              </td>
            </tr>
            <tr>
              <td>maxLength, minLength</td>
              <td>
                Maximum/Minimum length allowed (only applies to text fields).
              </td>
            </tr>
            <tr>
              <td> lovIcon</td>
              <td>Set to True to include icon with LOV items.</td>
            </tr>
            <tr>
              <td>object</td>
              <td>
                Model id for the object to link to (only for fields of
                &quot;lov&quot; type).
              </td>
            </tr>
            <tr>
              <td>inMany</td>
              <td>
                Determines if the field is present (by default) in lists of
                records.
              </td>
            </tr>
            <tr>
              <td>height</td>
              <td>
                For fields of type &quot;textmultiline&quot;, number of lines
                used in the field (in Browse and Edit views).
              </td>
            </tr>
            <tr>
              <td>width</td>
              <td>
                Field width in Browse and Edit views (in percent of parent
                width).
              </td>
            </tr>
            <tr>
              <td> help</td>
              <td>Optional help on the field.</td>
            </tr>
            <tr>
              <td> chartType</td>
              <td>
                Default charts type used for the field (&quot;Bars&quot;,
                &quot;Pie&quot;, or &quot;Table&quot;). &quot;Bars&quot; is used
                if not specified.
              </td>
            </tr>
            <tr>
              <td>noCharts</td>
              <td>
                Exclude field from charts (only applies to fields of type
                integer, decimal, money, boolean, list of values which are
                &quot;chartable&quot;).
              </td>
            </tr>
            <tr>
              <td> noStats</td>
              <td>Exclude field from Stats.</td>
            </tr>
            <tr>
              <td>unique</td>
              <td>Requires value to be unique (not implemented yet).</td>
            </tr>
          </tbody>
        </table>
        <p>
          <a name="Group"></a>
        </p>
        <h3>Group</h3>
        <p>
          Groups are used to separate Fields into panels in the Edit and Browse
          views.
        </p>
        <table className="table table-hover main">
          <thead>
            <tr className="header">
              <th align="left">Property</th>
              <th align="left">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd">
              <td align="left">id</td>
              <td align="left">Unique key for the group. It is optional.</td>
            </tr>
            <tr className="even">
              <td align="left">type</td>
              <td align="left">
                Type of fields group. Only &quot;panel&quot; is currently
                supported (tab and other types of groups will be added later).
              </td>
            </tr>
            <tr className="odd">
              <td align="left">label</td>
              <td align="left">Group title displayed in the group header.</td>
            </tr>
            <tr className="even">
              <td align="left">fields</td>
              <td align="left">Array of field ids.</td>
            </tr>
            <tr className="odd">
              <td align="left">width</td>
              <td align="left">Width (in % of the container total width).</td>
            </tr>
            <tr className="even">
              <td align="left">header</td>
              <td align="left">
                Text to be displayed at the top of the group (just below the
                group title).
              </td>
            </tr>
            <tr className="odd">
              <td align="left">footer</td>
              <td align="left">
                Text to be displayed at the bottom of the group.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Notes: - Groups are optional. By default a single group holds all
          fields. - Groups are positioned based on their &quot;width&quot;
          property the same way than fields are positioned inside groups.
        </p>
        <p>
          <a name="Collection"></a> <h3>Collection</h3>
        </p>
        <p>
          Multiple details tables can be specified with &quot;collections&quot;.
        </p>
        <table className="table table-hover main">
          <thead>
            <tr className="header">
              <th align="left">Property</th>
              <th align="left">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd">
              <td align="left">id</td>
              <td align="left">Unique key for the collection.</td>
            </tr>
            <tr className="even">
              <td align="left">title</td>
              <td align="left">Collection title.</td>
            </tr>
            <tr className="odd">
              <td align="left">object</td>
              <td align="left">Model.id for the Object to link to.</td>
            </tr>
            <tr className="even">
              <td align="left">fields</td>
              <td align="left">
                Array of fields (objects or ids). Fields in collections can be
                field objects or just ids of fields in the collection's object.
              </td>
            </tr>
            <tr className="odd">
              <td align="left">header</td>
              <td align="left">Text to be displayed before the collection.</td>
            </tr>
            <tr className="even">
              <td align="left">footer</td>
              <td align="left">Text to be displayed after the collection.</td>
            </tr>
          </tbody>
        </table>
        <p>
          Sample model using collections:{" "}
          <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/organizer/winecellar.js">
            Wine Cellar
          </a>
          .
        </p>
        <h3 id="sample-model">Sample model</h3>
        <p>
          The following example is the model for a simple graphic novels
          inventory app.
        </p>
        <pre className="sourceCode javascript">
          <code className="sourceCode javascript">
            <span className="ot">module</span>.
            <span className="fu">exports</span> = &rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;comics&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Graphic Novels&quot;</span>,
            <span className="dt">name</span>:{" "}
            <span className="st">&quot;graphic novel serie&quot;</span>,
            <span className="dt">namePlural</span>:{" "}
            <span className="st">&quot;graphic novel series&quot;</span>,
            <span className="dt">icon</span>:{" "}
            <span className="st">&quot;comics.png&quot;</span>,
            <span className="dt">titleField</span>:{" "}
            <span className="st">&quot;title&quot;</span>,
            <span className="dt">fields</span>:[ &rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;title&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;text&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Title&quot;</span>,
            <span className="dt">required</span>:{" "}
            <span className="kw">true</span>,{" "}
            <span className="dt">maxLength</span>:{" "}
            <span className="dv">255</span>,<span className="dt">width</span>:{" "}
            <span className="dv">100</span>, <span className="dt">inMany</span>:{" "}
            <span className="kw">true</span>
            ,&lbrace;, &rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;authors&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;text&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Authors&quot;</span>,
            <span className="dt">inMany</span>: <span className="kw">true</span>
            , <span className="dt">width</span>: <span className="dv">62</span>
            ,&lbrace;, &rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;genre&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;lov&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Genre&quot;</span>,
            <span className="dt">width</span>: <span className="dv">38</span>,{" "}
            <span className="dt">inMany</span>: <span className="kw">true</span>
            ,<span className="dt">list</span>: [&rbrace;
            <span className="dt">id</span>: <span className="dv">1</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Adventure&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">2</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Fairy tale&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">3</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Erotic&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">4</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Fantastic&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">5</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Heroic Fantasy&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">6</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Historic&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">7</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Humor&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">8</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;One of a kind&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">9</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Youth&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">10</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Thriller&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">11</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Science-fiction&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">12</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Super Heros&quot;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">13</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&quot;Western&quot;</span>
            &lbrace; ]&lbrace;,&rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;serie_nb&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;integer&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Albums&quot;</span>,{" "}
            <span className="dt">noCharts</span>:{" "}
            <span className="kw">true</span>,<span className="dt">width</span>:{" "}
            <span className="dv">15</span>, <span className="dt">inMany</span>:{" "}
            <span className="kw">false</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;have_nb&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;integer&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Owned&quot;</span>,
            <span className="dt">width</span>: <span className="dv">15</span>,{" "}
            <span className="dt">inMany</span>:{" "}
            <span className="kw">false</span>,{" "}
            <span className="dt">noCharts</span>:{" "}
            <span className="kw">true</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;have&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;text&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Have&quot;</span>,
            <span className="dt">width</span>: <span className="dv">15</span>,{" "}
            <span className="dt">inMany</span>:{" "}
            <span className="kw">false</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;language&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;lov&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Language&quot;</span>,
            <span className="dt">width</span>: <span className="dv">17</span>,{" "}
            <span className="dt">inMany</span>: <span className="kw">true</span>
            ,<span className="dt">lovIcon</span>:{" "}
            <span className="kw">true</span>,<span className="dt">list</span>:
            [&rbrace;
            <span className="dt">id</span>: <span className="dv">2</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&#39;French&#39;</span>,{" "}
            <span className="dt">icon</span>:
            <span className="st">&#39;comics/flags/fr.png&#39;</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>: <span className="dv">1</span>,{" "}
            <span className="dt">text</span>:{" "}
            <span className="st">&#39;American&#39;</span>,{" "}
            <span className="dt">icon</span>:
            <span className="st">&#39;comics/flags/us.png&#39;</span>
            {"}"}
            ]&lbrace;, &rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;complete&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;boolean&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Complete&quot;</span>,
            <span className="dt">width</span>: <span className="dv">19</span>,{" "}
            <span className="dt">inMany</span>:{" "}
            <span className="kw">false</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;finished&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;boolean&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Finished&quot;</span>,
            <span className="dt">width</span>: <span className="dv">19</span>,{" "}
            <span className="dt">inMany</span>:{" "}
            <span className="kw">false</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;pix&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;image&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Cover&quot;</span>,
            <span className="dt">width</span>: <span className="dv">30</span>,{" "}
            <span className="dt">inMany</span>: <span className="kw">true</span>
            &lbrace;,&rbrace;
            <span className="dt">id</span>:{" "}
            <span className="st">&quot;notes&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;textmultiline&quot;</span>,
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Notes&quot;</span>,
            <span className="dt">width</span>: <span className="dv">70</span>,{" "}
            <span className="dt">height</span>: <span className="dv">7</span>,{" "}
            <span className="dt">maxLength</span>:{" "}
            <span className="dv">5000</span>,<span className="dt">inMany</span>:{" "}
            <span className="kw">false</span>
            {"}"} ],
            <span className="dt">groups</span>: [&rbrace;
            <span className="dt">id</span>:
            <span className="st">&quot;serie&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;panel&quot;</span>,{" "}
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Serie&quot;</span>,{" "}
            <span className="dt">width</span>: <span className="dv">70</span>,
            <span className="dt">fields</span>: [
            <span className="st">&quot;title&quot;</span>,{" "}
            <span className="st">&quot;authors&quot;</span>,{" "}
            <span className="st">&quot;genre&quot;</span>,
            <span className="st">&quot;serie_nb&quot;</span>,{" "}
            <span className="st">&quot;have_nb&quot;</span>,{" "}
            <span className="st">&quot;have&quot;</span>,
            <span className="st">&quot;language&quot;</span>,{" "}
            <span className="st">&quot;complete&quot;</span>,{" "}
            <span className="st">&quot;finished&quot;</span>,{" "}
            <span className="st">&quot;notes&quot;</span>]&lbrace;,&rbrace;
            <span className="dt">id</span>:
            <span className="st">&quot;pix&quot;</span>,{" "}
            <span className="dt">type</span>:{" "}
            <span className="st">&quot;panel&quot;</span>,{" "}
            <span className="dt">label</span>:{" "}
            <span className="st">&quot;Cover&quot;</span>,{" "}
            <span className="dt">width</span>: <span className="dv">30</span>,
            <span className="dt">fields</span>: [
            <span className="st">&quot;pix&quot;</span>]&rbrace;] {"}"}
          </code>
        </pre>
        <p>
          More sample models:{" "}
          <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/organizer/todo.js">
            To-do list
          </a>
          ,{" "}
          <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/organizer/contact.js">
            Address book
          </a>
          ,{" "}
          <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/organizer/restaurant.js">
            Restaurants list
          </a>
          ,{" "}
          <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/models/organizer/winecellar.js">
            Wine cellar
          </a>
          .
        </p>
        <p>
          <a name="Backend"></a>
        </p>{" "}
        <h2>Evolutility backend</h2>
        <p>
          <a href="https://github.com/evoluteur/evolutility-server-node">
            Evolutility-Server-Node
          </a>{" "}
          provides REST or GraphQL end-points for Evolutility-UI-React using the
          same models.
        </p>
        <p>
          <a name="License"></a>
        </p>
        <h2>License</h2>
        <p>
          Copyright (c) 2022{" "}
          <a href="https://evoluteur.github.io/">Olivier Giulieri</a>.
        </p>
        <p>
          Evolutility-UI-React is released under the{" "}
          <a href="http://github.com/evoluteur/evolutility-ui-react/blob/master/LICENSE">
            MIT license
          </a>
          .
        </p>
        <p>
          To suggest a feature or report a bug:{" "}
          <a href="https://github.com/evoluteur/evolutility-ui-react/issues">
            https://github.com/evoluteur/evolutility-ui-react/issues
          </a>
        </p>
      </section>
    </div>
  );
};

export default Doc;
