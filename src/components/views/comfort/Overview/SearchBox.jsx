import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Typeahead from "../../../Field/edit/FieldObject";

const SearchBox = ({ entity, placeHolder }) => {
  const navigate = useNavigate();
  const handleSearch = (valueObj) => {
    const id = valueObj?.value;
    if (id) {
      navigate(`/${entity}/browse/${id}`);
    }
  };
  return (
    <div className="evo-search-box">
      <Typeahead
        id="search"
        entity={entity}
        onChange={handleSearch}
        placeHolder={placeHolder}
      />
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
