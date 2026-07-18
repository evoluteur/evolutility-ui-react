import TableBody from "components/views/many/shared/TableBody/TableBody";
import { evoPath } from "utils/format";
// import EmptyState from "components/views/many/EmptyState";
import type {
  Collection as CollectionModel,
  Field,
  RecordData,
} from "types/model";
import type { GqlErrorResult } from "types/api";

import "./Collection.scss";

export interface CollectionProps {
  collecModel: CollectionModel;
  collecData?: RecordData[] | GqlErrorResult | null;
}

const Collection = ({ collecModel, collecData }: CollectionProps) => {
  const isEmpty = !(
    Array.isArray(collecData) &&
    collecData &&
    collecData?.length > 0
  );
  if (isEmpty) {
    return (
      <div className="evo-collec">
        <div className="empty-collec">No data yet.</div>
      </div>
    );
    // return <EmptyState model={collecModel} isNested={true} />;
  }
  const link = `/${evoPath}/${collecModel.object || collecModel.id}/browse/`;
  const fields = collecModel.fields as Field[];
  const tableHeader = (
    <thead>
      <tr>
        {fields.map((f) => (
          <th key={f.id}>{f.labelShort || f.label}</th>
        ))}
      </tr>
    </thead>
  );

  return (
    <div className="evo-collec">
      <table className="table">
        {tableHeader}
        <TableBody
          fields={fields}
          data={collecData as RecordData[]}
          iconPath={collecModel?.icon}
          link={link}
        />
      </table>
    </div>
  );
};

export default Collection;
