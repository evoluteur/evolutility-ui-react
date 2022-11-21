/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
const Views = () => (
  <>
    <div>
      <a name="Views"></a>
    </div>
    <h2>Views</h2>
    <div>
      For any object, a single model defines UI elements across views in a
      simple declarative way.
    </div>
    <div>Evolutility-UI-React provides different types of view:</div>
    <ul>
      <li>
        Views for One - a single record: <a href="#Browse">Browse</a>,{" "}
        <a href="#Edit">Edit</a>.
      </li>
      <li>
        Views for Many - a collection of records: <a href="#List">List</a>,{" "}
        <a href="#Cards">Cards</a>, <a href="#Charts">Charts</a>,{" "}
        <a href="#Stats">Stats</a>.
      </li>
    </ul>
    <div>
      Evolutility can be configured to use REST (using{" "}
      <a href="https://github.com/evoluteur/evolutility-server-node">
        Evolutility-Server-Node
      </a>
      ) or GraphQL (using <a href="https://hasura.io">Hasura</a>).
    </div>
    <div>
      Notes: Views for actions (search, filter, export) will come later.
    </div>
    <div>
      <a name="ViewsOne"></a>
    </div>
    <h2>Views for One object</h2>
    <div>
      <a href="#Browse">Browse</a> - <a href="#Edit">Edit</a>
    </div>
    <div>
      <a name="Browse"></a> <h3>Browse</h3>Shows all fields for viewing (read
      only). Fields are grouped in panels.
    </div>
    <div className="figure">
      <img src="screenshots/comics/one-browse.gif" alt="Browse" />
      <div className="caption">Browse</div>
    </div>
    <div>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/components/views/one/Browse.js">
        /src/components/views/one/Browse.js
      </a>
    </div>
    <div>
      View:{" "}
      <a href="http://localhost:3000/comics/browse/14">
        http://localhost:3000/comics/browse/14"&rbrace;
      </a>
    </div>
    <div>
      <a name="Edit"></a> <h3>Edit</h3> This view shows all fields for edition
      to create or update records. It automatically performs validation based on
      the model. Fields are grouped in panels and tabs.
    </div>
    <div className="figure">
      <img src="screenshots/comics/one-edit.gif" alt="Edit" />
      <div className="caption">Edit</div>
    </div>
    <div>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/components/views/one/Edit.js">
        /src/components/views/one/Edit.js
      </a>
    </div>
    <div>
      View:{" "}
      <a href="http://localhost:3000/comics/edit/14">
        http://localhost:3000/comics/edit/{"{id}"}
      </a>
    </div>
    <div>
      <a name="ViewsMany"></a>
    </div>{" "}
    <h2>Views for Many objects</h2>
    <div>
      <a href="#List">List</a> - <a href="#Cards">Cards</a> -{" "}
      <a href="#Charts">Charts</a> - <a href="#Stats">Stats</a>
    </div>
    <div>
      <a name="List"></a> <h3>List</h3> Gives a tabular view of a collection.
    </div>
    <div className="figure">
      <img src="screenshots/comics/many-list.gif" alt="List" />
      <div className="caption">List</div>
    </div>
    <div>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/components/views/many/List.js">
        /src/components/views/many/List.js
      </a>
    </div>
    <div>
      View:{" "}
      <a href="http://localhost:3000/comics/list">
        http://localhost:3000/comics/list
      </a>
    </div>
    <div>
      <a name="Cards"></a> <h3>Cards</h3> Shows records side by side as cards.
    </div>
    <div className="figure">
      <img src="screenshots/comics/many-cards.gif" alt="Cards" />
      <div className="caption">Cards</div>
    </div>
    <div>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/components/views/many/Cards.js">
        /src/components/views/many/Cards.js
      </a>
    </div>
    <div>
      View:{" "}
      <a href="http://localhost:3000/comics/cards">
        http://localhost:3000/comics/cards
      </a>
    </div>
    <div>
      <a name="Charts"></a> <h3>Charts</h3> Draws charts about the collection.
      Currently bars and pie charts are implemented, a list with count and
      percentages is also available. Only provided for fields of types like
      boolean, lov, integer, decimal, date... (not text or textmultilines).
    </div>
    <div className="figure">
      <img src="screenshots/comics/many-charts.gif" alt="Charts" />
      <div className="caption">Charts</div>
    </div>
    <div>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/components/views/charts/Charts.js">
        /src/components/views/charts/Charts.js
      </a>
    </div>
    <div>
      View:{" "}
      <a href="http://localhost:3000/comics/charts">
        http://localhost:3000/comics/charts
      </a>
    </div>
    <div>
      Note: The &quot;Charts&quot; view is currently only implemented for REST,
      not available with GraphQL yet.
    </div>
    <div>
      <a name="Stats"></a> <h3>Stats</h3> Display last update, number of updates
      in the last week, and for numeric fields the min, max, count, average.
    </div>
    <div className="figure">
      <img src="screenshots/comics/many-stats.gif" alt="Stats" />
      <div className="caption">Stats</div>
    </div>
    <div>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/main/src/components/views/many/Stats.js">
        /src/components/views/many/Stats.js
      </a>
    </div>
    <div>
      View:{" "}
      <a href="http://localhost:3000/comics/stats">
        http://localhost:3000/comics/stats
      </a>
    </div>
    <div>
      <a name="ViewsDoc"></a>
    </div>
  </>
);

export default Views;
