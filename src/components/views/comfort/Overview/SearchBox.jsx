import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Icon from "react-crud-icons";
import FieldObject from "../../../Field/edit/FieldObject";

import "./SearchBox.scss";

const SearchBox = ({ entity, placeHolder }) => {
  const [value, setValue] = useState(null);
  const navigate = useNavigate();
  const onChange = useCallback(
    (valueObj) => {
      const id = valueObj?.value;
      if (id) {
        navigate(`/${entity}/browse/${id}`);
      }
    },
    [entity, navigate]
  );
  const onInputChange = useCallback((value) => setValue(value), []);
  const onClick = useCallback(() => {
    if (value) {
      navigate(`/${entity}/list/?search=${value}`);
    }
  }, [entity, value, navigate]);

  return (
    <div className="evo-search-box">
      <div>
        <FieldObject
          id="search"
          entity={entity}
          onChange={onChange}
          onInputChange={onInputChange}
          placeHolder={placeHolder}
        />
        <button className="btn btn-default" onClick={onClick}>
          <Icon name="search" theme="none" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;

SearchBox.propTypes = {
  /** Model id */
  entity: PropTypes.string.isRequired,
  /** Placeholder text */
  placeHolder: PropTypes.string,
};

SearchBox.defaultProps = {
  placeHolder: null,
};
