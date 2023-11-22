import React, { useEffect } from "react";
import { i18n_404 as i18n } from "i18n/i18n";
import Button from "components/widgets/Button/Button";

import "./PageNotFound.scss";

const PageNotFound = () => {
  const url = window.location.pathname;

  useEffect(() => {
    document.title = "Evolutility";
    window.scrollTo(0, 0);
  });

  return (
    <div className="err404" style={{ padding: "0 50px 10px" }}>
      <h1>{i18n.title}</h1>

      <p>
        <br />
        {i18n.msg}
      </p>
      <p className="bad-route">
        {i18n.badRoute}: "{url}"
      </p>

      <p>
        <br />
        <Button type="primary" url="/" label="Back to Home Page" />
      </p>
    </div>
  );
};

export default PageNotFound;
