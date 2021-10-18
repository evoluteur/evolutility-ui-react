import React from "react";
import { Link } from "react-router-dom";
import DemosList from "./DemosList";
import { apiType } from "../../utils/dao";

export default class Demo extends React.PureComponent {
  componentDidMount() {
    document.title = "Evolutility";
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="evo-demo">
        <h1>Evolutility Demo</h1>

        <p>These are a few sample apps built with Evolutility.</p>

        <DemosList />

        <p>
          <br />
          These sample applications are not anything you haven't seen before.
          The interesting thing is that{" "}
          <b>these demo apps are built with models rather than code</b>... and
          you can easily make more apps simply by making new{" "}
          <a
            className="extlink"
            href="https://github.com/evoluteur/evolutility-models#evolutility-models--"
            target="models"
          >
            models
          </a>
          .
        </p>

        <p>
          The demo uses the{" "}
          <a
            href="https://graphql.org/"
            target="gql"
            rel="noopener noreferrer"
            className="extlink"
          >
            GraphQL APIs
          </a>
          {" of "}
          <a
            href="https://hasura.io"
            target="ha"
            rel="noopener noreferrer"
            className="extlink"
          >
            Hasura
          </a>{" "}
          on{" "}
          <a
            href="https://heroku.com/"
            target="he"
            rel="noopener noreferrer"
            className="extlink"
          >
            Heroku
          </a>
          .{" "}
        </p>
        {apiType !== "graphql" ? (
          <p>
            <Link to="/test/cards">Test App</Link> with fields of all possible
            types.
          </p>
        ) : null}
      </div>
    );
  }
}
