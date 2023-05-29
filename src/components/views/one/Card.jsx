// Evolutility-UI-React :: /views/one/Card.js

// Single card (usually part of a set of Cards)

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2023 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";
import { fieldPropTypes } from "../modelPropTypes";

import Icon from "react-crud-icons";
import { Link } from "react-router-dom";
import { getModel } from "../../../utils/moMa";
import { fieldValue } from "../../../utils/format";
import { fieldTypes as ft } from "../../../utils/dico";

const Card = ({ entity, data, fields = [] }) => {
  const d = data || {};
  const m = getModel(entity);
  const link = `/${entity}/${m.defaultViewOne}/`;
  const linkEdit = `/${entity}/edit/`;

  return (
    <div className="panel">
      {fields.map((f, idx) => {
        const fv = fieldValue(f, d[f.id]);

        if (idx === 0) {
          return (
            <div key={f.id} className="card-title">
              <h4>
                <Link to={link + d.id}>
                  {m.icon && (
                    <img className="e-icon" src={`/pix/${m.icon}`} alt="" />
                  )}
                  {fv || `( ${d.id} )`}
                </Link>
              </h4>
              <div className="card-actions noprint">
                <Link to={linkEdit + d.id}>
                  <Icon name="edit" size="small" />
                </Link>
              </div>
            </div>
          );
        }
        if (f.type === ft.image) {
          return (
            <div key={f.id} className="card-fld-center">
              <Link to={link + d.id}>{fv}</Link>
            </div>
          );
        }
        const icon = f.type === ft.lov && f.lovIcon ? d[`${f.id}_icon`] : "";
        return (
          <div key={f.id}>
            <label>{f.labelShort || f.label}: </label>
            <div>
              {icon && <img src={`/pix/${icon}`} className="lov-icon" alt="" />}
              {fv}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;

Card.propTypes = {
  /** Object Unique key. */
  entity: PropTypes.string.isRequired,
  /** List of fields metadata. */
  fields: PropTypes.arrayOf(fieldPropTypes),
  /** Data (1 single record/Object). */
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
