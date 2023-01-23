import React from "react";
import Button from "../components/widgets/Button";

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
        <Button type="primary" url="/" label="Back to Home Page" />
      </p>
    </div>
  );
};

export default PageNotFound;
