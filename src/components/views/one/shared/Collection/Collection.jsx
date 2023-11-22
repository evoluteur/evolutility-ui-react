import React from "react";
import PropTypes from "prop-types";

import TableBody from "components/views/many/shared/TableBody/TableBody";
// import EmptyState from "components/views/many/EmptyState";

import "./Collection.scss";

const Collection = ({ collecModel, collecData }) => {
  const isEmpty = !(collecData && collecData?.length > 0);
  if (isEmpty) {
    return (
      <div className="evo-collec">
        <div className="empty-collec">No data yet.</div>
      </div>
    );
    // return <EmptyState model={collecModel} isNested={true} />;
  }
  const link = "/" + (collecModel.object || collecModel.id) + "/browse/";
  const tableHeader = (
    <thead>
      <tr>
        {collecModel.fields.map((f) => (
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
          fields={collecModel.fields}
          data={collecData}
          iconPath={collecModel?.icon}
          link={link}
        />
      </table>
    </div>
  );
};

export default Collection;

Collection.propTypes = {
  collecModel: PropTypes.shape({
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  collecData: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
    PropTypes.shape({
      errors: PropTypes.arrayOf(PropTypes.shape()),
    }),
  ]),
};
