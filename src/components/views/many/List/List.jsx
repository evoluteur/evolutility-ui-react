/* eslint-disable react-hooks/exhaustive-deps */
// Evolutility-UI-React :: /views/many/List.js

// List view to display a collection as a list (table w/ sorting and paging).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import modelPropType from "components/views/modelPropTypes";
import Icon from "react-crud-icons";
import Alert from "components/widgets/Alert/Alert";
import TableBody from "../shared/TableBody/TableBody";

import "./List.scss";

const tableHeader = (fields, onClickSort, sortFieldId, sortDirection) => (
  <thead>
    <tr>
      {fields.map((f) => (
        <th id={f.id} key={f.id} onClick={onClickSort}>
          {f.labelShort || f.label}
          {f.id === sortFieldId && (
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

const List = ({
  entity,
  model,
  data,
  sortField,
  sortDirection,
  onClickSort,
}) => {
  let body;
  const fields = useMemo(() => model?.fields.filter((f) => f.inMany), [entity]);
  if (!fields.length) {
    body = (
      <Alert
        title="Error"
        message="No fields are flagged as inMany to show in list."
      />
    );
  } else if (data?.length) {
    const link = `../${entity}/${model?.defaultViewOne || "browse"}/`;
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
