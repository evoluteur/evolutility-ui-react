// Evolutility-UI-React :: /field/FieldLabel.js

import React from "react";
import PropTypes from "prop-types";
import Tooltip from "rc-tooltip";
import Icon from "react-crud-icons";

// import "rc-tootip/assets/bootstrap_white.css";
import "../bootstrap_white.css";

const FieldLabel = ({ field, label, required, readOnly }) => {
  const f = field || { type: "text" };
  const required2 = (f.required || required) && !readOnly;

  return (
    <div className="evol-field-label">
      <label className="control-label">
        {label || f.label}
        {required2 && <span className="evol-required">*</span>}
        {f.help && (
          <Tooltip
            placement="right"
            trigger={["hover"]}
            overlay={<span>{f.help}</span>}
          >
            <span>
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
  label: PropTypes.string.isRequired,
  field: PropTypes.object,
  required: PropTypes.bool, // override for field.required
  readOnly: PropTypes.bool,
};

FieldLabel.defaultProps = {
  field: null,
  required: false,
  readOnly: null,
};
