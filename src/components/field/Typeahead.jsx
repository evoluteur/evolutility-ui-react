import React, { useState, useEffect } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { getObjectSearch } from "../../utils/dao";
import { i18n_actions } from "../../i18n/i18n";

import "./Typeahead.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

const Typeahead = ({ entity, props, value }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(value ? [value] : []);

  useEffect(() => {
    setOptions(value ? [value] : []);
  }, [value, props]);

  const handleSearch = (search) => {
    setIsLoading(true);
    const dataPromise = getObjectSearch(entity, search);
    dataPromise.then((d) => {
      setOptions(d);
      setIsLoading(false);
    });
  };

  const handleChange = (values) => {
    const v = values?.[0];
    if (v) {
      props.onChange({ value: v.id, label: v.name }, { name: props.id });
    }
  };

  const filterBy = () => true;

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id={props.id}
      isLoading={isLoading}
      labelKey="name"
      minLength={2}
      onSearch={handleSearch}
      options={options}
      placeholder={i18n_actions.search}
      renderMenuItemChildren={(option) => option.name}
      onChange={handleChange}
      selected={value ? [value] : []}
    />
  );
};

export default Typeahead;
