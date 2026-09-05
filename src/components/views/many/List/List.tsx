/* eslint-disable react-hooks/exhaustive-deps */
// Evolutility-UI-React :: /views/many/List.tsx

// List view to display a collection as a list (table w/ sorting and paging).

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2026 Olivier Giulieri

import { useMemo, type MouseEvent } from "react";
import Icon from "components/widgets/Icon/Icon";
import Alert from "components/widgets/Alert/Alert";
import TableBody from "../shared/TableBody/TableBody";
import type { Field, Model, RecordData } from "types/model";

import "./List.scss";

const tableHeader = (
  fields: Field[],
  onClickSort: (evt: MouseEvent<HTMLElement>) => void,
  sortFieldId: string | undefined,
  sortDirection: string | undefined,
) => (
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

export interface ListProps {
  entity: string;
  model: Model | null;
  data?: RecordData[] | null;
  sortField?: string;
  sortDirection?: string;
  onClickSort: (evt: MouseEvent<HTMLElement>) => void;
}

const List = ({
  entity,
  model,
  data,
  sortField,
  sortDirection,
  onClickSort,
}: ListProps) => {
  let body;
  const fields = useMemo(
    () => model?.fields.filter((f) => f.inMany) || [],
    [entity],
  );
  const listData = Array.isArray(data) ? data : undefined;
  if (!fields.length) {
    body = (
      <Alert
        title="Error"
        message="No fields are flagged as inMany to show in list."
      />
    );
  } else if (listData?.length) {
    const link = `../${entity}/${model?.defaultViewOne || "browse"}/`;
    body = (
      <table className="table table-hover sortable">
        {tableHeader(fields, onClickSort, sortField, sortDirection)}
        <TableBody
          fields={fields}
          data={listData}
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
