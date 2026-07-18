import { memo } from "react";
import Tooltip from "rc-tooltip";
import Icon from "components/widgets/Icon/Icon";
import type { Field } from "types/model";

import "./FieldLabel.scss";

export interface FieldLabelProps {
  /**  Field metadata w/ label, required, readOnly, help props */
  field: Field;
  /**  Override for field.label */
  label?: string | null;
  /**  Override for field.required */
  required?: boolean;
  /**  Override for field.readOnly */
  readOnly?: boolean;
}

const FieldLabel = memo(
  ({
    field,
    label = null,
    required = false,
    readOnly = false,
  }: FieldLabelProps) => {
    const isRequired =
      (field.required || required) && !(field.readOnly || readOnly);

    return (
      <div className="evol-field-label" data-testid="fieldlabel">
        <label className="control-label" htmlFor={field.id}>
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
  },
);

export default FieldLabel;
