import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.scss";

const PageNotFound = ({ location }) => {
  const url = location && location.pathname;

  return (
    <div className="err404" style={{ padding: "0 50px 10px" }}>
      <h1>404 - Page Not Found</h1>

      <p>
        <br />
        Oops! The page you are looking for isn't here.
      </p>
      <p className="">404 error on file "{url}".</p>

      <p>
        <br />
        <Link className="btn btn-primary" to="/">
          Back to Home Page
        </Link>
      </p>
      <div className="circles404">
        <div className="left404">
          <p>I broke it</p>
          <div class="spot404">
            <p>404 Page</p>
          </div>
        </div>
        <div className="right404">
          <p>You can't type</p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
