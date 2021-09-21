// Evolutility-UI-React :: /field/FieldLabel.js

import React from "react";
import PropTypes from "prop-types";

import Icon from "react-crud-icons";

const FieldLabel = ({ field, label, required, readOnly, clickHelp }) => {
  // - props = label, field, readOnly, clickHelp
  const f = field || { type: "text" };
  const required2 = (f.required || required) && !readOnly;

  return (
    <div className="evol-field-label">
      <label className="control-label">
        {label || f.label}
        {required2 ? <span className="evol-required">*</span> : null}
        {f.help ? (
          <Icon name="help" onClick={clickHelp} size="tiny" theme="none" />
        ) : null}
      </label>
    </div>
  );
};

export default FieldLabel;

FieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.object,
  required: PropTypes.bool, // override for field.required
  clickHelp: PropTypes.func,
  readOnly: PropTypes.bool,
};

FieldLabel.defaultProps = {
  field: null,
  required: false,
  clickHelp: null,
  readOnly: null,
};
