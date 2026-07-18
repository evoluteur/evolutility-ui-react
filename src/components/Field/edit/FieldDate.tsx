import { useCallback, memo } from "react";
import Datepicker from "react-datepicker";
import { trueDate } from "utils/format";
import type { FieldOnChange } from "types/model";

import "react-datepicker/dist/react-datepicker.css";
import "./FieldDate.scss";

// TODO: set maxDate and minDate (not urgent if caught w/ validation)

export interface FieldDateProps {
  /** Field id */
  id: string;
  /** Callback functions for changed field value */
  onChange: FieldOnChange;
  /** Field value (date as string like "2023-12-24" or date) */
  value?: string | Date | null;
}

const FieldDate = memo(({ id, value = null, onChange }: FieldDateProps) => {
  const onDateChange = useCallback(
    (value: Date | null) =>
      onChange({
        target: {
          id,
          value,
        },
      }),
    [id, onChange],
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
