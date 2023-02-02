// Evolutility-UI-React :: /views/many/List.js

// List view to display a collection as a list (table w/ sorting and paging).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

// #region ---------------- Imports ----------------
import React from "react";
import PropTypes from "prop-types";
import modelPropType from "../modelPropTypes";
import Icon from "react-crud-icons";
import Alert from "../../widgets/Alert";
import TableBody from "./TableBody";

import "./List.scss";
// #endregion

const tableHeader = (fields, onClickSort, sortField, sortDirection) => (
  <thead>
    <tr>
      {fields.map((f) => (
        <th id={f.id} key={f.id} onClick={onClickSort}>
          {f.labelShort || f.label}
          {f.id === sortField && (
            <Icon
              theme="none"
              name={sortDirection === "desc" ? "down" : "up"}
            />
          )}
        </th>
      ))}
    </tr>
  </thead>
);

// TODO: search w/ pagination
const List = ({
  entity,
  model,
  data,
  sortField,
  sortDirection,
  onClickSort,
}) => {
  let body;
  const fields = model.fields.filter((f) => f.inMany);
  if (!fields.length) {
    body = (
      <Alert
        title="Error"
        message="No fields are flagged as inMany to show in list."
      />
    );
  } else if (data?.length) {
    const link = "/" + entity + "/" + model?.defaultViewOne + "/";
    body = (
      <table className="table table-hover sortable">
        {tableHeader(fields, onClickSort, sortField, sortDirection)}
        <TableBody
          fields={fields}
          data={data}
          iconPath={model?.icon}
          link={link}
        />
      </table>
    );
  }
  return (
    <div data-entity={entity} className="evol-many-list">
      {body}
    </div>
  );
};

export default List;

List.propTypes = {
  entity: PropTypes.string.isRequired,
  model: modelPropType.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
    PropTypes.shape({
      errors: PropTypes.arrayOf(PropTypes.shape()),
    }),
  ]),
  onClickSort: PropTypes.func.isRequired,
};
