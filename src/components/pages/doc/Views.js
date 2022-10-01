const Views = () => (
  <>
    <p>
      <a name="Views"></a>
    </p>
    <h2>Views</h2>
    <p>
      For any object, a single model defines UI elements across views in a
      simple declarative way.
    </p>
    <p>Evolutility-UI-React provides different types of view:</p>
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
    <p>
      Evolutility can be configured to use REST (using{" "}
      <a href="https://github.com/evoluteur/evolutility-server-node">
        Evolutility-Server-Node
      </a>
      ) or GraphQL (using <a href="https://hasura.io">Hasura</a>).
    </p>
    <p>Notes: Views for actions (search, filter, export) will come later.</p>
    <p>
      <a name="ViewsOne"></a>
    </p>
    <h2>Views for One object</h2>
    <p>
      <a href="#Browse">Browse</a> - <a href="#Edit">Edit</a>
    </p>
    <p>
      <a name="Browse"></a> <h3>Browse</h3>Shows all fields for viewing (read
      only). Fields are grouped in panels.
    </p>
    <div className="figure">
      <img src="screenshots/comics/one-browse.gif" alt="Browse" />
      <p className="caption">Browse</p>
    </div>
    <p>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/one/Browse.js">
        /src/components/views/one/Browse.js
      </a>
    </p>
    <p>
      View:{" "}
      <a href="http://localhost:3000/comics/browse/14">
        http://localhost:3000/comics/browse/14"&rbrace;
      </a>
    </p>
    <p>
      <a name="Edit"></a> <h3>Edit</h3> This view shows all fields for edition
      to create or update records. It automatically performs validation based on
      the model. Fields are grouped in panels and tabs.
    </p>
    <div className="figure">
      <img src="screenshots/comics/one-edit.gif" alt="Edit" />
      <p className="caption">Edit</p>
    </div>
    <p>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/one/Edit.js">
        /src/components/views/one/Edit.js
      </a>
    </p>
    <p>
      View:{" "}
      <a href="http://localhost:3000/comics/edit/14">
        http://localhost:3000/comics/edit/{"{id}"}
      </a>
    </p>
    <p>
      <a name="ViewsMany"></a>
    </p>{" "}
    <h2>Views for Many objects</h2>
    <p>
      <a href="#List">List</a> - <a href="#Cards">Cards</a> -{" "}
      <a href="#Charts">Charts</a> - <a href="#Stats">Stats</a>
    </p>
    <p>
      <a name="List"></a> <h3>List</h3> Gives a tabular view of a collection.
    </p>
    <div className="figure">
      <img src="screenshots/comics/many-list.gif" alt="List" />
      <p className="caption">List</p>
    </div>
    <p>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/many/List.js">
        /src/components/views/many/List.js
      </a>
    </p>
    <p>
      View:{" "}
      <a href="http://localhost:3000/comics/list">
        http://localhost:3000/comics/list
      </a>
    </p>
    <p>
      <a name="Cards"></a> <h3>Cards</h3> Shows records side by side as cards.
    </p>
    <div className="figure">
      <img src="screenshots/comics/many-cards.gif" alt="Cards" />
      <p className="caption">Cards</p>
    </div>
    <p>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/many/Cards.js">
        /src/components/views/many/Cards.js
      </a>
    </p>
    <p>
      View:{" "}
      <a href="http://localhost:3000/comics/cards">
        http://localhost:3000/comics/cards
      </a>
    </p>
    <p>
      <a name="Charts"></a> <h3>Charts</h3> Draws charts about the collection.
      Currently bars and pie charts are implemented, a list with count and
      percentages is also available. Only provided for fields of types like
      boolean, lov, integer, decimal, date... (not text or textmultilines).
    </p>
    <div className="figure">
      <img src="screenshots/comics/many-charts.gif" alt="Charts" />
      <p className="caption">Charts</p>
    </div>
    <p>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/charts/Charts.js">
        /src/components/views/charts/Charts.js
      </a>
    </p>
    <p>
      View:{" "}
      <a href="http://localhost:3000/comics/charts">
        http://localhost:3000/comics/charts
      </a>
    </p>
    <p>
      Note: The &quot;Charts&quot; view is currently only implemented for REST,
      not available with GraphQL yet.
    </p>
    <p>
      <a name="Stats"></a> <h3>Stats</h3> Display last update, number of updates
      in the last week, and for numeric fields the min, max, count, average.
    </p>
    <div className="figure">
      <img src="screenshots/comics/many-stats.gif" alt="Stats" />
      <p className="caption">Stats</p>
    </div>
    <p>
      Code:{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/blob/master/src/components/views/many/Stats.js">
        /src/components/views/many/Stats.js
      </a>
    </p>
    <p>
      View:{" "}
      <a href="http://localhost:3000/comics/stats">
        http://localhost:3000/comics/stats
      </a>
    </p>
    <p>
      <a name="ViewsDoc"></a>
    </p>
  </>
);

export default Views;
