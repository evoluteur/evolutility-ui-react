import React from "react";
import PropTypes from "prop-types";
import { fieldPropTypes } from "../views/modelPropTypes";
import Tooltip from "rc-tooltip";
import Icon from "react-crud-icons";

import "./FieldLabel.scss";

const FieldLabel = ({ field, label, required, readOnly }) => {
  const isRequired =
    (field.required || required) && !(field.readOnly || readOnly);

  return (
    <div className="evol-field-label" data-testid="fieldlabel">
      <label className="control-label">
        {label || field.label}
        {isRequired && (
          <span className="field-required" data-testid="fl-required">
            *
          </span>
        )}
        {field.help && (
          <Tooltip
            placement="right"
            trigger={["hover"]}
            overlay={<span>{field.help}</span>}
          >
            <span data-testid="fl-help">
              <Icon name="help" size="tiny" theme="none" />
            </span>
          </Tooltip>
        )}
      </label>
    </div>
  );
};

export default FieldLabel;

FieldLabel.propTypes = {
  /**  Field metadata w/ label, rquired, readOnly, help props */
  field: fieldPropTypes.isRequired,
  /**  Override for field.label */
  label: PropTypes.string,
  /**  Override for field.required */
  required: PropTypes.bool,
  /**  Override for field.readOnly */
  readOnly: PropTypes.bool,
};

FieldLabel.defaultProps = {
  label: null,
  required: false,
  readOnly: false,
};
