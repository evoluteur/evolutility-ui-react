import { useState, useCallback, memo } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import type { Option } from "react-bootstrap-typeahead/types/types";
import { useObjectSearch } from "dao/queries";
import { i18n_actions } from "i18n/i18n";
import type { LovValue } from "types/model";

import "./FieldObject.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

const noOp = () => {};
const selectHintNoOp = () => false;
const filterBy = () => true;

export interface FieldObjectProps {
  /** Model id */
  entity: string;
  /** Element id */
  id?: string;
  /** Callback function triggered on selection  */
  onChange: (
    value: { value: string | number; label?: string },
    meta: { name: string },
  ) => void;
  /** Callback function triggered on value change  */
  onInputChange?: ((text: string) => void) | null;
  /** Field value (object w/ id and name props) */
  value?: LovValue | null;
  /** Placeholder text */
  placeHolder?: string;
}

const FieldObject = memo(
  ({
    entity,
    id = "tphd",
    value = null,
    placeHolder = i18n_actions.search,
    onChange,
    onInputChange = null,
  }: FieldObjectProps) => {
    const [search, setSearch] = useState("");
    const { data, isFetching } = useObjectSearch(entity, search);
    const options =
      (search ? (data as LovValue[]) : null) || (value ? [value] : []);

    const handleSearch = useCallback((searchValue: string) => {
      setSearch(searchValue);
    }, []);

    const handleChange = useCallback(
      (values: Option[]) => {
        const v = values?.[0] as LovValue | undefined;
        if (v) {
          onChange({ value: v.id, label: v.name }, { name: id });
        }
      },
      [id, onChange],
    );

    return (
      <AsyncTypeahead
        filterBy={filterBy}
        id={id}
        isLoading={isFetching}
        labelKey="name"
        minLength={2}
        options={options}
        placeholder={placeHolder}
        renderMenuItemChildren={(option) => (option as LovValue).name}
        onSearch={handleSearch}
        onChange={handleChange}
        onInputChange={onInputChange || noOp}
        selectHint={selectHintNoOp}
        selected={value ? [value] : []}
      />
    );
  },
);

export default FieldObject;
