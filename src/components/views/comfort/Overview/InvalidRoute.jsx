import React from "react";
import { i18n_errors } from "i18n/i18n";
import ModelLinks from "components/views/comfort/ModelLinks";
import Alert from "components/widgets/Alert/Alert";

const InvalidRoute = ({ entity }) => {
  const msg = i18n_errors.badEntity.replace("{0}", entity);
  return (
    <div className="ovw-bad-entity">
      <Alert title={i18n_errors.error} message={msg} />
      <br />
      <ModelLinks />
    </div>
  );
};

export default InvalidRoute;
