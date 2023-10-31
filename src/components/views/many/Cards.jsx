/* eslint-disable react-hooks/exhaustive-deps */
// Evolutility-UI-React :: /views/many/Cards.js

// Cards view to display a collection as a set of Cards.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import modelPropTypes from "../modelPropTypes";

import { i18n_errors } from "../../../i18n/i18n";
import Card from "../one/Card";
import Alert from "../../widgets/Alert/Alert";
import EmptyState from "./EmptyState";

import "./Cards.scss";

const Cards = ({ entity, model, data }) => {
  const fieldCols = useMemo(
    () => model?.fields.filter((f) => f.inMany),
    [entity]
  );

  if (model) {
    let body;
    if (data?.length) {
      body = (
        <div className="evol-cards">
          {data?.map((d, idx) => (
            <Card key={idx} data={d} fields={fieldCols} entity={entity} />
          ))}
        </div>
      );
    } else {
      body = <EmptyState model={model} />;
    }
    return (
      <div data-entity={entity} className="evol-many-cards">
        {body}
      </div>
    );
  }
  return (
    <Alert
      title="Error"
      message={i18n_errors.badEntity.replace("{0}", entity)}
    />
  );
};

export default Cards;

Cards.propTypes = {
  entity: PropTypes.string.isRequired,
  model: modelPropTypes.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
