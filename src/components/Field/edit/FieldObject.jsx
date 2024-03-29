import React, { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getObjectSearch } from "dao/dao";
import { i18n_actions } from "i18n/i18n";

import "./FieldObject.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

const noOp = () => {};
const filterBy = () => true;

const FieldObject = memo(
  ({ entity, id, value, placeHolder, onChange, onInputChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(value ? [value] : []);

    useEffect(() => {
      setOptions(value ? [value] : []);
    }, [value]);

    const handleSearch = useCallback(
      (search) => {
        setIsLoading(true);
        const dataPromise = getObjectSearch(entity, search);
        dataPromise.then((v) => {
          setOptions(v);
          setIsLoading(false);
        });
      },
      [entity]
    );

    const handleChange = useCallback(
      (values) => {
        const v = values?.[0];
        if (v) {
          onChange({ value: v.id, label: v.name }, { name: id });
        }
      },
      [id, onChange]
    );

    return (
      <AsyncTypeahead
        filterBy={filterBy}
        id={id}
        isLoading={isLoading}
        labelKey="name"
        minLength={2}
        options={options}
        placeholder={placeHolder}
        renderMenuItemChildren={(option) => option.name}
        onSearch={handleSearch}
        onChange={handleChange}
        onInputChange={onInputChange || noOp}
        selectHint={noOp}
        selected={value ? [value] : []}
      />
    );
  }
);

export default FieldObject;

FieldObject.propTypes = {
  /** Model id */
  entity: PropTypes.string.isRequired,
  /** Element id */
  id: PropTypes.string.isRequired,
  /** Callback function triggered on selection  */
  onChange: PropTypes.func.isRequired,
  /** Callback function triggered on value change  */
  onInputChange: PropTypes.func,
  /** Field value (object w/ id and name props) */
  value: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  /** Placeholder text */
  placeHolder: PropTypes.string,
};

FieldObject.defaultProps = {
  id: "tphd",
  value: null,
  placeHolder: i18n_actions.search,
  onInputChange: null,
};
