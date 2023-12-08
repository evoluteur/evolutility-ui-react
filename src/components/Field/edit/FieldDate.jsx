import React, { useCallback, memo } from "react";
import PropTypes from "prop-types";
import Datepicker from "react-datepicker";
import { trueDate } from "utils/format";

import "react-datepicker/dist/react-datepicker.css";
import "./FieldDate.scss";

// TODO: set maxDate and minDate (not urgent if caught w/ validation)

const FieldDate = memo(({ id, value, onChange }) => {
  const onDateChange = useCallback(
    (value) =>
      onChange({
        target: {
          id,
          value,
        },
      }),
    [id, onChange]
  );

  return (
    <Datepicker
      id={id}
      selected={trueDate(value)}
      onChange={onDateChange}
      className="form-control"
      autoComplete="off"
    />
  );
});

export default FieldDate;

FieldDate.propTypes = {
  /** Field id */
  id: PropTypes.string.isRequired,
  /** Callback functions for changed field value */
  onChange: PropTypes.func.isRequired,
  /** Field value (date as string like "2023-12-24" or date) */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

FieldDate.defaultProps = {
  value: null,
};
