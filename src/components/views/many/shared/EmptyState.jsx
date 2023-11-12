import React from "react";
import PropTypes from "prop-types";
import modelPropTypes from "../../modelPropTypes";

import Alert from "../../../widgets/Alert/Alert";
import Button from "../../../widgets/Button/Button";
import { i18n_msg as i18n } from "../../../../i18n/i18n";

import "./EmptyState.scss";

const EmptyState = ({ model, hasFilters }) => {
  let msg = hasFilters ? i18n.noData : i18n.empty;
  msg = msg.replaceAll("{0}", model.namePlural);
  const content = (
    <>
      <div>{msg}</div>

      {hasFilters && <div className="too-much">{i18n.newCriteria}</div>}

      {!hasFilters && (
        <Button
          url={"../" + model.id + "/edit/0"}
          icon="add"
          type="primary"
          label={i18n.addTheFirst.replaceAll("{0}", model.name)}
        />
      )}
    </>
  );
  return (
    <div className="empty-state" data-testid="emptystate">
      <Alert type="info" title={i18n.noResults} message={content} />
    </div>
  );
};

export default EmptyState;

EmptyState.propTypes = {
  model: modelPropTypes.isRequired,
  /** Does the user have search or filter criterias? */
  inSearch: PropTypes.bool,
};

EmptyState.defaultProps = { inSearch: false };
