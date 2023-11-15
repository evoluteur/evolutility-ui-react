import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getObjectSearch } from "../../../dao/dao";
import { i18n_actions } from "../../../i18n/i18n";

import "./FieldObject.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

const FieldObject = ({ entity, id, value, placeHolder, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(value ? [value] : []);

  useEffect(() => {
    setOptions(value ? [value] : []);
  }, [value]);

  const handleSearch = useCallback(
    (search) => {
      setIsLoading(true);
      const dataPromise = getObjectSearch(entity, search);
      dataPromise.then((d) => {
        setOptions(d);
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

  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id={id}
      isLoading={isLoading}
      labelKey="name"
      minLength={2}
      onSearch={handleSearch}
      options={options}
      placeholder={placeHolder}
      renderMenuItemChildren={(option) => option.name}
      onChange={handleChange}
      selected={value ? [value] : []}
    />
  );
};

export default FieldObject;

FieldObject.propTypes = {
  /** Model id */
  entity: PropTypes.string.isRequired,
  /** Element id */
  id: PropTypes.string,
  /** Callback functions  */
  onChange: PropTypes.func.isRequired,
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
};
