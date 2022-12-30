// Evolutility-UI-React :: /views/one/Card.js

// Single card (usually part of a set of Cards)

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2022 Olivier Giulieri

import React from "react";
import PropTypes from "prop-types";

import Icon from "react-crud-icons";
import { Link } from "react-router-dom";
import { getModel } from "../../../utils/moMa";
import { fieldValue } from "../../../utils/format";
import { fieldTypes as ft } from "../../../utils/dico";

// const lovMaps = {};
// const getLovMap = (f) => {
//   let map = this.lovMaps[f.id];
//   if (!map && f.list) {
//     map = {};
//     f.list.forEach((item) => (map[item.id] = item.text));
//     // - it would be better to not duplicate lovMap for fields sharing the same list
//     lovMaps[f.id] = map;
//   }
//   return map;
// };

const Card = ({ entity, data, fields = [] }) => {
  const d = data || {};
  const m = getModel(entity);
  const link = `/${entity}/${m.defaultViewOne}/`;
  const linkEdit = `/${entity}/edit/`;

  return (
    <div className="panel panel-default">
      {fields.map((f, idx) => {
        const attr = f.type === ft.lov ? `${f.id}_txt` : f.id;
        const fv = fieldValue(f, d[attr]);

        if (idx === 0) {
          return (
            <div key={f.id} className="evo-card-title">
              <h4>
                <Link to={link + d.id}>
                  {m.icon && (
                    <img
                      className="evol-many-icon"
                      src={`/pix/${m.icon}`}
                      alt=""
                    />
                  )}
                  {fv || `( ${d.id} )`}
                </Link>
              </h4>
              <div className="card-actions">
                <Link to={linkEdit + d.id}>
                  <Icon name="edit" size="small" />
                </Link>
              </div>
            </div>
          );
          // <i data-id="Delete" title="Delete" className="glyphicon glyphicon-trash"></i>
        }
        if (f.type === ft.image) {
          return (
            <div key={f.id} className="card-fld-center">
              <Link to={link + d.id}>{fv}</Link>
            </div>
          );
        }
        // if (f.type === ft.list) {
        //   const lovMap = getLovMap(f);
        //   return (
        //     <div key={f.id}>
        //       <label>{f.labelShort || f.label}: </label>
        //       <div className="list-tags">
        //         {fv
        //           ? fv.map((v) => <div key={v}>{lovMap[v] || "N/A"}</div>)
        //           : null}
        //       </div>
        //     </div>
        //   );
        // }
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
  fields: PropTypes.array,
  /** Data (1 single record/Object). */
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};
