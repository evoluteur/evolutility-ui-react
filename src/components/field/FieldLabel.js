// Evolutility-UI-React :: /field/FieldLabel.js

import React from "react";
import PropTypes from "prop-types";

import Icon from "react-crud-icons";

const FieldLabel = (props) => {
  // - props = label, field, readOnly, clickHelp
  const f = props.field || { type: "text" },
    required = (f.required || props.required) && !props.readOnly;

  return (
    <div className="evol-field-label">
      <label className="control-label">
        {props.label || f.label}
        {required ? <span className="evol-required">*</span> : null}
        {f.help ? (
          <Icon
            name="help"
            onClick={props.clickHelp}
            size="tiny"
            theme="none"
          ></Icon>
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
};
