import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.scss";

const PageNotFound = (props) => {
  const { location } = props;
  const url = location && location.pathname;

  return (
    <div className="err404" style={{ padding: "0 50px 10px" }}>
      <h1>404 - Page Not Found</h1>

      <p>
        <br />
        Oops! The page you are looking for isn't here.
      </p>
      <p style={{ color: "silver" }}>404 error on file "{url}".</p>

      <p>
        <br />
        <Link className="btn btn-primary" to="/">
          Back to Home Page
        </Link>
      </p>
    </div>
  );
};

export default PageNotFound;
