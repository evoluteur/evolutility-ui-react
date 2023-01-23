import React from "react";
import PropTypes from "prop-types";
import modelPropTypes from "../modelPropTypes";

import Alert from "../../widgets/Alert";
import Button from "../../widgets/Button";
import { i18n_msg } from "../../../i18n/i18n";

import "./EmptyState.scss";

const EmptyState = ({ model, inSearch }) => {
  let msg = inSearch ? i18n_msg.noData : i18n_msg.empty;
  msg = msg.replaceAll("{0}", model.namePlural);
  const content = (
    <>
      <div>{msg}</div>
      {inSearch && <div>{i18n_msg.newCriteria}</div>}
      <Button
        url={"../" + model.id + "/edit/0"}
        icon="add"
        type="primary"
        label={i18n_msg.addTheFirst.replaceAll("{0}", model.name)}
      />
    </>
  );
  return (
    <div className="empty-state">
      <Alert type="info" title={i18n_msg.noResults} message={content} />
    </div>
  );
};

export default EmptyState;

EmptyState.propTypes = {
  model: modelPropTypes.isRequired,
  /** Does the user have search or filter crierias? */
  inSearch: PropTypes.bool,
};

EmptyState.defaultProps = { inSearch: false };
