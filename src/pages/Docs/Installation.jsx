/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";

import "./Doc.scss";

const Installation = () => (
  <div className="evo-doc-setup">
    <h1>Installation</h1>
    <p>
      <a href="https://github.com/evoluteur/evolutility-ui-react/archive/master.zip">
        <strong>Download</strong>
      </a>{" "}
      or <strong>clone</strong> Evolutility-UI-React from{" "}
      <a href="https://github.com/evoluteur/evolutility-ui-react/">GitHub</a>.
    </p>
    <p>To get the latest stable version, use git from the command line.</p>
    <div className="code">
      git clone https://github.com/evoluteur/evolutility-ui-react
    </div>
    <p>
      or use the{" "}
      <a href="https://www.npmjs.com/package/evolutility-ui-react">
        npm package
      </a>
      :
    </p>
    <div className="code">npm install evolutility-ui-react</div>
    <p>
      In the Evolutility-UI-React directory, use the command line to type the
      following:
    </p>
    <div className="code">
      <div>cd evolutility-ui-react</div>
      <div>npm install </div>
      <div>npm run start</div>
    </div>
    <p>
      In a web browser, go to the url{" "}
      <a href="http://localhost:3000/">http://localhost:3000/</a>.
    </p>
    <h2>Backend setup</h2>
    <p>
      You will need to setup the GraphQL backend on{" "}
      <a
        href="https://hasura.io"
        target="h"
        rel="noopener noreferrer"
        className="extlink"
      >
        Hasura
      </a>{" "}
      with the Evolutility demo database.
    </p>
    <ol>
      <li>
        You can signup for a{" "}
        <a
          href="https://cloud.hasura.io/signup"
          target="h"
          rel="noopener noreferrer"
          className="extlink"
        >
          free account
        </a>{" "}
        or host it yourself (
        <a
          href="https://hasura.io/docs/latest/hasura-cli/quickstart/"
          target="h"
          rel="noopener noreferrer"
          className="extlink"
        >
          Quickstart Hasura CLI
        </a>
        ).
      </li>
      <li>Create a Postgres database</li>
      <li>
        Add the demo tables by running the SQL script{" "}
        <a
          href="https://github.com/evoluteur/evolutility-ui-react/blob/main/sql/evol-db-schema.sql"
          target="sql-s"
          rel="noopener noreferrer"
          className="extlink"
        >
          evol-db-schema.sql
        </a>
        .
      </li>
      <li>
        Populate your database with sample data by running{" "}
        <a
          href="https://github.com/evoluteur/evolutility-ui-react/blob/main/sql/evol-db-data.sql"
          target="sql-d"
          rel="noopener noreferrer"
          className="extlink"
        >
          evol-db-data.sql
        </a>
      </li>
      <li>
        Add relationships in Hasura console.
        <div className="rels">
          <div>
            Relationships on <strong>comics</strong> table:
            <ul>
              <li>genre (Object): comics / genre_id -&gt; comics_genre / id</li>
              <li>
                language (Object): comics / language_id -&gt; comics_language /
                id
              </li>
            </ul>
          </div>
          <div>
            Relationships on <strong>comics_genre</strong> table:
            <ul>
              <li>comics (Array): comics_genre / id =&gt; comics / genre_id</li>
            </ul>
          </div>
          <div>
            Relationships on <strong>comics_language</strong> table:
            <ul>
              <li>
                comics (Array): comics_language / id =&gt; comics / language_id
              </li>
            </ul>
          </div>

          <div>
            Relationships on <strong>contact</strong> table:
            <ul>
              <li>
                category (Object): contact / category_id -&gt; contact_category
                / id
              </li>
            </ul>
          </div>
          <div>
            Relationships on <strong>contact_category</strong> table:
            <ul>
              <li>
                contacts (Array): contact_category / id =&gt; contact /
                category_id
              </li>
            </ul>
          </div>

          <div>
            Relationships on <strong>music_album</strong> table:
            <ul>
              <li>
                artist (Object): music_album / artist_id -&gt; music_artist / id
              </li>
              <li>
                tracks (Array): music_album / id -&gt; music_track / album_id
              </li>
            </ul>
          </div>
          <div>
            Relationships on <strong>music_artist</strong> table:
            <ul>
              <li>
                albums (Array): music_artist / id -&gt; music_album / artist_id
              </li>
            </ul>
          </div>
          <div>
            Relationships on <strong>music_genre</strong> table:
            <ul>
              <li>
                tracks (Array): music_genre / id -&gt; music_track / genre_id
              </li>
            </ul>
          </div>
          <div>
            Relationships on <strong>music_track</strong> table:
            <ul>
              <li>
                album (Object): music_track / album_id -&gt; music_album / id
              </li>
              <li>
                genre (Object): music_track / genre_id -&gt; music_genre / id
              </li>
            </ul>
          </div>
          <div>
            Relationships on <strong>restaurant</strong> table:
            <ul>
              <li>
                cuisine (Object): restaurant / cuisine_id -&gt;
                restaurant_cuisine / id
              </li>
              <li>
                price (Object): restaurant / price_id -&gt; restaurant_price /
                id
              </li>
            </ul>
          </div>

          <div>
            Relationships on <strong>restaurant_cuisine</strong> table:
            <ul>
              <li>
                restaurants (Array): restaurant_cuisine / id =&gt; restaurants /
                cuisine_id
              </li>
            </ul>
          </div>
          <div>
            Relationships on <strong>restaurant_price</strong> table:
            <ul>
              <li>
                restaurants (Array): restaurant_price / id =&gt; restaurants /
                price_id
              </li>
            </ul>
          </div>

          <div>
            Relationships on <strong>task</strong> table:
            <ul>
              <li>
                category (Object): task / category_id -&gt; task_category / id
              </li>
              <li>
                priority (Object): task / priority_id -&gt; task_priority / id
              </li>
            </ul>
          </div>
          <div>
            Relationships on <strong>task_category</strong> table:
            <ul>
              <li>
                tasks (Array): task_category / id =&gt; task / category_id
              </li>
            </ul>
          </div>

          <div>
            Relationships on <strong>task_priority</strong> table:
            <ul>
              <li>
                tasks (Array): task_priority / id =&gt; task / priority_id
              </li>
            </ul>
          </div>

          <div>
            Relationships on <strong>wine</strong> table:
            <ul>
              <li>
                wine_tastings (Array): wine / id -&gt; wine_tasting / wine_id
              </li>
              <li>bsize (Object): wine / bsize_id -&gt; wine_bsize / id</li>
              <li>
                country (Object): wine / country_id -&gt; wine_country / id
              </li>
              <li>grape (Object): wine / grape_id -&gt; wine_grape / id</li>
              <li>score (Object): wine / score_id -&gt; wine_score / id</li>
              <li>type (Object): wine / type_id -&gt; wine_type / id</li>
            </ul>
          </div>
          <div>
            Relationships on <strong>wine_bsize</strong> table:
            <ul>
              <li>wines (Array): wine_bsize / id =&gt; wine / bsize_id</li>
            </ul>
          </div>
          <div>
            Relationships on <strong>wine_country</strong> table:
            <ul>
              <li>wines (Array): wine_country / id =&gt; wine / country_id</li>
            </ul>
          </div>
          <div>
            Relationships on <strong>wine_grape</strong> table:
            <ul>
              <li>wines (Array): wine_grape / id =&gt; wine / grape_id</li>
            </ul>
          </div>
          <div>
            Relationships on <strong>wine_score</strong> table:
            <ul>
              <li>wines (Array): wine_score / id =&gt; wine / score_id</li>
            </ul>
          </div>
          <div>
            Relationships on <strong>wine_tasting</strong> table:
            <ul>
              <li>wine (Object): wine_tasting / wine_id -&gt; wine / id</li>
            </ul>
          </div>
          <div>
            Relationships on <strong>wine_type</strong> table:
            <ul>
              <li>wines (Array): wine_type / id =&gt; wine / type_id</li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        In Evolutility, change the "apiPath" and "adminSecret" in the
        ./src/config.js file.
      </li>
    </ol>
  </div>
);

export default Installation;
